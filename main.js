class Calculator {
	constructor(previousOperationOutput, currentOperationOutput) {
		this.previousOperationOutput = previousOperationOutput;
		this.currentOperationOutput = currentOperationOutput;
		this.clear();
	}

	clear() {
		this.previousOperand = "";
		this.currentOperand = "";
		this.operator = undefined;
	}

	delete() {
		this.currentOperand = String(this.currentOperand).slice(0, -1);
	}

	addNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand += String(number);
	}

	addOperator(operator) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.calculate();
		}
		this.operator = operator;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	calculate() {
		let result;
		const previous = +this.previousOperand;
		const current = +this.currentOperand;

		if (isNaN(previous) || isNaN(current)) return;

		switch (this.operator) {
			case "+":
				result = previous + current;
				break;
			case "-":
				result = previous - current;
				break;
			case "*":
				result = previous * current;
				break;
			case "/":
				result = previous / current;
				break;
			default:
				return;
		}

		this.currentOperand = result;
		this.operator = undefined;
		this.previousOperand = "";
	}

	makeDisplayNumber(number) {
		const stringNumber = String(number);
		const integerPart = Number(stringNumber.split(".")[0]);
		const floatPart = stringNumber.split(".")[1];

		let integerDisplay;

		if (isNaN(integerPart)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerPart.toLocaleString("en", {maximumFractionDigits: 0});
		}

		if (floatPart) {
			return `${integerDisplay}.${floatPart}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperationOutput.innerText = this.makeDisplayNumber(this.currentOperand);

		if (this.operator) {
			this.previousOperationOutput.innerText = `${this.makeDisplayNumber(this.previousOperand)} ${this.operator}`;
		} else {
			this.previousOperationOutput.innerText = "";
		}
	}
}


const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperationOutput = document.querySelector("[data-previous-operation]");
const currentOperationOutput = document.querySelector("[data-current-operation]");

const calculator = new Calculator(previousOperationOutput, currentOperationOutput);

numberButtons.forEach(button => {
	button.addEventListener("click", () => {
		calculator.addNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operatorButtons.forEach(button => {
	button.addEventListener("click", () => {
		calculator.addOperator(button.innerText);
		calculator.updateDisplay();
	});
});

equalButton.addEventListener("click", () => {
	calculator.calculate();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
})