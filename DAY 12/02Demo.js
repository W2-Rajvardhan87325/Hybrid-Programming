var imported = require('./Calc');

console.log(imported);
var result1 = imported.Addition(10,20);
var result2 = imported.Multiply(10,20);

console.log(result1);

console.log(result2);

// imported.Sub(10,20);//Since Sub is not exported .. we can not call here..