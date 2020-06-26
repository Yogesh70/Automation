let fs = require("fs");

console.log("Before");
let f1kaPromise = fs.promises.readFile("f1.txt");

let thenkaPromise = f1kaPromise.then(function scb(data) {
        console.log("Content: " + data);
        return "string";
})

console.log(thenkaPromise);

console.log("After");

setTimeout(function() {
    console.log(thenkaPromise);
    setTimeout(function() {
        thenkaPromise.then(function(data) {
            console.log("Inside then attached later");
            console.log(data); 
        })
    },3000)
}, 1000);
