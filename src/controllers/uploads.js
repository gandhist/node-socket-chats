const fs = require('fs');
const db = require("../../config/db.config");
const dotenv = require('dotenv');
const moment = require('moment')
const {Storage} = require('@google-cloud/storage');

dotenv.config();

// Instantiate a storage client
const storage = new Storage({ keyFilename: __dirname + "/../../" +process.env.GCP_JSON_FILE, projectId: process.env.GCP_PROJECT_ID });


const image = async (req, res) => {
    const user = req.user;
    try {
        if(!req.files) {
            return res.status(400).send({
                status: false,
                errors: 'No file uploaded'
            });
        } else {
            let lampiran = req.files.lampiran;

            if (lampiran === null || typeof lampiran === 'undefined') {
                return res.status(401).send({
                    status: false,
                    errors: 'lampiran field not found'
                });
            } 
            
            let extension = lampiran.name.split('.')
            extension = extension[extension.length - 1]
            let tipe_lampiran = lampiran.mimetype.split('/')[0]
            
            if (tipe_lampiran == 'image') {
                let filename = "USER_UPLOAD_" + user.id + "_" + new Date().valueOf() + "." + extension
                let desti = __dirname + "/../../tmp/" + filename
                lampiran.mv(desti)
                let uploading = await storage.bucket('csi-absensi').upload(desti, {
                    destination: "chat/images/" + filename,
                    resumable:false 
                });
                fs.unlinkSync(desti)

                if (uploading) {
                    let uri = "https://storage.googleapis.com/" + uploading[0].metadata.bucket + "/" + uploading[0].metadata.name
                    query = `insert into media (file_name, extension, uri, download_uri, size, created_at, created_by) values ('${filename}', '${extension}', '${uri}', '${uploading[0].metadata.mediaLink}', '${uploading[0].metadata.size}', "${moment.utc().format('YYYY-MM-DD HH:mm:ss')}", ${user.id})`;
        
                    db.query(query);
                    
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

                return res.status(500).send({
                    status: false,
                    errors: 'Fail to upload image'
                });

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

const document = async (req, res) => {
    const user = req.user;
    try {
        if(!req.files) {
            return res.status(400).send({
                status: false,
                errors: 'No file uploaded'
            });
        } else {
            let lampiran = req.files.lampiran;

            if (lampiran === null || typeof lampiran === 'undefined') {
                return res.status(401).send({
                    status: false,
                    errors: 'lampiran field not found'
                });
            } 
        
            let extension = lampiran.name.split('.')
            extension = extension[extension.length - 1]

            let filename = "USER_UPLOAD_" + user.id + "_" + new Date().valueOf() + "." + extension
            let desti = __dirname + "/../../tmp/" + filename
            lampiran.mv(desti)
            let uploading = await storage.bucket('csi-absensi').upload(desti, {
                destination: "chat/documents/" + filename,
                resumable:false 
            });
            fs.unlinkSync(desti)

            if (uploading) {
                let uri = "https://storage.googleapis.com/" + uploading[0].metadata.bucket + "/" + uploading[0].metadata.name
                query = `insert into media (file_name, extension, uri, download_uri, size, created_at, created_by) values ('${filename}', '${extension}', '${uri}', '${uploading[0].metadata.mediaLink}', '${uploading[0].metadata.size}', "${moment.utc().format('YYYY-MM-DD HH:mm:ss')}", ${user.id})`;
    
                db.query(query);
                
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

            return res.status(500).send({
                status: false,
                errors: 'Fail to upload document'
            });

        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            errors: 'Fail to upload document'
        });
    }

}


module.exports = {
    image,
    document
}