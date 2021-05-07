const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io')
const bodyParser = require('body-parser');


// config db
const db = require('./config/db.config')

// utils format messages
const formatMessage = require('./utils/messages')

const {getCurrentUser, userjoin, userLeave, getRoomUsers} = require('./utils/users');
const router = require('./config/routes');

const app = express();
// var allowlist = ['http://localhost:5500/', 'http://127.0.0.1:5500/']

// const options = {
//     cors : {
//     origin: allowlist
//         }
// };
// app.use(cors(options));
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
        const decoded = jwt.verify(socket.handshake.auth.jwtToken, "fq2uEI1j8zXcnICVlHrGXpr1UJje2p9a", (err, decoded) => {
            if(typeof decoded === 'object') return true // if json verified will return true
            return false
        })
        // console.log('ini middleware', decoded)
        if(decoded) {
            // if json verified will process next request
            // console.log('ini middleware valid')
            next()
        }
        else {
            // console.log('ini middleware tidak valid')
            next(new Error('invalid request'))
        }
    } catch (error) {
        next(new Error("token invalid"));
        console.log('error middleware nih', error)
    }
    
})


// run when client connect
io.on('connection', socket => {

    // listener for joinRoom chat
    socket.on('joinRoom', ({username, room}) => {

        // store user login to db / memory
        const user = userjoin(socket.id, username, room)

        // fungsi dari socketio untuk join ke prameter name nya
        // pada case ini peserta kita masukan ke room yang di pilih nya
        socket.join(user.room)

        // welcome current user
        socket.emit('message', formatMessage(chatBot, 'Welcome to Chat App, let\'s introduce yourself first.!'))

        // broadcas when user connect to selected room
        socket.broadcast.to(user.room).emit('message', formatMessage(chatBot, `${username} has joined to Chat App!!`))

        // send user and room info
        // so in ui must listen "roomUsers"
        // io.to(user.room).emit('roomUsers', {
        //     room: user.room,
        //     users: getRoomUsers(user.room)
        // })
            const query = `
            SELECT a.user_chat_id AS id, b.name AS username, a.group_name AS room FROM users_groups_chats a
            LEFT JOIN users_chats b ON a.user_chat_id = b.id
            WHERE a.group_name = '${user.room}'
            `;
            db.query(query, function(err, res){
                db.query(`select send_by as username, message, inserted_at as time from groups_chats where group_id = '${user.room}'`, function(errx, resx){
                    io.to(user.room).emit('roomUsers', {
                        room: user.room,
                        users: res,
                        message: resx
                    })
                })
                
            })
    })    

    // lister for chatMessage
    socket.on('chatMessage', ({msg, username, room}) => {
        console.log('ini dari server', msg)
        const user = getCurrentUser(socket.id);

        // save chat to db
        const query = `
            insert into groups_chats (send_by, message, group_id) values ('${username}', '${msg}', '${room}')
            `;
            db.query(query, function(err, res){
                console.log('data', res)
                io.to(room).emit('message',formatMessage(username, msg) )
            })
        // emit message to client / target
        // io.to(room).emit('message',formatMessage(username, msg) )
    })

    // run on when client disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if(user){
            console.log('someone leave this room')
            io.to(user.room).emit('message', formatMessage(chatBot, `${user.username} has left the chat!`))
            // send user and room info
            // so in ui must listen "roomUsers"
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getRoomUsers(user.room)
            // })
            const query = `
            SELECT a.user_chat_id AS id, b.name AS username, a.group_name AS room FROM users_groups_chats a
            LEFT JOIN users_chats b ON a.user_chat_id = b.id
            WHERE a.group_name = '${user.room}'
            `;
            db.query(query, function(err, res){
                console.log('data', res)
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: res
                })
            })
        }

    })


})

// route login
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', router)


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));