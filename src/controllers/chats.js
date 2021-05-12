const dotenv = require('dotenv');
const ogs = require('open-graph-scraper');
const ChatModel = require('../models/chats')
// get config vars
dotenv.config();



const list = (req, res) => {
    const { id, tipe } = req.params;
    const user = req.user;
    if (tipe === 'group') {
        ChatModel.group(id, (err, resp) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ message: "chat group ditemukan", data: resp });
        })
    }
    else if (tipe === 'pc') {
        ChatModel.pc(user, id, (err, resp) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ message: "chat pc ditemukan", data: resp });
        })
    }

}

const getMeta = (req, res) => {
    const { url } = req.body
    if (url === "" || url === undefined) {
        return res.status(422).send({ status: false, message: 'URL tidak boleh kosong' });
    }
    ogs({ url }).then((data) => {
        if (!data.error) {
            return res.status(200).send({ data: data.result })
        }
    }).catch((err) => {
        return res.status(400).send({ status: false, message: 'Error Scrapping', data: err });

    })
}

module.exports = { list, getMeta }