const dbConn = require("../../config/db.config");

let User = function (user) {
    this.is_online = user.is_online
    this.name = user.name
    this.email = user.email
    this.no_hp = user.no_hp
    this.tipe_user = user.tipe_user
    this.hint = user.hint
    this.password = user.password
    this.token = user.token
}

User.login = function(user, result){
    dbConn.query(`select * from users_chats where email = ? limit 1`, user.username, function(err, res){
        if(err){
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}

User.getByEmail = function (email, result) {
    const a = dbConn.query(`select id, name, email, no_hp, tipe_user, token, password, picture from users_chats where email = ? limit 1`, email, function(err, res){
        if(err){
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
    return a;
}

User.register = function(newUser, result){
    dbConn.query(`insert into users_chats set ?`, newUser, function(err, res){
        if(err){
            result(err, null)
        }
        else {
            result(null, res.insertId)
        }
    })
}

User.updateJwt = function(body, result){
    dbConn.query(`update users_chats set token = ? where id = ?`, [body.token, body.id], function(err, res){
        if(err){
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = User