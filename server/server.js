const express = require('express');
const app = express();

const PORT = 5001;

app.use(express.static('server/public'));
app.use(express.json());

let calculations = [];
let result = {result: 0};

// This is kind of a hunk of code... Does all the calculations, but loaded with conditionals
// The reason being is that it checks operators with conditionals prior to calculating
// It also checks for multiple operators within the same calculation and tells the server console if there are and then stops
function calculate(calc) {
    console.log('This is calc: ' + calc);
    if(calc.indexOf("+") < 0) {
        if(calc.indexOf("-") < 0) {
            if(calc.indexOf("*") < 0) {
                if(calc.indexOf("/") < 0) {
                    console.log('No operations detected');
                } 
                else if(calc.indexOf("-") >= 0 || calc.indexOf("*") >= 0 || calc.indexOf("+") >= 0) {
                    console.log('Too many operators detected.');
                }
                else {
                    let divCalc = calc.split("/");
                    console.log(divCalc);
                    let divNum = divCalc[0];
                    for(let i = 1; i<divCalc.length; i++) {
                        divNum = divNum / Number(divCalc[i]);
                    }
                    console.log(divNum);
                    result = {result: divNum};
                }
            } 
            else if(calc.indexOf("-") >= 0 || calc.indexOf("+") >= 0 || calc.indexOf("/") >= 0) {
                console.log('Too many operators detected.');
            }
            else {
                let multCalc = calc.split("*");
                console.log(multCalc);
                let multNum = 1;
                for(let num of multCalc) {
                    multNum = multNum * Number(num);
                }
                console.log('The answer is: ' + multNum);
                result = {result: multNum};
            }
        } 
        else if(calc.indexOf("+") >= 0 || calc.indexOf("*") >= 0 || calc.indexOf("/") >= 0) {
            console.log('Too many operators detected.');
        }
        else {
            let subCalc = calc.split("-");
            console.log(subCalc);
            let subbedNum = subCalc[0];
            for (let i = 1; i<subCalc.length; i++) {
                subbedNum -= Number(subCalc[i]);
            }
            console.log('The answer is: ' + subbedNum);
            result = {result: subbedNum};
        }
    }
    else if(calc.indexOf("-") >= 0 || calc.indexOf("*") >= 0 || calc.indexOf("/") >= 0) {
        console.log('Too many operators detected.');
    }
    else {
        let addCalc = calc.split("+");
        console.log(addCalc);
        let addedNum = 0;
        for (let num of addCalc) {
            addedNum += Number(num);
        }
        console.log('The answer is: ' + addedNum);
        result = {result: addedNum};
    }
}

// This is just something that I made after submitting because I was curious
// to see if I could actually make a functional calculator by myself. The only thing
// that I ended up copying was the regex for the split functions. I believe that
// this function works correctly.
function newCalculator(calculation) {
    if(calculation.includes('*') === true) {
        let multSplit = calculation.split(/[+-/]+/);
        for(let num of multSplit) {
            if(num.includes('*')) {
                let multiply = num.split('*');
                let initMult = 1;
                for(let numbers of multiply) {
                    initMult = initMult * Number(numbers);
                }
                calculation = calculation.replace(num, String(initMult));
            }
        }
    }
    if(calculation.includes('/') === true) {
        let divSplit = calculation.split(/[+-]+/);
        for(let num of divSplit) {
            if(num.includes('/')) {
                let divide = num.split('/');
                let initDiv = divide[0];
                for(let i = 1; i<divide.length; i++) {
                    initDiv = initDiv / Number(divide[i]);
                }
                calculation = calculation.replace(num, String(initDiv));
            }
        }
    }
    if(calculation.includes('+') === true || calculation.includes('-') === true) {
        let preAddition = calculation.replaceAll('-','+-');
        let addition = preAddition.split('+');
        let initAdd = 0;
        for(let numbers of addition) {
            initAdd = initAdd + Number(numbers);
        }
        calculation = calculation.replace(calculation, String(initAdd));
    }       
    result = {result: calculation};
}

app.get('/result', (req, res) => {
    res.send(result);
    console.log('Sent result');
});

app.get('/calc', (req, res) => {
    res.send(calculations);
    console.log('Sent calculations');
});

app.post('/calc', (req, res) => {
    let newCalc = req.body;
    console.log(newCalc);
    calculations.push(newCalc);
    console.log(calculations);
   //calculate(newCalc.calculation);
    newCalculator(newCalc.calculation);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});