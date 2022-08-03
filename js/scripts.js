"use strict";

const buttons = document.querySelectorAll(".calculator-tip-section-tips");
const billInput = document.querySelector(".bill-input");
const customTipInput = document.querySelector(".custom-tip-input");
const numberOfPeopleInput = document.querySelector(".number-of-people-input");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const btnReset = document.querySelector(".btn-reset");

buttons.forEach(function (button) {
    button.addEventListener("click", (event) => {
        buttons.forEach(button => {
            button.classList.remove('active');
        })

        if (event.target.classList.contains('calculator-tip-section-tips')) {
            event.target.classList.add('active');
        } else {
            event.target.parentElement.classList.add('active');
        }

        calculateTip();
    })
})

btnReset.addEventListener("click", (event) => {
    billInput.value = "0";
    numberOfPeopleInput.value = "1";
    customTipInput.value = "";
    tipAmount.innerHTML = "$0";
    totalAmount.innerHTML = "$0";
    buttons.forEach((button, index) => {
        button.classList.remove('active');
        if (index === 2) {
            button.classList.add("active");
        }
    })
})

billInput.addEventListener('keyup', (event) => {
    if (billInput.value == 0) {
        alert("Please the bill can't be 0");
    }

    if (billInput.value > 99999) {
        billInput.value = 99999;
    }
    calculateTip();
});

customTipInput.addEventListener('keyup', (event) => {
    if (customTipInput.value == 0) {
        alert("Please the discount can't be 0");
    }

    if (customTipInput.value > 99) {
        customTipInput.value = 99;
    }
    calculateTip();
});

numberOfPeopleInput.addEventListener('keyup', (event) => {
    if (numberOfPeopleInput.value == 0) {
        alert("The number of people can't be 0");
    }

    if (numberOfPeopleInput.value > 99) {
        numberOfPeopleInput.value = 99;
    }
    calculateTip();
});

function isPositiveNumber(event) {
    const value = event.key + event.target.value;
    const regex = /^[0-9]+$/;

    if (value.trim() === "") {
        return true;
    }

    if (!value.match(regex)) {
        return false
    }

    if (value < 0) {
        return false;
    }

    return true;
}

function calculateTip() {
    const billValue = parseFloat(billInput.value);
    const numberOfPeople = parseFloat(numberOfPeopleInput.value);
    let percentageValue = parseInt(document.querySelector('.calculator-tip-section-tips.active').innerHTML);
    const customPercentage = document.querySelector('.tip-section-custom.active');
    if (customPercentage) {
        percentageValue = parseFloat(customTipInput.value);
    }

    const billPerPerson = billValue / numberOfPeople;
    const tipPerPerson = ((percentageValue / 100) * billValue / numberOfPeople);
    const totalAmountValue = (billPerPerson + tipPerPerson).toFixed(2);

    const tipAmountValue = Math.trunc(percentageValue * (billValue / numberOfPeople)) / 100;

    tipAmount.innerHTML = `$${tipAmountValue}`;
    totalAmount.innerHTML = `$${totalAmountValue}`;
}