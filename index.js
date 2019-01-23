'use strict';

const STATE = {
  tipTotal: 0,
  mealCount: 0,
  lastTotal: 0,
  lastTip: 0
};

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

function displayPrice(input) {
  return input.toFixed(2);
}

function calculate(basePrice, taxRate, tipRate) {
  debugger;
  if (!validateInputs([basePrice, taxRate, tipRate])) {
    throw new Error('Invalid Input');
  }

  basePrice = Number(basePrice);
  taxRate /= 100;
  tipRate /= 100;
  STATE.mealCount++;
  let subTotal = basePrice * taxRate + basePrice;
  STATE.lastTip = subTotal * tipRate;
  STATE.lastTotal = subTotal + STATE.lastTip;
  STATE.tipTotal += STATE.lastTip;
}

function render() {
  let subTotal = displayPrice(STATE.lastTotal - STATE.lastTip);
  let avgTip = displayPrice(STATE.tipTotal / STATE.mealCount);

  $('.js-subtotal').val(subTotal);
  $('.js-tip').val(displayPrice(STATE.lastTip));
  $('.js-total').val(displayPrice(STATE.lastTotal));

  $('.js-tip-total').val(displayPrice(STATE.tipTotal));
  $('.js-meal-count').val(STATE.mealCount);
  $('.js-avg-tip').val(avgTip);
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

    $('.js-price-input').val('');
    $('.js-tax-input').val('');
    $('.js-tip-input').val('');

    try {
      calculate(basePrice, taxRate, tipRate);
      render();
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
