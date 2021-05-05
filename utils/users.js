// here can connect to database
const db = require('../config/db.config')
const users = []

// joined user in the chat
function userjoin (id, username, room) {
    const user = {id, username, room}
    users.push(user)
    return user;
}


function getCurrentUser(id){
    return users.find(user => user.id === id)
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id)
    // if return will return -1
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

// get room users
const getRoomUsers = async (room) => {
    const query = `
    SELECT a.user_chat_id AS id, b.name AS username, a.group_name AS room FROM users_groups_chats a
    LEFT JOIN users_chats b ON a.user_chat_id = b.id
    WHERE a.group_name = '${room}'
    `;
    db.query(query, function(err, res){
        console.log('data', JSON.parse(res))
        return res
    })
    return users.filter(user => user.room === room);
}

module.exports = {userjoin, getCurrentUser, userLeave, getRoomUsers}