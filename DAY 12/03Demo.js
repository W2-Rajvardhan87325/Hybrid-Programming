var imported = require('./Exported');

console.log(imported);

console.log(imported.pi);
imported.SayHi("mahesh");


var personObject = new imported.Person(10,"sachin", "mumbai");
personObject.Print();

console.log(imported.arr);
