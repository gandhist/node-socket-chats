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
    const userId = socket.userToken.id
    // console.log(`${socket.userToken.name} established connection`)
    //TODO:
    // set user to be online


    // join the connected user to room who id itself
    // it mean for client sent message/notif to spesific user




    // listener for joinRoom chat
    socket.on('joinRoom', ({ username, room, targetId }) => {
        // console.log(`${username} join room ${room} target ${targetId}`)
        // fungsi dari socketio untuk join ke prameter name nya
        // pada case ini peserta kita masukan ke room yang di pilih nya
        socket.join(room)
        // if (targetId > 0) {
        //     console.log('dak ke sini')
        //     console.log(`${username} join room target ${targetId}`)
        //     socket.join(targetId)
        // }

        // welcome current user
        socket.emit('message', formatMessage(null, chatBot, 'Welcome to Chat App, let\'s talk now!', null, room, room))

        // broadcas when user connect to selected room
        socket.broadcast.to(room).to(targetId).emit('message', formatMessage(null, chatBot, `${username} has joined the room ${room}!!`, null, room, room))

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
    socket.on('chatMessage', ({ msg, username, room, tipe, targetId }) => {
        // console.log(username)

        // save chat to db
        let query = "";
        if (tipe === 'group') {
            query = `
            insert into groups_chats (send_by, message, group_id) values ('${username}', '${msg}', '${room}')
            `;
            db.query(query, function (err, res) {
                // emit to the room and room user itself
                io.to(room).to(targetId).emit('message', formatMessage(username, username, msg, null, room, room))
            })
        }
        else if (tipe === 'pc') {
            console.log(`${socket.userToken.name} join group ${targetId}`)
            // check if data exist in table if not, just insert new one
            const idRelasi = [
                `${username}_${targetId}`,
                `${targetId}_${username}`,
            ];

            // check riwayat chat sebelumnya
            db.query(`select * from personal_chats where id_relasi in (?,?) limit 1`, idRelasi, function (err, res) {
                // jika tidak ada chat sebelumnya maka
                if (res.length === 0) {
                    db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${username}', '${targetId}')`)
                    db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${targetId}', '${username}')`)
                    // jika tidak ada history chat maka buat query untuk insert data baru
                    query = `
                        insert into personal_chats (send_by, message, target_id, id_relasi) values ('${username}', '${msg}', '${targetId}', '${room}')
                    `;
                }
                // jika ada chat sebelumnya, maka check ada di user personal atau tidak
                db.query(`select * from users_personal_chats where user_chat_id = ? and id_target = ? limit 1`, [username, targetId], function (err, resp) {
                    // jika tidak ada chat 
                    if (resp.length === 0) {
                        db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${username}', '${targetId}')`)
                    }
                })
                // jika ada chat sebelumnya, maka check ada di user personal atau tidak
                db.query(`select * from users_personal_chats where user_chat_id = ? and id_target = ? limit 1`, [targetId, username], function (err, resp) {
                    // jika tidak ada chat 
                    if (resp.length === 0) {
                        db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${targetId}', '${username}')`)
                    }
                })
                // jika ada chat sebelumnya select query
                query = `
                        insert into personal_chats (send_by, message, target_id, id_relasi) values ('${username}', '${msg}', '${targetId}', '${res[0].id_relasi}')
                    `;
                db.query(query, function (err, res) {
                    // emit to the room and room user itself
                    io.to(room).to(targetId).emit('message', formatMessage(username, username, msg, null, room, room))
                })
            })
        }

    })

    // run on when client disconnect / leave the page
    socket.on('disconnect', (reason) => {
        // console.log(`${socket.userToken.name} disconnect reason: ${reason}`)
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