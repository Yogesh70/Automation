//windows: npm install selenium-webdriver chromedriver

require("chromedriver");
let { email, password } = require("../../credentials.json");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
//tabs=> tab
let tab = browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let gcodesElements, gcInputBox, gTextArea;
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
        // console.log("interview");

        let IpBtnWillBeFoundP = tab.findElement(swd.By.css("#base-card-1-link"));
        return IpBtnWillBeFoundP;
        // data-analytics="InterviewPromotionCard"
        // console.log("Login Done")
    }).then(function (IpBtn) {
        let IPBtnWillBeClickedP = IpBtn.click();

        return IPBtnWillBeClickedP;
    }).then(function () {

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
        allCBTnWSP
            .then(function(cBtnArr) {
                let cBtnWilBeClickedP = cBtnArr[0].click();
                return cBtnWilBeClickedP;  
            })
            .then(function() {
                let editorialWillBeSelectedPromise = tab.findElement(swd.By.css("a[data-attr2='Editorial']"));
                return editorialWillBeSelectedPromise;
            })
            .then(function(editorBtn) {
                let editorBtnWillBeclickedP = editorBtn.click();
                return editorBtnWillBeclickedP;
            })
            .then(function() {
                let hlBtnP = handleLockBtn();
                console.log(hlBtnP)
                return hlBtnP;
            })
            .then(function() {
                let cCodeWillBecopied = copyCode();
                return cCodeWillBecopied;
            })
            .then(function(code) {
                let codeWillBePastedP = pasteCode(code);
                return codeWillBePastedP;
            })
            .then(function() {
                resolve();
            })
            .catch(function(err) {
                reject(err);
            })
        })
    }

    function handleLockBtn() {
        return new Promise(function(resolve,reject) {
           let lockBtnWillBeFP = tab.findElement(swd.By.css(".editorial-content-locked button.ui-btn.ui-btn-normal"));
        lockBtnWillBeFP
           .then(function(lockBtn) {
                let lockBtnWillBeCP = lockBtn.click();
                return lockBtnWillBeCP;
           })
           .then(function() {
                resolve();
           })
           .catch(function() {
               console.log("Lock button wasn't found"); 
               resolve();
           })
        })
    }

    function copyCode() {
        return new Promise(function(resolve, reject) {
            //get all the lang array
            let allLangElementP = tab.findElements(swd.By.css(".hackdown-content h3"));
            //get all the code array
            let allcodeElementP = tab.findElements(swd.By.css(".hackdown-content .highlight"));
            let bothArrayP = Promise.all([allLangElementP, allcodeElementP]);
        bothArrayP
            .then(function(bothArrays) {
                let langsElements = bothArrays[0];
                gcodesElements = bothArrays[1];
                let alllangTextP = [];
                for(let i= 0; i< langsElements.length; i++) {
                  let cLangsP = langsElements[i].getText();
                    alllangTextP.push(cLangsP);
                }   
            return Promise.all(alllangTextP);
        }).then(function(allLang) {
            let codeOfCP;
            for(let i =0; i< allLang.length;i++) {
                if(allLang[i].includes("C++")) {
                   codeOfCP = gcodesElements[i].getText();
                   break;
                }
            }
            return codeOfCP;
        }).then(function(code) {
            console.log(code);
            resolve(code);
        }).catch(function(err) {
            reject(err);
    })
        })
    }

    function pasteCode(code) {
        return new Promise(function(resolve, reject) {
            //click on Problem tab
            let pTabWillBeSelected = tab.findElement(swd.By.css("li#Problem"));
            pTabWillBeSelected
                .then(function(pTab) {
                    let pTabWillBeClicked = pTab.click();
                    return pTabWillBeClicked;
                })
                .then(function() {
                    let testInputWillBeFP = tab.findElement(swd.By.css(".custom-checkbox.inline"));
                    return testInputWillBeFP;
                })
                .then(function(testInput) {
                    let testInputWillBeCP = testInput.click();
                    return testInputWillBeCP;
                })
                .then(function() {
                    let customInputAreaWillBeSP = tab.findElement(swd.By.css(".custominput"));
                    return customInputAreaWillBeSP;
                })
                .then(function(cArea) {
                    gcInputBox = cArea;
                    let codeWillBeEP = cArea.sendKeys(code);
                    return codeWillBeEP;
                })
                .then(function() {
                    let ctrlAWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "a");
                    return ctrlAWillBeSendP;  
                })
                .then(function() {
                    let ctrlXWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "x");
                    return ctrlXWillBeSendP;
                })
                .then(function() {
                    let tAreaP = tab.findElement(swd.By.css("textarea"));
                    return tAreaP;
                })
                .then(function(tArea) {
                    gTextArea = tArea;
                    let codeWillBeEP = tArea.sendKeys(swd.Key.CONTROL + "a")
                    return codeWillBeEP;
                })
                .then(function() {
                    let ctrlVWillBeSendP = gTextArea.sendKeys(swd.Key.CONTROL + "v");
                    return ctrlVWillBeSendP;
                })
                .then(function() {
                    let submitCodeBtnWillBeSP = tab.findElement(swd.By.css(".hr-monaco-submit"));
                    return submitCodeBtnWillBeSP;
                })
                .then(function(submitBtn) {
                    let submitBtnWillBeCP = submitBtn.click();
                    return submitBtnWillBeCP;
                })
                .then(function() {
                    resolve();
                })
                .catch(function(err) {
                    reject(err);
                })
            //write the code
            //submit the code
        })       
    }

    