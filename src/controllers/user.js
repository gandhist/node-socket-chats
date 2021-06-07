const UserModel = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(422).send({
            error: 'error',
            message: 'username dan password tidak boleh kosong'
        })
    }

    // cek user in table 
    UserModel.getByEmail(req.body.username, function (errs, ress) {
        if (errs) {
            console.log(errs)
            res.send(errs);
        }

        if (ress && ress.length === 0) {
            return res.status(422).send({
                status: false,
                message: 'username tidak ditemukan'
            })
        } else if (ress.length > 0) {
            const cekPassword = bcrypt.compareSync(req.body.password, ress[0].password);

            if (!cekPassword) {
                // salah
                res.status(422).send({
                    status: false,
                    message: 'password salah'
                })
            } else {
                delete ress[0].password
                return res.status(200).send({
                    status: true,
                    message: "berhasil login!",
                    data: ress[0]
                });
            }
        }
    })

}

const _validasi = (req, arrayField) => {
    let err = [];
    arrayField.forEach(el => {
        if (req.body[el] === undefined || req.body[el] === "") {
            err = [...err, {
                error: `${el} tidak boleh kosong`
            }]
        }
    });
    return err;
}

const register = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: true,
            message: 'Please provide all required field'
        });
    }

    // validasi
    const listValidasiRegister = ['name', 'email', 'no_hp', 'tipe_user', 'password'];
    const checkEmptyForm = _validasi(req, listValidasiRegister)
    if (checkEmptyForm.length > 0) {
        return res.status(422).send({
            status: false,
            message: 'data yang diberikan tidak lengkap',
            errors: checkEmptyForm
        });
    }

    // else {
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const newUser = new UserModel({
        ...req.body,
        hint: req.body.password,
        password: password
    });
    UserModel.register(newUser, function (err, user) {
        if (err) {
            return res.send(err);
        }
        // generate token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (3600 * (60 * 400)), // 4tahun expired time
            id: user,
            name: req.body.name,
            tipe_user: req.body.tipe_user,
            email: req.body.email,
            no_hp: req.body.no_hp,
        }, process.env.TOKEN_SECRET)
        // update registered user to get jwt
        UserModel.updateJwt({
            id: user,
            token: token
        }, function (errs, ress) {
            if (errs) {
                res.send(errs);
            }
            if (ress.affectedRows === 1) {
                res.status(200).json({
                    status: true,
                    message: 'Registrasi berhasil'
                });
            }
        })
        // res.status(200).json(user);
    })
    // }
}

const setToken = (req, res) => {
    // validasi
    const listValidasiToken = ['token'];
    const { token } = req.body
    const checkEmptyForm = _validasi(req, listValidasiToken)
    if (checkEmptyForm.length > 0) {
        return res.status(422).send({
            status: false,
            message: 'data yang diberikan tidak lengkap',
            errors: checkEmptyForm
        });
    }
    UserModel.setTokenFirebase(
        req.user.id,
        token, 
        function (errs, ress) {
        if (errs) {
            return res.send(errs);
        }
        if (ress.affectedRows === 1) {
            return res.status(200).json({
                status: true,
                message: 'Update Token Firebase berhasil'
            });
        }
    })
}

const getToken = (req, res) => {
    UserModel.getTokenFirebase(req.user.id, (err, resp) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json({
            message: "Token Firebase",
            data: resp[0].token_firebase
        });
    })
}


module.exports = {
    login,
    register,
    getToken,
    setToken
}