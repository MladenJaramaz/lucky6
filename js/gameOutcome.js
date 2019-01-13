"use strict";



// resolve outcome of mostCommonColor and luckySix
let winningCoef;
let cloverCoef;

function resolveBets() {

    // resolving luckySix
    if (userBet.luckySix.positions.length === 6) {
        let winningPos = userBet.luckySix.positions[5];
        winningCoef = ballPosCoef[winningPos - 1].coef;
    }
    // if user has won determine if he hit clover or 2
    if (winningCoef !== undefined) {
        cloverCoef = 1;
        for (let i = 0; i < userBet.luckySix.positions.length; i++) {
            if (userBet.luckySix.positions[i] === game.clover_pos[0] || userBet.luckySix.positions[i] === game.clover_pos[1]) {
                cloverCoef++;
            }
        }
    }
    // resolving mostCommonColor
    let colVals = [];
    let key;
    for (key in game.colors) {
        colVals.push(game.colors[key]);
    }
    let max = Math.max(...colVals);
    let key2;
    for (key2 in game.colors) {
        if (game.colors[key2] === max) {
            game.mostCommonColor.push(key2);
        }
    }

    calcWinnings();
}



function calcWinnings() {

    // calculate firstOverUnder, if bet exists and is true to outcome
    if (userBet.firstOverUnder.amount) {
        if (userBet.firstOverUnder.bet === game.firstOverUnder) {
            userBet.firstOverUnder.winnings = userBet.firstOverUnder.amount * 1.92;
        }
    }
    // calculate firstEvenUneven, if bet exists and is true to outcome
    if (userBet.firstEvenUneven.amount) {
        if (userBet.firstEvenUneven.bet === game.firstEvenUneven) {
            userBet.firstEvenUneven.winnings = userBet.firstEvenUneven.amount * 1.92;
        }
    }
    // calculate firstColor, if bet exists and is true to outcome
    if (userBet.firstColor.amount) {
        if (userBet.firstColor.bet === game.firstColor) {
            userBet.firstColor.winnings = userBet.firstColor.amount * 6.5;
        }
    }
    // calculate firstFiveOverUnder, if bet exists and is true to outcome
    if (userBet.firstFiveOverUnder.amount) {
        if (userBet.firstFiveOverUnder.bet === game.firstFiveOverUnder) {
            userBet.firstFiveOverUnder.winnings = userBet.firstFiveOverUnder.amount * 1.92;
        }
    }
    // calculate mostCommonColor, if bet exists and is true to outcome
    if (userBet.mostCommonColor.amount) {
        for (let i = 0; i < game.mostCommonColor.length; i++) {
            if (userBet.mostCommonColor.bet === game.mostCommonColor[i]) {
                userBet.mostCommonColor.winnings = userBet.mostCommonColor.amount * 6.5;
            }
        }
    }
    // calculate luckySix winning, if user hit 6 numbers, taking winningCoef, cloverCoef
    if (userBet.luckySix.amount) {
        if (winningCoef !== undefined) {
            let betCoef = userBet.luckySix.amount * userBet.luckySix.coef;
            let gameCoef = winningCoef * cloverCoef;
            userBet.luckySix.winnings = betCoef * gameCoef;
        }
    }
    // calculate accumulate profit
    let bets = userBet.firstOverUnder.amount + userBet.firstEvenUneven.amount + userBet.firstColor.amount + userBet.firstFiveOverUnder.amount +
        userBet.mostCommonColor.amount + userBet.luckySix.amount;
    let winnings = userBet.firstOverUnder.winnings + userBet.firstEvenUneven.winnings + userBet.firstColor.winnings + userBet.firstFiveOverUnder.winnings +
        userBet.mostCommonColor.winnings + userBet.luckySix.winnings;
    userBet.profit = Math.round(Number(winnings) - Number(bets));

    resDisp();
}



// display results to the user
function resDisp() {

    // enlarging animation
    resultParent.style.display = "block";
    resultParent.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    let counter = 0;
    let dispInt = setInterval(function () {
        counter += 10;
        result.style.width = (counter * 7) + "px";
        // result.style.height = (counter * 3) + "px";
        if (counter === 100) {
            clearInterval(dispInt);
        }
    }, 1);
    // filling it with info
    firstOverUnderResult.children[0].children[0].innerHTML = userBet.firstOverUnder.amount;
    firstOverUnderResult.children[1].children[0].innerHTML = userBet.firstOverUnder.winnings;
    firstEvenUnevenResult.children[0].children[0].innerHTML = userBet.firstEvenUneven.amount;
    firstEvenUnevenResult.children[1].children[0].innerHTML = userBet.firstEvenUneven.winnings;
    firstColorResult.children[0].children[0].innerHTML = userBet.firstColor.amount;
    firstColorResult.children[1].children[0].innerHTML = userBet.firstColor.winnings;
    firstFiveOverUnderResult.children[0].children[0].innerHTML = userBet.firstFiveOverUnder.amount;
    firstFiveOverUnderResult.children[1].children[0].innerHTML = userBet.firstFiveOverUnder.winnings;
    mostCommonColorResult.children[0].children[0].innerHTML = userBet.mostCommonColor.amount;
    mostCommonColorResult.children[1].children[0].innerHTML = userBet.mostCommonColor.winnings;
    luckySixResult.children[0].children[0].innerHTML = userBet.luckySix.amount;
    luckySixResult.children[1].children[0].innerHTML = Math.round(userBet.luckySix.winnings);
    profit.children[0].innerHTML = userBet.profit + "RSD";

    initTopProfits();
}



// enable user to close result window
resBtn.addEventListener("click", hideResults);
function hideResults() {

    let counter = 1;
    let hideInt = setInterval(function () {
        counter -= 0.05;
        result.style.opacity = counter;
        if (counter < 0) {
            result.style.display = "none";
            clearInterval(hideInt);
        }
    }, 50);
}



function initTopProfits() {

    if (localStorage["topProfits"] === undefined) {
        let firstEntry = {
            list: [{
                val: userBet.profit
            }]
        };
        localStorage.topProfits = JSON.stringify(firstEntry);
    } else {
        let topProfitsObj = JSON.parse(localStorage.topProfits);
        compareToExisting(topProfitsObj, userBet.profit);
    }
}



// compare current profit to top5 profits
function compareToExisting(topProfits, curProfit) {

    let entries = topProfits.list.length;
    if (entries === 5) {
        for (let i = 0; i < entries; i++) {
            if (curProfit >= topProfits.list[i].val) {
                topProfits.list.splice(i, 0, {
                    val: curProfit
                });
                topProfits.list.splice(5, 1);
                break;
            }
        }
    } else {
        let smaller_value = false;
        for (let i = 0; i < entries; i++) {
            if (curProfit >= topProfits.list[i].val) {
                topProfits.list.splice(i, 0, {
                    val: curProfit
                });
                smaller_value = true;
                break;
            }
        }
        if (!smaller_value) {
            topProfits.list[entries] = {
                val: curProfit
            };
        }
    }
    localStorage.topProfits = JSON.stringify(topProfits);
    topProfitsDisp(topProfits, entries);
}



// display top5 profits
function topProfitsDisp(topProfits, entries) {
    
    for (let i = 0; i < entries; i++) {
        topProfitsList.children[i].innerHTML = (i + 1) + " : " + topProfits.list[i].val;
    } 
}