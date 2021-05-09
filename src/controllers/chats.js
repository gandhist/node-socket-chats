const dotenv = require('dotenv');
const ChatModel = require('../models/chats')
// get config vars
dotenv.config();



const list = (req, res) => {
    const { id } = req.params;
    ChatModel.list(id, (err, resp) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json({ message: "chat ditemukan", data: resp });
    })
    // if (req.is_group) {
    //     ChatModel.list(user, (err, resp) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.status(200).json({ message: "chat ditemukan", data: resp });
    //     })
    // }

}

module.exports = { list }