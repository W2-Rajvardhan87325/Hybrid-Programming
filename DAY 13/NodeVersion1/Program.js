const prompt = require('prompt-sync')();
const method = require("./DBHelper");


var choice = 0;

do {
    var con = null;
    console.log("\t\tMENU");
    console.log("\n1.DISPLAY EMPLOYYES\n5.EXIT\n");
    let input = prompt("Enter Your Choice :: ")
    choice = Number.parseInt(input);

    switch (choice) {
        case 1:
            method.displayEmployees();


            break;

        case 5:
            console.log("Exiting Code ...!");

            break;
        default:
            console.log("Invalid Choice...!");

            break;
    }
} while (choice != 5)