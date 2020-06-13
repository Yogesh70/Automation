//windows: npm install selenium-webdriver chromedriver

require("chromedriver");
let { email, password } = require("../../credentials.json");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
//tabs=> tab
let tab = browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
tabWillBeOpenedPromise
    
    .then(function()  {
        //implicit timeout
        let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000
        });
        return findTimeOutP;
    })

    // Task would be performed serially...
    // .then(function (){
    //     //console.log("Home page opened");
    //     // to find an Element
    //     let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
    //     return inputBoxPromise;
    // })
    // .then(function (inputBox) {
    //     // enter Data
    //     let inputBoxWillBeFilledP = inputBox.sendKeys(email);
    //     return inputBoxWillBeFilledP;
    // }).then(function() {
    //     console.log("Data entered");
    // })

    // .then(function (){
    //     //console.log("Home page opened");
    //     // to find an Element
    //     let passwordBoxPromise = tab.findElement(swd.By.css("#input-2"));
    //     return passwordBoxPromise;
    // })
    // .then(function (passwordBox) {
    //     // enter Data
    //     let PasswordBoxWillBeFilledP = passwordBox.sendKeys(password);
    //     return PasswordBoxWillBeFilledP;
    // })
    
    //To perform the task parallely 
    .then(function() {
        let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
        let passwordBoxPromise = tab.findElement(swd.By.css("#input-2"));
        return Promise.all([inputBoxPromise, passwordBoxPromise]);
    })
    .then(function(BeArr) {
        //input Data
        let inputBox = BeArr[0];
        let passwordBox = BeArr[1];
        let inputBoxWillBeFilledP = inputBox.sendKeys(email);
        let PasswordBoxWillBeFilledP = passwordBox.sendKeys(password);
        return Promise.all([inputBoxWillBeFilledP, PasswordBoxWillBeFilledP]);
    })

    .then(function() {
        let LoginWillBeSelectedP = tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
        return LoginWillBeSelectedP;
    }).then(function(loginBtn) {
        let loginWillBeClickedP = loginBtn.click();
        return loginWillBeClickedP;
    }).then(function() {
        console.log("Login Done");
    })
    
    .then(function () {
        // go to interview prep
        let IpBtnWillBeFoundP = tab.findElement(swd.By.css("h3[title='Interview Preparation Kit']"));
        return IpBtnWillBeFoundP;
        // data-analytics="InterviewPromotionCard"
        // console.log("Login Done")
    }).then(function (IpBtn) {
        let IPBtnWillBeClickedP = IpBtn.click();
        return IPBtnWillBeClickedP;
    })
    
    .then(function () {
        // go to warmup challenges
        let wUCBtnWillSelectedP = tab.findElement(swd.By.css("a[data-attr1='warmup']"));
        return wUCBtnWillSelectedP;
    }).then(function (wUCBtn) {
        let wBtnWillBeClickedP = wUCBtn.click();
        return wBtnWillBeClickedP;
    })
    .then(function () {
        console.log("Reached warm challenges page")
        let urlOfQP = tab.getCurrentUrl();
        return urlOfQP;
    })
    .then(function(urlOfQP) {
        let questionWillBeSolvedPromise = questionSolver();
        return questionWillBeSolvedPromise;
    })
    
    // .then(function() {
    //         let solveChallengeWillBeFound = tab.findElement(swd.By.css(".challengecard-title"));
    //         return solveChallengeWillBeFound;
    // }).then(function(solveChallengeBtn) {
    //     let solveChallengeBtnWillBeC = solveChallengeBtn.click();
    //     return solveChallengeBtnWillBeC;
    // })

   .then(function() {
        console.log("First Question solved");
    })
    .catch(function(err) {
        console.log(err);
    })
    
    function questionSolver(qpUrl) {
        return new Promise(function(resolve, reject) {
            //logic to solve a question
            let allCBTnWSP = tab.findElements(swd.By.css(".challenge-submit-btn"));
            allCBTnWSP.then(function(cBtnArr) {
                let cBtnWilBeClickedP = cBtnArr[0].click();
                return cBtnWilBeClickedP;  
            })
            .then(function() {
                resolve();
            })
            .catch(function(err) {
                reject();
            })
        })
    }