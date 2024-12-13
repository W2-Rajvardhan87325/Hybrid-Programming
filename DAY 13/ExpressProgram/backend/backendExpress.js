const mysql = require("mysql2");
const express = require("express");
const field = require("./Constant");

const app = express();

// Middleware is added to parse the client JSON obj.
app.use(express.json());

var connDetails = {
    host: field.DB_HOSTNAME,
    user: field.DB_USERNAME,
    password: "manager",
    database: field.DB_NAME,
    port: field.MYSQL_PORT
}

app.get("/employee", (req, resp) => {
    const connection = mysql.createConnection(connDetails);
    connection.connect();

    let queryText = `SELECT * FROM ${field.EMP_TABLE}`;

    connection.query(queryText, (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err) {
            resp.write(err.message);
        }
        else {
            let jsonString = JSON.stringify(result);
            resp.write(jsonString);
        }
        resp.end();
        connection.end();
    })
})

app.post("/employee", (req, resp) => {
    const connection = mysql.createConnection(connDetails);
    connection.connect();

    let queryText = `INSERT INTO ${field.EMP_TABLE} 
    (${field.EMP_NAME}, ${field.EMP_EMAIL}, ${field.EMP_PASSWORD}, ${field.EMP_ADDRESS}) 
    VALUES (?, ?, ?, ?)`;

    let values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.address
    ]

    connection.query(queryText, values, (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err) {
            resp.write(err.message);
        }
        else {
            let jsonString = JSON.stringify(result);
            if (jsonString.affectedRows > 0) {
                resp.write(jsonString);
            }
        }
        resp.end();
        connection.end();
    })
})

app.put("/employee/:id", (req, resp) => {
    let empId = req.params.id;
    const connection = mysql.createConnection(connDetails);
    connection.connect();

    let { name, email, password, address } = req.body;

    let queryText = `UPDATE ${field.EMP_TABLE} 
                     SET ${field.EMP_NAME} = ?, 
                         ${field.EMP_EMAIL} = ?, 
                         ${field.EMP_PASSWORD} = ?, 
                         ${field.EMP_ADDRESS} = ? 
                     WHERE ${field.EMP_ID} = ?`;

    let values = [name, email, password, address, empId];

    connection.query(queryText, values, (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err) {
            resp.write(err.message);
        } else {
            let jsonString = JSON.stringify(result);
            if (result.affectedRows > 0) {
                resp.write(jsonString);
            }
        }
        resp.end();
        connection.end();
    });

})

app.delete("/employee/:id", (req, resp) => {
    let empId = req.params.id;
    const connection = mysql.createConnection(connDetails);
    connection.connect();

    let queryText = `DELETE FROM ${field.EMP_TABLE} WHERE ${field.EMP_ID}=${empId}`;

    connection.query(queryText, (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err) {
            resp.write(err.message);
        }
        else {
            let jsonString = JSON.stringify(result);
            if (result.affectedRows > 0) {
                resp.write(jsonString);
            }
        }
        resp.end();
        connection.end();
    })
})

app.listen(5000, () => {
    console.log("node server started on port number 5000...! ")
})