
const field = require("./Constant")

function displayEmployees(connection) {
    let queryText = `SELECT * FROM ${field.EMP_TABLE}`;
    console.log(queryText);
    connection.query(queryText, (err, res) => {
        console.log("Inside");
        if (err == null) {
            let stringJSON = JSON.stringify(res);
            console.log(stringJSON);
        }
        else {
            console.log(err);
        }
    })
}

module.exports = {
    displayEmployees
}