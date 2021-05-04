const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const {getCurrentUser, userjoin, userLeave, getRoomUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const chatBot = "Bot Baik"

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
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })    

    // lister for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log('ini dari server', msg)
        const user = getCurrentUser(socket.id);
        // emit message to client / target
        io.to(user.room).emit('message',formatMessage(user.username, msg) )
    })

    // run on when client disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if(user){
            console.log('someone leave this room')
            io.to(user.room).emit('message', formatMessage(chatBot, `${user.username} has left the chat!`))
            // send user and room info
            // so in ui must listen "roomUsers"
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    })


})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));