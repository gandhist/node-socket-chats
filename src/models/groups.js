const dbConn = require("../../config/db.config");


const Group = {}

Group.list = function (user, result) {
    const a = dbConn.query(`
    SELECT
  a.group_id,
  a.group_name,
  b.message
FROM
  users_groups_chats a
  LEFT JOIN (
  SELECT * FROM groups_chats WHERE id IN (
SELECT MAX(id) FROM groups_chats GROUP BY group_id 
)) b ON a.group_id = b.group_id
WHERE a.user_chat_id = ?
`, user.id, function (err, res) {
        if (err) {
            console.log('error saat get data', err)
            result(err, null)
        }
        else {
            console.log('berhasil get data list goup', res)
            result(null, res)
        }
    })
    return a;
}

module.exports = Group