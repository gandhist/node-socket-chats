'use strict';

const mysql = require('mysql');

// local connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pjk3'
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