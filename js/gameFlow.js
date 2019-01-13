"use strict";



// position 2 clovers
function gameDisp() {

    // choosing clover positions
    game.clover_pos[0] = Math.floor(6.5 + Math.random() * 30);
    while (true) {
        let clover_pos2 = Math.floor(6.5 + Math.random() * 30);
        if (clover_pos2 === game.clover_pos[0]) {
            continue;
        } else {
            game.clover_pos[1] = clover_pos2;
            break;
        }
    }
    // inserting clovers
    let clovers = document.querySelectorAll(".clover");
    insertClover(game.clover_pos[0], clovers[0]);
    insertClover(game.clover_pos[1], clovers[1]);
    // getting infoArea ready
    sumCounter.style.backgroundColor = "maroon";
    infoArea.style.border = "6px solid maroon";
    setTimeout(initGame, 2000);
}



// placing clovers on 2/30 positions
function insertClover(posNum, clover) {

    // QUESTION TypeError: pos is null every once in a while
    let pos = document.querySelector(".circle1[data-position='" + posNum + "']");
    let colPos = pos.getAttribute("data-col-position");
    let col = pos.offsetParent;
    col.insertBefore(clover, pos);
    clover.style.top += colPos * 81 + "px";
}



// random ball animation
function initGame() {

    if (game.current_position === 35) {
        resolveBets();
    } else {
        let colorN = Math.floor(Math.random() * colors.length);
        let randCol = colors[colorN];
        let randBallN = Math.floor(Math.random() * nums.length);
        let randBall = nums[randBallN];
        nums.splice(randBallN, 1);

        rotatingBall.style.backgroundColor = randCol;
        ballNumber.innerHTML = randBall;
        let counter = 0;
        let rotatingInt = setInterval(function () {

            counter++;
            // fade-in effect
            rotatingBall.style.height = counter + "px";
            rotatingBall.style.width = counter + "px";
            rotatingBall.style.top = (250 - counter) + "px";
            rotatingBall.style.right = (125 - counter / 2) + "px";
            // adjusting ball number area
            ballNumber.style.fontSize = counter / 5 + "px";
            ballNumber.style.lineHeight = counter / 2 + "px";
            // adjusting white edges
            ballNumber.style.boxShadow = "0 " + counter * 0.7 + "px 0 " + counter * 0.06666 + "px white" + ",0 " + (-1) * (counter * 0.7) + "px 0 " + counter * 0.06666 + "px white" +
                "," + (counter * 0.7) + "px 0 0 " + counter * 0.06666 + "px white" + "," + (-1) * (counter * 0.7) + "px 0 0 " + counter * 0.06666 + "px white";
            // rotating the ball    
            rotatingBall.style.transform = "rotateZ(" + counter / 5 + "deg)";
            if (counter === 250) {
                clearInterval(rotatingInt);
                rotatingBall.style.height = 0;
                ballChosen(randBall, randCol);
            }
        }, 5);
    }
}



// in Ball chosen update userbet.luckySix.positions if ball is one of luckySix



// update game-state objects and properties due to a new ball coming out
function ballChosen(num, col) {

    setTimeout(initGame, 1500);
    // place ball in a position
    game.current_position++;
    let pos = document.querySelector(".circle1[data-position='" + game.current_position + "']");
    let posBall = pos.children[0];
    posBall.style.backgroundColor = col;
    posBall.children[0].innerHTML = num;
    posBall.style.display = "block";
    // check if freshly drawn number is among numbers user has choosen
    if (userBet.luckySix.positions.length < 6) {
         for (let i = 0; i < userBet.luckySix.nums.length; i++) {
            //  console.log(num);
            //  console.log(userBet.luckySix.nums[i]);
             if (Number(userBet.luckySix.nums[i]) === num) {
                 userBet.luckySix.positions.push(game.current_position);
             }
         }
    }
    betCheck(num, col);
}



// checking the individual bets status and updating infoArea
function betCheck(num, col) {

    if (game.current_position < 6) {
        // updating firstFiveOverUnder
        game.first_five_sum += num;
        if (game.first_five_sum > 150) {
            sumCounter.style.height = "150px";
            sumCounter.style.top = 0;
        } else {
            sumCounter.style.height = game.first_five_sum + "px";
            sumCounter.style.top = 150 - game.first_five_sum + "px";
        }
        sumCounter.innerHTML = game.first_five_sum;
        if (game.current_position === 1) {
            // resolving firstOverUnder
            if (num > 24.5) {
                game.firstOverUnder = "over";
                let infoField = firstOverUnderInfo.children[0];
                infoField.style.backgroundColor = "#009900";
                infoField.style.color = "white";
            } else {
                game.firstOverUnder = "under";
                let infoField = firstOverUnderInfo.children[1];
                infoField.style.backgroundColor = "#009900";
                infoField.style.color = "white";
            }
            // resolving firstEvenUneven
            if (num % 2 === 0) {
                game.firstEvenUneven = "even";
                let infoField = firstEvenUnevenInfo.children[0];
                infoField.style.backgroundColor = "#009900";
                infoField.style.color = "white";
            } else {
                game.firstEvenUneven = "uneven";
                let infoField = firstEvenUnevenInfo.children[1];
                infoField.style.backgroundColor = "#009900";
                infoField.style.color = "white";
            }
            // resolving firstColor
            game.firstColor = col;
            if (col === "darkblue") {
                firstColorInfo.innerHTML = "blue";
            } else if (col === "darkorange") {
                firstColorInfo.innnerHTML = "orange";
            } else {
                firstColorInfo.innerHTML = col;
            }
            firstColorInfo.style.backgroundColor = col;
            firstColorInfo.style.color = "white";
        } else if (game.current_position === 5) {
            // resolving firstFiveOverUnder
            sumCounter.style.backgroundColor = "#009900";
            sumCounter.style.color = "white";
            if (game.first_five_sum > 122.5) {
                game.firstFiveOverUnder = "over";
                sumCounterDisp.innerHTML = "Over";
            } else {
                game.firstFiveOverUnder = "under";
                sumCounterDisp.innerHTML = "Under";
            }
        }
    }
    // updating mostCommonColor
    switch (col) {
        case "red":
            game.colors.red++;
            redSlidingBall.innerHTML = game.colors.red;
            redSlidingBall.style.top = (135 - game.colors.red * 10) + "px";
            break;
        case "darkblue":
            game.colors.darkblue++;
            blueSlidingBall.innerHTML = game.colors.darkblue;
            blueSlidingBall.style.top = (135 - game.colors.darkblue * 10) + "px";
            break;
        case "black":
            game.colors.black++;
            blackSlidingBall.innerHTML = game.colors.black;
            blackSlidingBall.style.top = (135 - game.colors.black * 10) + "px";
            break;
        case "brown":
            game.colors.brown++;
            brownSlidingBall.innerHTML = game.colors.brown;
            brownSlidingBall.style.top = (135 - game.colors.brown * 10) + "px";
            break;
        case "darkorange":
            game.colors.darkorange++;
            orangeSlidingBall.innerHTML = game.colors.darkorange;
            orangeSlidingBall.style.top = (135 - game.colors.darkorange * 10) + "px";
            break;
        case "purple":
            game.colors.purple++;
            purpleSlidingBall.innerHTML = game.colors.purple;
            purpleSlidingBall.style.top = (135 - game.colors.purple * 10) + "px";
            break;
        case "green":
            game.colors.green++;
            greenSlidingBall.innerHTML = game.colors.green;
            greenSlidingBall.style.top = (135 - game.colors.green * 10) + "px";
            break;
        case "yellow":
            game.colors.yellow++;
            yellowSlidingBall.innerHTML = game.colors.yellow;
            yellowSlidingBall.style.top = (135 - game.colors.yellow * 10) + "px";
            break;
        default:
            break;
    }
}