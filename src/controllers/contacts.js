const UserModel = require('../models/users')


// controller get all contacts
const getAll = (req, res) => {
    UserModel.getAll((err, resp) => {
        if(err){
            return res.send(err)
        }
        return res.status(200).send({ status: true, message: "list contact!", data: resp });
    })
}


module.exports = {getAll}