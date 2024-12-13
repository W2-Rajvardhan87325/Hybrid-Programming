// Importing Constants
const field = require("./Constant")

// 1. Import Mysql Package
const mysql = require('mysql2');

// 2. Import Mysql Package
function createConnection() {
    var connDetails = {
        host: field.DB_HOSTNAME,
        user: field.DB_USERNAME,
        password: "manager",
        database: field.DB_NAME,
        port: 3306
    }

    const connection = mysql.createConnection(connDetails);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to database');
    });

    return connection;
}


module.exports = { createConnection };