const moment = require('moment')


function formatMessage(send_by = '', username, text, type_message = 'plain-text', media = '', group_id = '', room_id, time = moment().utc().valueOf()) {
    return {
        send_by: parseInt(send_by),
        sender_name: username,
        message: text,
        type_message: type_message,
        media: media,
        group_id: group_id,
        room_id: room_id,
        time: time
    }
}

module.exports = formatMessage