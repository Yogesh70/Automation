let fs = require("fs");
const { Condition } = require("selenium-webdriver");

//syntax sugar=> Promises -> es7
(async function() {
    try {
        console.log("Before");
        let f1kapromise = fs.promises.readFile("f1.txt");
        let content = await f1kapromise;
        console.log(content + "");
        console.log("After");
    } catch (err) {
        console.log(err);
    }
})();

// es5
let f1kapromise = fs.promises.readFile("f1.txt");
f1kapromise.then(function(content) {
    console.log("Before");
    console.log(content + "");
    console.log("After");
})