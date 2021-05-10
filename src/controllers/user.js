const UserModel = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const login = (req, res) => {
    // UserModel.login()
    if (!req.body.username || !req.body.password) {
        res.status(422).json({ error: 'error', message: 'username dan password tidak boleh kosong' })
    }

    // cek user in table 
    UserModel.getByEmail(req.body.username, function (errs, ress) {
        if (errs) {
            res.send(errs);
        }
        if(ress.length === 0){
            res.status(422).json({ error: 'error', message: 'username tidak ditemukan' })
        }
        const cekPassword = bcrypt.compareSync(req.body.password, ress[0].password);
        if (!req.body.username || !req.body.password) {
            res.status(422).json({ error: 'error', message: 'lengkapi data' })
        }
        if (!cekPassword) {
            // salah
            res.status(422).json({ error: 'error', message: 'password salah' })
        }
        else {
            delete ress[0].password
            res.status(200).json({ error: false, message: "berhasil login!", data: ress[0] });
        }
        // UserModel.login({username: req.body.username}, function(err, login){
        //     if (err){
        //         res.send(err);
        //     }
        //    
        // })
    })


}

const register = (req, res) => {
    // validasi
    const password = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new UserModel({ ...req.body, hint: req.body.password, password: password });
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }
    else {
        UserModel.register(newUser, function (err, user) {
            if (err) {
                res.send(err);
            }
            // generate token
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (3600 * 60),
                id: user,
                name: req.body.name,
                tipe_user: req.body.tipe_user,
                email: req.body.email,
                no_hp: req.body.no_hp,
            }, process.env.TOKEN_SECRET)
            // update registered user to get jwt
            UserModel.updateJwt({ id: user, token: token }, function (errs, ress) {
                if (errs) {
                    res.send(errs);
                }
                if (ress.affectedRows === 1) {
                    res.status(200).json({ token });
                }
            })
            // res.status(200).json(user);
        })
    }
}



module.exports = { login, register }