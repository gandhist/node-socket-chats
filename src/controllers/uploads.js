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
                let filename = "USER_UPLOAD_" + user.id + new Date().valueOf() + "." + extension
                let desti = __dirname + "/../../tmp/" + filename
                lampiran.mv(desti)
                let uploading = await storage.bucket('csi-absensi').upload(desti, {
                    destination: "chat/" + filename,
                    resumable:false 
                });
                fs.unlinkSync(desti)

                if (uploading) {
                    query = `insert into media (file_name, extension, uri, size, created_at, created_by) values ('${filename}', '${extension}', '${uploading[0].metadata.mediaLink}', '${uploading[0].metadata.size}', "${moment.utc().format('YYYY-MM-DD HH:mm:ss')}", ${user.id})`;
        
                    db.query(query);

                    return res.send({
                        status: true,
                        message: uploading[0].metadata.mediaLink
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

module.exports = {
    image
}