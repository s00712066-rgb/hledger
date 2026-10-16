function calculateOutstanding(debts){
  let total=0;
  for (let i = 0; i < debts.length; i++) {
    total += calculateRemaining(debts[i]);
}
return total;
};

function calculateRemaining(debt){
  let payment=0;
  for (let i=0; i<debt.payments.length; i++){
    payment += debt.payments[i].paymentAmount;
  }
  return debt.originalAmount- payment;
};

export {calculateOutstanding, calculateRemaining};