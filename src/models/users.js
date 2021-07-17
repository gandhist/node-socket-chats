const dbConn = require("../../config/db.config");

let User = function (user) {
    this.is_online = user.is_online
    this.name = user.name
    this.email = user.email
    this.no_hp = user.no_hp
    this.tipe_user = user.tipe_user
    this.hint = user.hint
    this.password = user.password
    this.username = user.username
    this.token = user.token
    this.token_firebase = user.token_firebase
    // this.picture = user.picture
}


User.register = function (newUser, result) {
    dbConn.query(`insert into users_chats set ?`, newUser, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res.insertId)
        }
    })
}

User.getByEmail = function (email, result) {
    dbConn.query(`select id, name, email, no_hp, tipe_user, token, password, picture from users_chats where email = ? limit 1`, email, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.updateJwt = function (body, result) {
    dbConn.query(`update users_chats set token = ? where id = ?`, [body.token, body.id], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.getAll = function (result) {
    dbConn.query(`select id, name, email, no_hp, tipe_user, picture from users_chats order by name`, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.setTokenFirebase = function (id, token_firebase, result) {
    dbConn.query(`update users_chats set token_firebase = ? where id = ?`, [token_firebase, id], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            console.log(res)
            result(null, res)
        }
    })
}

User.getTokenFirebase = function (id, result) {
    dbConn.query(`select token_firebase from users_chats where id = ? limit 1`, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.deleteTokenFirebase = function (id, result) {
    dbConn.query(`update users_chats set token_firebase = NULL where id = ? limit 1`, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.getById = function (id, result) {
    dbConn.query(`select id, name, email, no_hp, about, picture from users_chats where id = ? limit 1`, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}


// get by username
User.getByUsername = function (id, result) {
    dbConn.query(`select id, name, email, no_hp, tipe_user, token, token_firebase, password, picture from users_chats where username = ? limit 1`, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.update = function (id, data, result) {
    dbConn.query(`update users_chats set name = ?, email = ?, no_hp = ?, about = ? where id = ?`, 
    [data.name, data.email, data.no_hp, data.about, id], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.changePassword = function (id, password, hint, result) {
    dbConn.query(`update users_chats set password = ?, hint = ? where id = ?`, 
    [password, hint, id], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

module.exports = User