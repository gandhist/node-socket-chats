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

        resp = resp.map(value => {
            if (!value.last_message || value.last_message == '') {
                let filler = value.filename ?? ''
                value.last_message = filler 
            }
            delete value.filename
            return value
        })

        res.status(200).json({
            message: "group list!",
            data: resp
        });
    })
}

module.exports = {
    list
}