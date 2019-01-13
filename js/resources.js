"use strict";



let ballPosCoef = [
    {
        pos: 1
    },
    {
        pos: 2
    },
    {
        pos: 3
    },
    {
        pos: 4
    },
    {
        pos: 5
    },
    {
        pos: 6,
        coef: 25000
    },
    {
        pos: 7,
        coef: 15000
    },
    {
        pos: 8,
        coef: 7500
    },
    {
        pos: 9,
        coef: 3000
    },
    {
        pos: 10,
        coef: 1250
    },
    {
        pos: 11,
        coef: 700
    },
    {
        pos: 12,
        coef: 350
    },
    {
        pos: 13,
        coef: 250
    },
    {
        pos: 14,
        coef: 175
    },
    {
        pos: 15,
        coef: 125
    },
    {
        pos: 16,
        coef: 100
    },
    {
        pos: 17,
        coef: 90
    },
    {
        pos: 18,
        coef: 80
    },
    {
        pos: 19,
        coef: 70
    },
    {
        pos: 20,
        coef: 60
    },
    {
        pos: 21,
        coef: 50
    },
    {
        pos: 22,
        coef: 35
    },
    {
        pos: 23,
        coef: 25
    },
    {
        pos: 24,
        coef: 20
    },
    {
        pos: 25,
        coef: 15
    },
    {
        pos: 26,
        coef: 12
    },
    {
        pos: 27,
        coef: 10
    },
    {
        pos: 28,
        coef: 8
    },
    {
        pos: 29,
        coef: 7
    }, 
    {
        pos: 30,
        coef: 6
    }, 
    {
        pos: 31,
        coef: 5
    }, 
    {
        pos: 32,
        coef: 4
    }, 
    {
        pos: 33,
        coef: 3
    },
    {
        pos: 34,
        coef: 2
    },
    {
        pos: 35,
        coef: 1
    }
];



// ball color is drawn from here
let colors = [
    "darkorange",
    "red",
    "darkblue",
    "brown",
    "black",
    "purple",
    "green",
    "yellow"
];



// ball number is drawn from here
let nums = [];
for (let i = 1; i < 49; i++) {
    nums.push(i);
}



// storing bets and choices user made before placing the bet
let userBet = {

    luckySix: {
        nums: [],
        positions: [],
        combo: null,
        coef: null,
        amount: 0,
        winnings: 0
    },
    firstOverUnder: {
        bet: null,
        amount: 0,
        winnings: 0
    },
    firstEvenUneven: {
        bet: null,
        amount: 0,
        winnings: 0
    },
    firstColor: {
        bet: null,
        amount: 0,
        winnings: 0
    },
    firstFiveOverUnder: {
        bet: null,
        amount: 0,
        winnings: 0
    },
    mostCommonColor: {
        bet: null,
        amount: 0,
        winnings: 0
    },
    profit: 0
};



let game = {
    clover_pos: [],
    first_five_sum: 0,
    current_position: 0,
    firstOverUnder: null,
    firstEvenUneven: null,
    firstColor: null,
    firstFiveOverUnder: null,
    // an array cause there may be more than one max value
    mostCommonColor: [],
    colors: {
        red: 0,
        darkblue: 0,
        black: 0,
        brown: 0,
        darkorange: 0,
        purple: 0,
        green: 0,
        yellow: 0
    }
};



