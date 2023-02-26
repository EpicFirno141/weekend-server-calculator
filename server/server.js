const express = require('express');
const app = express();

const PORT = 5001;

app.use(express.static('server/public'));
app.use(express.json());

let calculations = [];
let result = {result: 0};

// This is just something that I made after submitting because I was curious
// to see if I could actually make a functional calculator by myself. The only thing
// that I ended up copying was the regex for the split functions. I believe that
// this function works correctly.
function newCalculator(calculation) {
    console.log(calculation);
    // Looks through calculation string and checks if it has multiplication OR division
    if(calculation.includes('*') === true || calculation.includes('/') === true) {
        // Looks if string has '/-----' where the dashes are any number of any length and puts them into an array
        let regex = '\/[0-9]+';
        let regArray = [...calculation.matchAll(regex)].flat();
        for(let num of regArray) {
            let noDivSign = num.slice(1);
            // Takes each item in the array, removes the / and then turns it into a decimal 
            let newNum = String(1/Number(noDivSign));
            // Replaces all division with multiplication of decimals (3/2 -> 3*0.5)
            calculation = calculation.replace(num, `*${newNum}`);
        }
        let multSplit = calculation.split(/[+-]+/);
        for(let num of multSplit) {
            // Goes through all items in multSplit and only takes the ones with multiplication
            if(num.includes('*')) {
                let multiply = num.split('*');
                console.log(multiply);
                // Does multiplication here
                let initMult = 1;
                for(let numbers of multiply) {
                    initMult = initMult * Number(numbers);
                }
                // Takes section of original calculation with multiplication and replaces it with the finished product
                calculation = calculation.replace(num, String(initMult));
            }
        }
    }
    // Checks if the calculation string has any + OR - operations
    if(calculation.includes('+') === true || calculation.includes('-') === true) {
        // Replaces all instances of - with +- (Effectively making them negative numbers that are added now)
        let preAddition = calculation.replaceAll('-','+-');
        let addition = preAddition.split('+');
        // Does addition here
        let initAdd = 0;
        for(let numbers of addition) {
            initAdd = initAdd + Number(numbers);
        }
        // Since we are at the bottom of the list of operators, I just make calculation the finished product.
        calculation = String(initAdd);
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
    calculations.push(newCalc);
    newCalculator(newCalc.calculation);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});