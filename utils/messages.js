const moment = require('moment')


function formatMessage(send_by = '', username, text, type_message = '', group_id = '', time = moment().format('h:mm a')) {
    return {
        send_by: send_by,
        username: username,
        message: text,
        type_message: type_message,
        group_id: group_id,
        time: time
    }
}

module.exports = formatMessage