'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

console.log(process.env.DBHOST)
// local connection
const dbConfig = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
};

const dbConn = mysql.createConnection(dbConfig)

dbConn.connect(function (err) {
    if (err) {
        console.log('error while connecting to db..')
        throw err
    }
    console.log('database connected')
})

module.exports = dbConn