const mysql = require('mysql2');
const helper = require('http');
const field = require("./Constant")

var connDetails = {
    host: field.DB_HOSTNAME,
    user: field.DB_USERNAME,
    password: "manager",
    database: field.DB_NAME,
    port: 3306
}


function getAllEmployees(req, resp) {
    const connection = mysql.createConnection(connDetails);
    connection.connect();
    var queryText = `select * from ${field.EMP_TABLE}`;
    connection.query(queryText, (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err == null) {
            var dataInJSON = JSON.stringify(result);
            resp.write(dataInJSON);
            resp.end();
        }
        else {
            resp.write(err);
            resp.end();
        }
        connection.end();
    })
}

function insertEmployees(req, resp) {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);

            const connection = mysql.createConnection(connDetails);
            connection.connect();

            const queryText = `INSERT INTO ${field.EMP_TABLE} 
                (${field.EMP_NO}, ${field.EMP_NAME}, ${field.EMP_JOB}, ${field.EMP_MANAGER}, ${field.EMP_SALARY}, ${field.EMP_COMMISSION}, ${field.EMP_FK_DEPT_NO}) 
                VALUES (?, ?, ?, ?,?, ?, ?)`;

            const values = [
                data.empno,
                data.ename,
                data.job,
                data.mgr,
                data.sal,
                data.comm,
                data.deptno
            ];

            connection.query(queryText, values, (err, result) => {
                resp.setHeader("Content-Type", "application/json");
                if (err == null) {
                    resp.write(JSON.stringify(result));
                } else {
                    resp.write(JSON.stringify({ error: err.message }));
                }
                resp.end();
                connection.end();
            });
        } catch (err) {
            resp.setHeader("Content-Type", "application/json");
            resp.write(JSON.stringify({ error: "Invalid JSON data", details: err.message }));
            resp.end();
        }
    });
}

function updateEmployees(req, resp) {
    // Extract the ID from the URL
    const urlParts = req.url.split('/');
    const EMP_ID = urlParts[urlParts.length - 1]; // Assuming /employees/:id

    let body = '';
    req.on('data', chunk => {
        body += chunk; // Collect data chunks
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body); // Parse JSON body

            const connection = mysql.createConnection(connDetails);
            connection.connect();

            // Construct the SQL query
            const queryText = `UPDATE ${field.EMP_TABLE} 
                SET 
                    ${field.EMP_NAME} = ?, 
                    ${field.EMP_JOB} = ?, 
                    ${field.EMP_MANAGER} = ?,
                    ${field.EMP_SALARY} = ?, 
                    ${field.EMP_COMMISSION} = ?, 
                    ${field.EMP_FK_DEPT_NO} = ? 
                WHERE ${field.EMP_NO} = ?`;

            const values = [
                data.ename,
                data.job,
                data.mgr,
                data.sal,
                data.comm,
                data.deptno,
                EMP_ID
            ];

            // Execute the query
            connection.query(queryText, values, (err, result) => {
                resp.setHeader("Content-Type", "application/json");
                if (err == null) {
                    resp.write(JSON.stringify({ message: "Employee updated successfully", result }));
                } else {
                    resp.write(JSON.stringify({ error: err.message }));
                }
                resp.end();
                connection.end();
            });
        } catch (err) {
            resp.setHeader("Content-Type", "application/json");
            resp.write(JSON.stringify({ error: "Invalid JSON data", details: err.message }));
            resp.end();
        }
    });
}


function deleteEmployee(req, resp) {
    const urlParts = req.url.split('/');
    const EMP_ID = urlParts[urlParts.length - 1]; // Extract the ID from the URL

    const connection = mysql.createConnection(connDetails);
    connection.connect();

    const queryText = `DELETE FROM ${field.EMP_TABLE} WHERE ${field.EMP_NO} = ?`; // Use a parameterized query
    connection.query(queryText, [EMP_ID], (err, result) => {
        resp.setHeader("content-type", "application/json");
        if (err == null) {
            resp.write(JSON.stringify({ message: `Employee with ID ${EMP_ID} deleted successfully!`, affectedRows: result.affectedRows }));
        } else {
            resp.write(JSON.stringify({ error: err.message }));
        }
        resp.end();
        connection.end();
    });
}



const server = helper.createServer((req, resp) => {
    if (req.url == "/employees" && req.method == "GET") {
        getAllEmployees(req, resp);
    }
    else if (req.url == "/employees" && req.method == "POST") {
        insertEmployees(req, resp);
    }
    else if (req.url.startsWith("/employees/") && req.method === "PUT") {
        updateEmployees(req, resp);
    }
    else if (req.url.startsWith("/employees/") && req.method === "DELETE") {
        deleteEmployee(req, resp);
    }

})

server.listen(5000, () => {
    console.log("Server Started on PORT 5000...!")
})