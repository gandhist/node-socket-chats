const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// get config vars
dotenv.config();


// config db
const db = require('./config/db.config')

// utils format messages
const formatMessage = require('./utils/messages')

const { userLeave } = require('./utils/users'); // IMPORTANT, WE WILL IGNORE IT
const router = require('./config/routes');

const app = express();
var allowlist = ['http://localhost:5500/', 'http://127.0.0.1:5500/']

const options = {
    cors: {
        origin: allowlist
    }
};
app.use(cors(options));
const server = http.createServer(app)
const io = socketio(server)
const chatBot = "🤖Raven"

// set static folder for development purpose only
app.use(express.static(path.join(__dirname, 'public')))


// socket middleware
// expected auth{jwtToken: ''} from client
io.use((socket, next) => {
    try {
        // verify jwt from client with secretKey
        const decoded = jwt.verify(socket.handshake.auth.jwtToken, process.env.TOKEN_SECRET, (err, decoded) => {
            if (typeof decoded === 'object') return true // if json verified will return true
            return false
        })
        // console.log('ini middleware', decoded)
        if (decoded) {
            // if json verified will process next request
            socket.userToken = jwt.decode(socket.handshake.auth.jwtToken)
            next()
        }
        else {
            // console.log('ini middleware tidak valid')
            const err = new Error("not authorized");
            err.data = { content: "Please retry later, perhaps your token invalid" };
            next(err)
        }
    } catch (error) {
        next(new Error("token invalid"));
        console.log('error middleware nih', error)
    }

})


// run when client connect / just login
io.on('connection', socket => {

    //TODO:
    // set user to be online

    // listener for joinRoom chat
    socket.on('joinRoom', ({ username, room }) => {
        // fungsi dari socketio untuk join ke prameter name nya
        // pada case ini peserta kita masukan ke room yang di pilih nya
        socket.join(room)

        // welcome current user
        socket.emit('message', formatMessage(null, chatBot, 'Welcome to Chat App, let\'s introduce yourself first.!', null, room))

        // broadcas when user connect to selected room
        socket.broadcast.to(room).emit('message', formatMessage(null, chatBot, `${username} has joined the room!!`, null, room))

        // send user and room info
        // so in ui must listen "roomUsers"
        const query = `
            SELECT a.user_chat_id AS id, b.name AS username, a.group_name AS room FROM users_groups_chats a
            LEFT JOIN users_chats b ON a.user_chat_id = b.id
            WHERE a.group_name = '${room}'
            `;
        db.query(query, function (err, res) {
            db.query(`select send_by as username, message, inserted_at as time from groups_chats where group_id = '${room}'`, function (errx, resx) {
                io.to(room).emit('roomUsers', {
                    room: room,
                    users: res,
                    message: resx
                })
            })

        })
    })

    // lister for chatMessage
    socket.on('chatMessage', ({ msg, username, room }) => {
        // save chat to db
        const query = `
            insert into groups_chats (send_by, message, group_id) values ('${username}', '${msg}', '${room}')
            `;
        db.query(query, function (err, res) {
            // emit to the room
            io.to(room).emit('message', formatMessage(username, username, msg, null, room))
        })
    })

    // run on when client disconnect / leave the page
    socket.on('disconnect', () => {
        console.log('someone leave group')
        const user = userLeave(socket.id)
        if (user) {
            console.log('someone leave this room')
            io.to(user.room).emit('message', formatMessage(socket.userToken.id, chatBot, `${user.username} has left room!`, null))
            // send user and room info
            const query = `
            SELECT a.user_chat_id AS id, b.name AS username, a.group_name AS room FROM users_groups_chats a
            LEFT JOIN users_chats b ON a.user_chat_id = b.id
            WHERE a.group_name = '${user.room}'
            `;
            db.query(query, function (err, res) {
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: res
                })
            })
        }

    })


})

// var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
// }
//     app.use(allowCrossDomain);
// route login
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', router)


const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));