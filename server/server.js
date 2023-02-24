const express = require('express');
const app = express();

const PORT = 5001;

app.use(express.static('server/public'));
app.use(express.json());

let calculations = [];

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
                }
            } 
            else if(calc.indexOf("-") >= 0 || calc.indexOf("+") >= 0 || calc.indexOf("/") >= 0) {
                console.log('Too many operators detected.');
            }
            else {
                let multCalc = calc.split("*");
                console.log(multCalc);
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
    }
}

app.post('/calc', (req, res) => {
    let newCalc = req.body;
    console.log(newCalc);
    calculations.push(newCalc);
    console.log(calculations);
    calculate(newCalc.calculation);
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})