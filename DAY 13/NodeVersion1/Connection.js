// Importing Constants
const field = require("./Constant")


// 1. Import Mysql Package
const mysql = require('mysql2');

// 2. Import Mysql Package
const connection = mysql.createConnection({

    host: field.DB_HOSTNAME,
    user: field.DB_USERNAME,
    password: "manager",
    database: field.DB_NAME,
    port: 3306
})



connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});




module.exports = connection;