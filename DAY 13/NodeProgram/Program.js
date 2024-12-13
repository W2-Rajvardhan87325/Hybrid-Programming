const prompt = require('prompt-sync')();
const DBHelper = require("./DBHelper");
const connection = require("./Connection");

var choice = 0;

do {
    console.log("\t\tMENU");
    console.log("\n1.DISPLAY EMPLOYYES\n5.EXIT\n");
    let input = prompt("Enter Your Choice :: ")
    choice = Number.parseInt(input);

    switch (choice) {
        case 1:
            DBHelper.displayEmployees(connection.createConnection());
            break;

        case 5:
            console.log("Exiting Code ...!");
            connection.end();
            break;
        default:
            console.log("Invalid Choice...!");
            break;
    }
} while (choice != 5)