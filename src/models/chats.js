const dbConn = require("../../config/db.config");


const Chats = {}


Chats.group = function (group, result) {
    const a = dbConn.query(`
        SELECT a.send_by, b.name AS sender_name, a.message, a.type_message, a.group_id as room_id, a.inserted_at AS time FROM groups_chats a
        INNER JOIN users_chats b ON a.send_by = b.id
        WHERE a.group_id = ?
    `, group, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
    return a;
}

Chats.pc = function (sender_id, target_id, result) {
    const idRelasi = [
        `${sender_id.id}_${target_id}`,
        `${target_id}_${sender_id.id}`,
    ];
    const a = dbConn.query(`
        SELECT 
            a.send_by,
            b.name AS sender_name,
            a.message,
            a.type_message,
            a.id_relasi as room_id,
            a.inserted_at AS time
        FROM personal_chats a INNER JOIN 
        (SELECT id, NAME, picture FROM users_chats) b
        ON a.send_by = b.id
        WHERE a.id_relasi IN (?,?)
    `, idRelasi, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
    return a;
}


Chats.group_load = function (group, limit, result) {
    if (limit === null) {
        limit = 0
    }
    const a = dbConn.query(`
        SELECT a.send_by, b.name AS sender_name, a.message, a.type_message, a.group_id as room_id, a.inserted_at AS time FROM groups_chats a
        INNER JOIN users_chats b ON a.send_by = b.id
        WHERE a.group_id = ? ORDER BY a.inserted_at DESC LIMIT 10 OFFSET ?
    `, [group, limit], function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
    return a;
}


Chats.pc_load = function (sender_id, target_id, limit, result) {
    if (limit === null) {
        limit = 0
    }
    const idRelasi = [
        `${sender_id.id}_${target_id}`,
        `${target_id}_${sender_id.id}`,
        limit
    ];
    const a = dbConn.query(`
        SELECT 
            a.send_by,
            b.name AS sender_name,
            a.message,
            a.type_message,
            a.id_relasi as room_id,
            a.inserted_at AS time
            FROM personal_chats a INNER JOIN 
        (SELECT id, NAME, picture FROM users_chats) b
        ON a.send_by = b.id
        WHERE a.id_relasi IN (?,?)
        ORDER BY a.inserted_at DESC LIMIT 10 OFFSET ?
    `, idRelasi, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
    return a;
}


module.exports = Chats