"use strict";



// gamming area DOM
let fiveFirst = document.querySelector("#firstFive");
let numDrawn = document.querySelector("#numberDrawn");
let rotatingBall = document.querySelector("#rotatingBall");
let ballNum = document.querySelector("#ballNumber");
let nextThirty = document.querySelector("#nextThirty");
let infoArea = document.querySelector("#infoArea");
// betting area DOM
let checks = document.querySelectorAll(".checker");
let betAmounts = document.querySelectorAll("input[type='text']");
let numChoice = document.querySelector("#luckySix");
let betForm = document.querySelector("form");
let luckyCombos = document.querySelector("#luckyCombos");
let luckyBoxes;
// infoArea DOM
let firstOverUnderInfo = document.querySelector("#firstOverUnderInfo");
let firstEvenUnevenInfo = document.querySelector("#firstEvenUnevenInfo");
let firstColorInfo = document.querySelector("#firstColorInfo");
let sumCounter = document.querySelector("#sumCounter");
let sumCounterDisp = document.querySelector("#sumCounterDisp");
// sliding balls
let redSlidingBall = document.querySelector("#redSlidingBall");
let blueSlidingBall = document.querySelector("#blueSlidingBall");
let blackSlidingBall = document.querySelector("#blackSlidingBall");
let brownSlidingBall = document.querySelector("#brownSlidingBall");
let orangeSlidingBall = document.querySelector("#orangeSlidingBall");
let purpleSlidingBall = document.querySelector("#purpleSlidingBall");
let greenSlidingBall = document.querySelector("#greenSlidingBall");
let yellowSlidingBall = document.querySelector("#yellowSlidingBall");
// result DOM
let resultParent = document.querySelector("#resultParent");
let result = document.querySelector("#result");
let firstOverUnderResult = document.querySelector("#firstOverUnderResult");
let firstEvenUnevenResult = document.querySelector("#firstEvenUnevenResult");
let firstColorResult = document.querySelector("#firstColorResult");
let firstFiveOverUnderResult = document.querySelector("#firstFiveOverUnderResult");
let mostCommonColorResult = document.querySelector("#mostCommonColorResult");
let luckySixResult = document.querySelector("#luckySixResult");
let profit = document.querySelector("#profit");
let resBtn = document.querySelector("#resBtn");
let topProfitsList = document.querySelector("#topProfitsList");




// draw up page elements
window.addEventListener("load", fillItUp);
function fillItUp() {
    // draw first 5 ball positions
    let inside = "";
    for (let i = 1; i < 6; i++) {
        inside += '<div class="circle1" data-position="' + i + '"><div class="incomingBall"><div class="ballCenter"></div></div></div>'
    }
    fiveFirst.innerHTML = inside;
    // draw next 30 ball positions
    inside = "";
    for (let i = 1; i < 6; i++) {
        inside += '<div class="positionCol">';
        for (let j = 0; j < 6; j++) {
            let pos = (6 * i + j);
            inside += '<div class="circle1" data-position="' + pos + '" data-col-position="' + j + '"><div class="incomingBall"><div class="ballCenter">45</div></div></div><span class="coef">' + ballPosCoef[pos - 1].coef + '</span>';
        }
        inside += '</div>';
    }
    nextThirty.innerHTML = inside;
    // adding listeners to bet checkboxes displaying betting options
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false;
        checks[i].addEventListener("click", placeBet);
    }
    // cleaning bet amount input values and adding listeners for proccessing a bet
    for (let i = 0; i < betAmounts.length; i++) {
        betAmounts[i].value = "";
        betAmounts[i].addEventListener("blur", checkIfNum);
    }
    // adding listeners to luckyCombos 
    for (let i = 0; i < luckyCombos.children.length; i++) {
        luckyCombos.children[i].addEventListener("click", comboChoice);
    }
    // filling up 48 numbers 
    inside = "";
    for (let i = 1; i < 49; i++) {
        inside += '<div class="box">' + i + '</div>';
    }
    numChoice.innerHTML = inside;
    // adding event listeners to numeric fields 
    luckyBoxes = document.querySelectorAll(".box");
    for (let i = 0; i < luckyBoxes.length; i++) {
        luckyBoxes[i].addEventListener("click", luckyChoice);
    }
}




// showing bet amount input and bet selection based on checkbox true/false state
function placeBet() {

    if (this.checked) {
        this.nextElementSibling.nextElementSibling.style.display = "block";
        this.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "inline";
    } else {
        this.nextElementSibling.nextElementSibling.style.display = "none";
        this.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
    }
}



// checking if bet amount inputs have correct values 
function checkIfNum() {

    if (this.value) {
        let val = Number(this.value);
        if (isNaN(val) || val < 100) {
            showErr(this, val);
        }
    }
}



// displaying error message on incorrect input value 
function showErr(owner, val) {

    let err = owner.nextElementSibling.nextElementSibling;
    // write error message
    err.style.display = "inline";
    if (isNaN(val)) {
        err.innerHTML = "You entered a non-number";
    } else {
        err.innerHTML = "Minimum bet amount is 100 RSD"
    }
    // fade-in effect
    let counter = 0;
    let int = setInterval(fadeIn, 10);
    // hide it again
    setTimeout(function () {
        err.style.display = "none";
        err.style.opacity - "0";
        owner.value = "";
    }, 2000);

    // function doing the fading
    function fadeIn() {
        counter += 0.05;
        err.style.opacity = counter;
        if (counter === 1) {
            clearInterval(int);
        }
    }
}



// determining comboChoice by user
function comboChoice() {

    userBet.luckySix.combo = this.getAttribute("data-combo");
    this.style.backgroundColor = "maroon";
    this.style.color = "black";
    for (let i = 0; i < luckyCombos.children.length; i++) {
        luckyCombos.children[i].removeEventListener("click", comboChoice);
    }
    // set up winning coef depending on type of combo
    switch (userBet.luckySix.combo) {
        case "6":
            userBet.luckySix.coef = 1;
            break;
        case "7":
            userBet.luckySix.coef = 0.14285;
            break;
        case "8":
            userBet.luckySix.coef = 0.03571;
            break;
        case "9":
            userBet.luckySix.coef = 0.01190;
            break;
        case "10":
            userBet.luckySix.coef = 0.00476;
            break;
        default:
            break;
    }
}



// function storing users chocice of 6 lucky numbers
function luckyChoice() {

    if (userBet.luckySix.combo) {
        if (userBet.luckySix.nums.length >= userBet.luckySix.combo) {
            for (let i = 0; i < luckyBoxes.length; i++) {
                luckyBoxes[i].removeEventListener("click", luckyChoice);
            }
        } else {
            userBet.luckySix.nums.push(this.innerHTML);
            this.removeEventListener("click", luckyChoice);
            // mark choosen numbers
            this.style.backgroundColor = "maroon";
            this.style.color = "black";
        }
    } else {
        return;
    }
}



// processing bets the player has just placed
betForm.addEventListener("submit", processBets);
function processBets(e) {

    // sometimes .preventDefaut() is ignored
    e.preventDefault();
    if (userBet.luckySix.nums.length === Number(userBet.luckySix.combo)) {
        for (let i = 0; i < betAmounts.length; i++) {
            if (betAmounts[i].value) {
                let betType = betAmounts[i].id.replace("Amount", "");
                userBet[betType].amount = Number(betAmounts[i].value);
                userBet[betType].bet = betAmounts[i].nextElementSibling.value;
            }
        }
        betForm.removeEventListener("submit", processBets);
        gameDisp();
    } else {
        return;
    }
}