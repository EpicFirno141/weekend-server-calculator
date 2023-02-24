const express = require('express');
const app = express();

const PORT = 5001;

app.use(express.static('server/public'));
app.use(express.json());

let calculations = [];

app.post('/calc', (req, res) => {
    let newCalc = req.body;
    calculations.push(newCalc);
    console.log(calculations);
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})