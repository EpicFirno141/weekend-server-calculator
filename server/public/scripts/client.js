function addCharacter(event) {
    let value = event.target.innerHTML;
    console.log(value);
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
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

function getAllCalculations() {
    
}