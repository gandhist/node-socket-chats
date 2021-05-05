const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const db = require('./config/db.config')

const {getCurrentUser, userjoin, userLeave, getRoomUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const chatBot = "🤖Raven"

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// run when client connectrs
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
                console.log('data', res)
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
app.post('login', (req, res) => {
    console.log('yeah')
    res.send('here we go')
})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));