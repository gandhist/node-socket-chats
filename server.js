const http = require('http')
const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const moment = require('moment');
const logger = require('morgan');
const admin = require("firebase-admin");
const fileUpload = require('express-fileupload');

// get config vars
dotenv.config();

const serviceAccount = require("./" + process.env.FIREBASE_JSON_FILE);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



// config db
const db = require('./config/db.config')

// utils format messages
const formatMessage = require('./utils/messages')

const router = require('./config/routes');

const app = express();
var allowlist = ['http://localhost:3000/', 'http://127.0.0.1:3000/']

const options = {
    cors: {
        origin: allowlist
    }
};
app.use(logger('dev'))
app.use(cors(options));
var allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next()
}
app.use(allowCrossDomain);
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "OPTIONS"]
    }
})
app.use(fileUpload({
    createParentPath: true
}));
const chatBot = "🤖Raven"



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
        } else {
            // console.log('ini middleware tidak valid')
            const err = new Error("not authorized");
            err.data = {
                content: "Please retry later, perhaps your token invalid"
            };
            next(err)
        }
    } catch (error) {
        next(new Error("token invalid"));
        console.log('error middleware nih', error)
    }

})


// run when client connect / just login
io.on('connection', socket => {
    let userId = socket.userToken.id
    // console.log(`${socket.userToken.name} established connection`)
    //TODO:
    // set user to be online



    // join the connected user to room who id itself
    // it mean for client sent message/notif to spesific user
    socket.join(`pm${socket.userToken.id}`)
    io.to(`pm${socket.userToken.id}`).emit('message', formatMessage(null, chatBot, 'ini target id', null, socket.userToken.id, socket.userToken.id))
    // console.log('list user', users)

    // listener for joinRoom chat
    socket.on('joinRoom', ({
        username,
        room,
        tipe,
        targetId
    }) => {
        // fungsi dari socketio untuk join ke prameter name nya
        // pada case ini peserta kita masukan ke room yang di pilih nya
        socket.join(room)

        // welcome current user
        io.to(`pm${targetId}`).emit('message', formatMessage(null, chatBot, `${username}, Welcome to Chat App, let\'s talk now! `, null, room, room))

        // broadcas when user connect to selected room
        socket.broadcast.to(room).emit('message', formatMessage(null, chatBot, `${username} has joined the room ${room}!!`, null, room, room))

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
    socket.on('chatMessage', ({
        msg,
        username,
        room,
        tipe,
        type,
        media,
        filename,
        targetId
    }) => {
        // save chat to db
        let query = "";
        if (tipe === 'group') {

            query = `
            insert into groups_chats (send_by, message, type_message, media, filename, group_id, inserted_at) values ( ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                `select users_chats.token_firebase from users_chats join users_groups_chats on users_groups_chats.user_chat_id = users_chats.id where users_groups_chats.group_id = ? and users_chats.id != ?`, [room, username],
                function (err, resp) {
                    let tokens = []
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(resp)
                        resp.forEach((el) => {
                            if (el.token_firebase) {
                                tokens.push(el.token_firebase)
                            }
                        })
                    }

                    if (tokens.length > 0) {
                        try {
                            db.query(`select name from users_chats where id = ? limit 1`, username, function (err, res_sender) {
                                const registrationTokens = tokens;

                                const message = {
                                    notification: {
                                        title: res_sender[0].name,
                                        body: msg
                                    },
                                    tokens: registrationTokens,
                                };

                                admin.messaging().sendMulticast(message)
                                    .then((response) => {
                                        console.log(response.successCount + ' messages were sent successfully');
                                        console.log(response)

                                        if (!response.responses[0].success) {
                                            console.log(response.responses[0].error)
                                        }
                                    });
                            })
                        } catch (error) {
                            console.log(error)
                        }

                    }
                })

            db.query(query, [ username, msg, type, media, filename, room, moment.utc().valueOf() ], function (err, res) {
                db.query(`select user_chat_id from users_groups_chats where group_id = ? `, room, function (err, resp) {
                    // member group 
                    // const member = resp.map((el) => `pm${el.id}`) 
                    resp.forEach((el) => {
                        io.to(`pm${el.user_chat_id}`).emit('message', formatMessage(username, username, msg, type, media, null, room, room))
                    })
                    // emit to the room and room user itself
                    // io.to(room).emit('message', formatMessage(username, username, msg, null, room, room))
                })
            })
        } else if (tipe === 'pc') {
            // check if data exist in table if not, just insert new one
            const idRelasi = [
                `${username}_${targetId}`,
                `${targetId}_${username}`,
            ];

            // check riwayat chat sebelumnya
            db.query(`select * from personal_chats where id_relasi in (?,?) limit 1`, idRelasi, function (err, res) {
                // jika tidak ada chat sebelumnya maka

                if (res.length === 0) {
                    db.query(`select * from users_personal_chats where user_chat_id = ? and id_target = ?`, [username, targetId], function (err, v_room) {
                        // Validasi if exist room
                        if (v_room.length === 0) {
                            db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${username}', '${targetId}')`)
                        }
                    })

                    db.query(`select * from users_personal_chats where user_chat_id = ? and id_target = ?`, [targetId, username], function (err, v_room) {
                        // Validasi if exist room
                        if (v_room.length === 0) {
                            db.query(`insert into users_personal_chats (user_chat_id, id_target) values ('${targetId}', '${username}')`)
                        }
                    })

                    // jika tidak ada history chat maka buat query untuk insert data baru
                    query = `
                        insert into personal_chats (send_by, message, type_message, media, filename, target_id, id_relasi, inserted_at) values ( ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    
                    db.query(query, [username, msg, type, media, filename, targetId, room, moment.utc().valueOf()] , function (err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(res)
                        }
                        // emit to the room and room user itself
                        io.to(room).to(`pm${targetId}`).emit('message', formatMessage(username, username, msg, type, media, filename, room , room, moment.utc().valueOf()))
                    })
                } else {
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
                            insert into personal_chats (send_by, message, type_message, media, filename, target_id, id_relasi, inserted_at) values ( ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                    db.query(query, [ username, msg, type, media, filename, targetId, res[0].id_relasi, moment.utc().valueOf() ] , function (err, res) {
                        // emit to the room and room user itself

                        if (err) {
                            console.log(err)
                        } else {
                            console.log(res)
                        }
                        io.to(room).to(`pm${targetId}`).emit('message', formatMessage(username, username, msg, type, media, null, room, room))
                    })
                }

                db.query(`select token_firebase from users_chats where id = ? limit 1`, targetId, function (err, res_token) {
                    // jika tidak ada chat
                    if (!err) {
                        try {
                            db.query(`select name from users_chats where id = ? limit 1`, username, function (err, res_sender) {
                                const registrationTokens = [
                                    res_token[0].token_firebase
                                ];

                                if (res_token[0].token_firebase) {
                                    const message = {
                                        notification: {
                                            title: res_sender[0].name,
                                            body: msg
                                        },
                                        tokens: registrationTokens,
                                    };
    
                                    admin.messaging().sendMulticast(message)
                                    .then((response) => {
                                        console.log(response.successCount + ' messages were sent successfully');
                                        console.log(response)

                                        if (!response.responses[0].success) {
                                            console.log(response.responses[0].error)
                                        }
                                    });
                                }
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
            })
        }

    })

    // run on when client disconnect / leave the page
    socket.on('disconnect', (reason) => {
        //TODO:
        //1 set user to offline
        // console.log(`${socket.userToken.name} disconnect reason: ${reason}`)
    })


})


// route login
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/api/v1', router)

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));