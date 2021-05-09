const dotenv = require('dotenv');
const GroupModel = require('../models/groups')
// get config vars
dotenv.config();



const list = (req, res) => {

    const user = req.user; // ini dari jwt dari middleware
    GroupModel.list(user, (err, resp) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json({ message: "group list!", data: resp });
    })
}

module.exports = { list }