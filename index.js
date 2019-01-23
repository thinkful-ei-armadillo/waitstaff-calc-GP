'use strict';

function showErrors() {}

function validateInputs(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!validateInput(arr[i])) {
      return false;
    }
  }
  return true;
}

function validateInput(input) {
  const reg = /^-?\d+\.?\d*$/;
  return reg.test(input);
}

function calculate(basePrice, taxRate, tipRate) {
  if (!validateInputs([basePrice, taxRate, tipRate])) {
    throw new Error('Invalid Input');
  }
}

function handleSubmit() {
  $('.meal-form').submit(function(event) {
    event.preventDefault();
    const basePrice = $(event.currentTarget)
      .find('.js-price-input')
      .val();
    const taxRate = $(event.currentTarget)
      .find('.js-tax-input')
      .val();
    const tipRate = $(event.currentTarget)
      .find('.js-tip-input')
      .val();
    try {
      calculate(basePrice, taxRate, tipRate);
    } catch (e) {
      showErrors(e);
    }
  });
}

function handleCancel() {}

function handleReset() {}

function handleWaitStaffCalc() {
  handleSubmit();
  handleCancel();
  handleReset();
}

$(handleWaitStaffCalc);
