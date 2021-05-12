const dbConn = require("../../config/db.config");


const Group = {}

Group.list = function (user, result) {
  const a = dbConn.query(`
    select a.* FROM 
(
SELECT
b.group_id AS room_id,
  a.group_id AS target_id,
  'group' AS tipe,
  a.picture,
  a.group_name AS name,
  b.message AS last_message,
  b.inserted_at AS sent_at
FROM
  users_groups_chats a
  LEFT JOIN (
  SELECT * FROM groups_chats WHERE id IN (
SELECT MAX(id) FROM groups_chats GROUP BY group_id 
)) b ON a.group_id = b.group_id
WHERE a.user_chat_id = ?
UNION ALL
SELECT
  b.id_relasi AS room_id,
  a.id_target AS target_id,
  'pc' AS tipe,
  c.picture,
  c.name AS name,
  b.message AS last_name,
  b.inserted_at AS sent_at
FROM
  users_personal_chats a
  LEFT JOIN (
  SELECT * FROM personal_chats WHERE id IN (
SELECT MAX(id) FROM personal_chats WHERE send_by = ? OR target_id = ? GROUP BY id_relasi
)) b ON CONCAT(a.user_chat_id, '_', a.id_target) = b.id_relasi OR CONCAT(a.id_target, '_', a.user_chat_id) = b.id_relasi
INNER JOIN users_chats c ON a.id_target = c.id
WHERE a.user_chat_id = ?
) a ORDER BY a.sent_at DESC
`, [user.id, user.id, user.id, user.id], function (err, res) {
    if (err) {
      result(err, null)
    }
    else {
      result(null, res)
    }
  })
  return a;
}

module.exports = Group