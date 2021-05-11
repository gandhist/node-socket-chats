const dbConn = require("../../config/db.config");


const Chats = {}

Chats.list = function (group, result) {
    const a = dbConn.query(`
    SELECT a.send_by, b.name AS sender_name, a.message, a.type_message, a.group_id, a.inserted_at AS time FROM groups_chats a
INNER JOIN users_chats b ON a.send_by = b.id
 WHERE a.group_id = ?
    `, group, function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
    return a;
}

module.exports = Chats