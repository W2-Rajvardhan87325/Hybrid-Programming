
const field = require("./Constant")
const connection = require("./Connection")


const displayEmployees = (callback) => {
    console.log("res");
    let queryText = `SELECT * FROM ${field.EMP_TABLE}`;
    
    connection.query(queryText, (err, res) => {
        console.log("err");
        if (err == null) {
            return callback(null, err);
            console.log(res);
        }
        else {
            callback(res, null)
            console.log(res);
        }
    })
}

module.exports = {
    displayEmployees
}