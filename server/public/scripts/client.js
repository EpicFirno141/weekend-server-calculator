
function addCharacter(event) {
    let value = event.target.innerHTML;
    let calcInput = document.querySelector('#calculatorInput');
    calcInput.value += value;
}

function clearInput(event) {
    let calcInput = document.querySelector('#calculatorInput');
    calcInput.value = '';
}

function submitCalculation(event) {
    let calculation = document.querySelector('#calculatorInput').value;
    let sentCalc = {calculation};
    axios.post('/calc', sentCalc).then((response) => {
        getAllCalculations();
        getResult();
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

function getAllCalculations() {
    let calcList = document.querySelector('#calculationList');
    calcList.innerHTML = '';
    axios.get('/calc').then((response) => {
        let calculations = response.data;
        for(let calc of calculations) {
            calcList.innerHTML += `<li>${calc.calculation}</li>`
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getResult() {
    let resultDiv = document.querySelector('#result');
    axios.get('/result').then((response) => {
        let newResult = response.data.result;
        resultDiv.innerHTML = `<b>${newResult}</b>`;
    }).catch((error) => {
        console.log(error);
    })
}

getResult();
getAllCalculations();