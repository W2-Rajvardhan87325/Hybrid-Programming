var fs = require('fs');

// console.log(fs);

console.log("hi");

var dirContents = fs.readdirSync("C:\\DMC_Aug24\\Day12\\NodeDemos\\BasicDemos1");
dirContents.map(item =>{console.log(item);});

console.log("bye");