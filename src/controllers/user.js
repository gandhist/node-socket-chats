const UserModel = require('../models/users')
const fs = require('fs');
const db = require("../../config/db.config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
// get config vars
const {Storage} = require('@google-cloud/storage');

dotenv.config();

// Instantiate a storage client
const storage = new Storage({ keyFilename: __dirname + "/../../" +process.env.GCP_JSON_FILE, projectId: process.env.GCP_PROJECT_ID });

const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(422).send({
            error: 'error',
            message: 'username dan password tidak boleh kosong'
        })
    }

    // cek user in table 
    UserModel.getByUsername(req.body.username, function (errs, ress) {
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
    const listValidasiRegister = ['name', 'email', 'no_hp', 'tipe_user', 'username', 'password'];
    const checkEmptyForm = _validasi(req, listValidasiRegister)
    if (checkEmptyForm.length > 0) {
        return res.status(422).send({
            status: false,
            message: 'data yang diberikan tidak lengkap',
            errors: checkEmptyForm
        });
    }

    // check email
    UserModel.getByEmail(req.body.email, (errEmails, emails) => {
        // jika error query get email
        if (errEmails) {
            return res.send(errEmails);
        }
        // jika email terdaftar > 0
        if(emails.length > 0){
            return res.status(422).send({
                status: false,
                message: 'Alamat email sudah terdaftar!',
                errors: req.body.email
            });
        }

        // validasi username
        UserModel.getByUsername(req.body.username, (errUsername, usernames) => {
            // jika error query get usernames
            if (errUsername) {
                return res.send(errUsername);
            }
            // jika username terdaftar > 0
            if(usernames.length > 0){
                return res.status(422).send({
                    status: false,
                    message: 'Username sudah terdaftar!',
                    errors: req.body.username
                });
            }

            // store user register
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
            
        });
    });

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

// get profile by id
const getProfileById = (req, res) => {
    let { id } = req.params;
    if (typeof id == 'undefined') {
        id = req.user.id
    }

    UserModel.getById(id, (err, resp) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json({
            message: "Data ditemukan",
            data: resp
        });
    });
}

// update profile by id auth by userid
const update = (req, res) => {
    const {id} = req.user
    const {name, email, no_hp, about} = req.body
    const data = {
        name, email, no_hp, about
    };
    // validasi
    UserModel.update(id, data, (err, resp) => {
        if (err) {
            return res.send(err);
        }
        if (resp.affectedRows === 1) {
            res.status(200).json({
                status: true,
                message: 'Data berhasil diperbarui'
            });
        }
    });
}

// change password
const changePassword = (req, res) => {
    const {id} = req.user
    const {password} = req.body
    if(typeof password == 'undefined'){
        return res.status(422).send({
            status: true,
            message: 'Password cannot empty'
        });
    }

    if(password.length < 8 ){
        return res.status(422).send({
            status: true,
            message: 'Password max 8 character'
        });
    }

    // hash password
    const newPassword = bcrypt.hashSync(password, saltRounds);

    // validasi
    UserModel.changePassword(id, newPassword, password, (err, resp) => {
        if (err) {
            return res.send(err);
        }
        if (resp.affectedRows === 1) {
            res.status(200).json({
                status: true,
                message: 'Password berhasil diperbarui'
            });
        }
    });


    
}

// update profile by id auth by userid
const changePhoto = async (req, res) => {
    
    const user = req.user;
    try {
        if(!req.files) {
            return res.status(400).send({
                status: false,
                errors: 'No file uploaded'
            });
        } else {
            const {picture} = req.files;

            if (picture === null || typeof picture === 'undefined') {
                return res.status(401).send({
                    status: false,
                    errors: 'picture field not found'
                });
            } 
            
            let extension = picture.name.split('.')
            extension = extension[extension.length - 1]
            let tipe_picture = picture.mimetype.split('/')[0]
            
            if (tipe_picture == 'image') {
                let filename = "Picture_" + user.id + "_" + new Date().valueOf() + "." + extension
                let desti = __dirname + "/../../tmp/" + filename
                picture.mv(desti)
                let uploading = await storage.bucket('csi-absensi').upload(desti, {
                    destination: "chat/profile/" + filename,
                    resumable:false 
                });
                fs.unlinkSync(desti)

                if (uploading) {
                    let uri = "https://storage.googleapis.com/" + uploading[0].metadata.bucket + "/" + uploading[0].metadata.name
                    query = `update users_chats set picture = ? where id = ?`;
                    db.query(query, [uri, user.id], (err, resp) => {
                        if (err) {
                            res.send(err);
                        }
                        if (resp.affectedRows === 1) {
                            return res.send({
                                status: true,
                                message: {
                                    uri :uri, 
                                    donwload_uri :uploading[0].metadata.mediaLink,
                                    type: uploading[0].metadata.contentType,
                                    filename: filename
                                }
                            });
                        }
                    });                    
                }

            } else {
                return res.status(401).send({
                    status: false,
                    errors: 'File is not a valid image'
                });
            }

        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            errors: 'Fail to upload image'
        });
    }
}

module.exports = {
    login,
    register,
    getToken,
    setToken,
    getProfileById,
    update,
    changePassword,
    changePhoto
}