// Storage functions and the local database
import save, {loadDatabase} from "./storage.js";
let database=loadDatabase();

// Functions for calculating debt balances
import {calculateOutstanding, calculateRemaining} from "./calculations.js";

// DOM elements used throughout the application
let btn1=document.querySelector(".btn1");

let section0=document.querySelector(".zero");

let search_box=document.querySelector(".search");

let section1=document.querySelector(".one");

let container1=document.querySelector(".container1");

let section2=document.querySelector(".two");

let input1=document.querySelector(".input1");

let btn3=document.querySelector(".btn3");

let btn4=document.querySelector(".btn4");

let section3=document.querySelector(".three");

let btn5=document.querySelector(".btn5");

let container2=document.querySelector(".container2");

let container3=document.querySelector(".container3");

let btn6=document.querySelector(".btn6");

let container4=document.querySelector(".container4");

let section4=document.querySelector(".four");

let btn7=document.querySelector(".btn7");

let item_name_con=document.querySelector(".item_name");

let amount1_con=document.querySelector(".original_amount");

let amount2_con=document.querySelector(".remaining_amount");

let date_con=document.querySelector(".date");

let notes_con=document.querySelector(".notes");

let status_con=document.querySelector(".status");

let history_con=document.querySelector(".history");

let btn8=document.querySelector(".btn8");

let btn9=document.querySelector(".btn9");

let btn10=document.querySelector(".btn10");

let section5=document.querySelector(".five");

let input2=document.querySelector(".input2");

let input3=document.querySelector(".input3");

let input4=document.querySelector(".input4");

let textarea=document.querySelector(".textarea");

let debtFormBtns=document.querySelector('.debtFormBtns');

let section8=document.querySelector('.section8');

// Create the Edit Debt button dynamically and add it to the debt form
let editDebt=document.createElement('button');
editDebt.textContent='Edit';
editDebt.style.width='100%';
editDebt.classList.add('hide');
debtFormBtns.appendChild(editDebt);

let btn11=document.querySelector(".btn11");

let btn12=document.querySelector(".btn12");

let section6=document.querySelector(".six");

let input5=document.querySelector(".input5");

let input6=document.querySelector(".input6");

let btn13=document.querySelector(".btn13");

let btn14=document.querySelector(".btn14");

let p1=document.querySelector('.p1');

let p2=document.querySelector('.p2');

let p3=document.querySelector('.p3');

let yes=document.querySelector('.yes');

let no=document.querySelector('.no');

let totalDebt=document.querySelector('.outstanding');

let section7=document.querySelector('.seven')

let profileName=document.querySelector('.name');

// Track which customer, debt, and customer deletion are currently selected
let selectedCustomer;
let selectedDebt;
let customerToDelete;

// Calculate the total outstanding debt for the selected customer
function outstanding(){
  return calculateOutstanding(database[selectedCustomer].debts);
}

// Hide application sections that should not be visible when the app starts
function hide(){
  section2.classList.add('hide');
  section3.classList.add('hide');
  section4.classList.add('hide');
  section5.classList.add('hide');
  section6.classList.add('hide');
  section7.classList.add('hide');
  section8.classList.add('hide');
};
hide();

// Display the selected customer's total outstanding debt
function displayOutstanding(){
  totalDebt.textContent=outstanding();
}

// Handle the first phase of the application:
// opening the customer form, adding customers, and returning to the customer list
function phase1() {
  btn1.addEventListener('click', function(){
    section2.classList.remove('hide');
    section1.classList.add('hide');
  })

  // Add a new customer to the database
  btn3.addEventListener('click', function(event){
    event.preventDefault();
    
    if (input1.value===""){
     p1.textContent='Customer name is required';
    }
    //else if (input1.value===database[i].name){
      //p1.textContent='Name already exists';
    //}
    else{
      
      const customer={
        name:input1.value,
        debts:[],
      }
      database.push(customer)
      save(database);
      renderCustomers();
      
      p1.textContent="";
      input1.value="";
      
    }
  })

  // Close the customer form and return to the customer list
  btn4.addEventListener('click', function(event){
    event.preventDefault();
    
    section2.classList.add('hide');
    section1.classList.remove('hide');
    
  });
};

// Show the selected customer's profile
function profile(){
  section1.classList.add('hide');
  search_box.classList.add('hide');
  section3.classList.remove('hide');
}

// Delete a customer from the database
function deleteCard(index){
  database.splice(index,1);
  save(database);
  renderCustomers();
}

// Render all customers as cards on the customer list
function renderCustomers(customers=database){
  container1.textContent = "";

  // Sort customers alphabetically by name
  //database.sort(function(a, b) {
  //return a.name.localeCompare(b.name);
//});

  // Create a card for each customer
  for (let i = 0; i < customers.length; i++){
    let card = document.createElement("div");
    card.classList.add("card");

    // Open the customer's profile when their card is clicked
    card.addEventListener('click', function(){
      btn1.classList.add('hide');
      selectedCustomer=database.indexOf(customers[i]);
      
      profile();
      profileName.textContent=(` ${customers[i].name}`);
      renderDebts();
      displayOutstanding();
    })

    // Create the delete button for the customer card
    let del=document.createElement('button');
    del.textContent='Delete';
    
    // Open the customer deletion confirmation screen
    del.addEventListener('click', function(event){
      event.stopPropagation();
      customerToDelete=database.indexOf(customers[i]);
      section1.classList.add('hide');
      section7.classList.remove("hide");
    })

    let h3 = document.createElement("h3");
    h3.textContent = customers[i].name;

    card.appendChild(h3);
    card.appendChild(del);
    container1.appendChild(card);
  }
}

// Confirm customer deletion
yes.addEventListener('click', function(event){
  event.preventDefault();

  deleteCard(customerToDelete);
  section7.classList.add('hide');
  section1.classList.remove('hide');
});

// Cancel customer deletion
no.addEventListener('click', function(event){
  event.preventDefault();

  section7.classList.add('hide');
  section1.classList.remove('hide');
});

// Search the customer database using the search box
function searchCustomer(){
  let searchTerm=search_box.value.trim().toLowerCase();

  // Find customers whose names contain the search term
  let results = database.filter(function(customer){
  return customer.name.toLowerCase().includes(searchTerm);
});

  // Display only the matching customers
  renderCustomers(results);
}

// Run the customer search when the search input is submitted
search_box.addEventListener('search', searchCustomer);

// Handle the debt system:
// opening the debt form, adding debts, and returning to the profile
function debtSystem(){

  // Open the debt form
  btn6.addEventListener('click', function(){
    section5.classList.remove('hide');
    section3.classList.add('hide');
  })
  
  // Add a new debt to the selected customer
  btn11.addEventListener('click', function(event){
    event.preventDefault();

    // Make sure all required debt fields have been provided
    if (input2.value==="" || input3.value==="" || input4.value===""){
      p2.textContent="Please provide all fields";
    }

    // Make sure the debt amount is greater than zero
    else if(input3.value<=0){
      p2.textContent="invalid amount";
    }

    else{
     p2.textContent="";

     // Create a new debt object
     const debt={
       item: input2.value,
       originalAmount:Number(input3.value),
       date: input4.value,
       notes:textarea.value,
       payments: []
     }

     // Add the debt to the selected customer's debt list
     database[selectedCustomer].debts.push(debt);

     // Save the updated database and refresh the interface
     save(database);
     renderDebts();
     displayOutstanding();

     // Clear the debt form
     input2.value="";
     input3.value="";
     input4.value="";
     textarea.value="";
    }
  })
  
  // Cancel the debt form and return to the customer profile
  btn12.addEventListener('click', function(event){
    event.preventDefault();
    section5.classList.add('hide');
    section3.classList.remove('hide');
  })
}

// Create the debt deletion confirmation interface dynamically
let debtConfirmation=document.createElement('div');
debtConfirmation.style.padding='15px';
debtConfirmation.style.border='2px solid aqua';
debtConfirmation.style.borderRadius='15px';
section8.appendChild(debtConfirmation);

let confirmation=document.createElement('p');
confirmation.textContent='Are you sure you want to delete this debt';
confirmation.style.textAlign='center';
debtConfirmation.appendChild(confirmation);

let confirmationBtns=document.createElement('div');
confirmationBtns.classList.add('btns');
debtConfirmation.appendChild(confirmationBtns);

// Create the Yes button for debt deletion
let debtYes=document.createElement('button');
debtYes.style.width='100%';
debtYes.textContent='Yes';
confirmationBtns.appendChild(debtYes);

// Create the No button for cancelling debt deletion
let debtNo=document.createElement('button');
debtNo.style.width='100%';
debtNo.style.padding='15px';
debtNo.textContent='No';
confirmationBtns.appendChild(debtNo);

// Delete the currently selected debt
function deleteDebt(){
  database[selectedCustomer].debts.splice(selectedDebt,1);
  save(database);
  renderDebts();
  displayOutstanding();
}

// Render all debts belonging to the selected customer
function renderDebts(){
  container2.textContent="";

  // Loop through every debt belonging to the selected customer
  for (let i=0; i<database[selectedCustomer].debts.length; i++){
    
    // Calculate the total amount already paid for this debt
    let totalPaid=0;
    for (let j=0; j<database[selectedCustomer].debts[i].payments.length; j++){
      
      totalPaid+= database[selectedCustomer].debts[i].payments[j].paymentAmount;
      
    }

    let paid = document.createElement('p');
    paid.textContent=(`Amount Paid: ${totalPaid}`);
   
   // Create the main debt card
   let card=document.createElement('div');
   card.classList.add('card2');
   
   // Container for displaying payment history
   let historyContainer=document.createElement('div');
   historyContainer.classList.add('hide');
   
   // Container for the payment history title and empty-state message
   let titleContainer=document.createElement('div');
   titleContainer.classList.add('hide');
   
   let historyTitle=document.createElement('p');
   historyTitle.textContent='Payment History';
   historyTitle.style.textAlign='center';
   historyTitle.style.fontWeight='bold';
   titleContainer.appendChild(historyTitle);
   
   // Message shown when the debt has no recorded payments
   let emptyTitle=document.createElement('p');
   emptyTitle.textContent='No payments yet';
   emptyTitle.style.textAlign='center';
   emptyTitle.style.color='light-grey';
   titleContainer.appendChild(emptyTitle);
   
   // Render every payment in the debt's payment history
   for (let a=0; a<database[selectedCustomer].debts[i].payments.length; a++){
     
     let individualPayment=document.createElement('div');
     individualPayment.style.display='flex';
     individualPayment.style.justifyContent='space-between';
     individualPayment.style.alignItems='center';
     individualPayment.style.padding='8px';
     individualPayment.style.marginBottom='5px';
     individualPayment.style.border='1px solid #ddd';
     individualPayment.style.borderRadius='8px';
     
     let amountHistory=document.createElement('p');
     amountHistory.textContent=(`Amount: ${database[selectedCustomer].debts[i].payments[a].paymentAmount}`);
     amountHistory.style.fontWeight='bold';
     
     let dateHistory=document.createElement('p');
     dateHistory.textContent=(`Date: ${database[selectedCustomer].debts[i].payments[a].paymentDate}`);
     dateHistory.style.fontSize='14px';
     
     individualPayment.appendChild(amountHistory);
     
     individualPayment.appendChild(dateHistory);
     
     historyContainer.appendChild(individualPayment);
     emptyTitle.textContent="";
   }
   
   // Expand the debt card to show more information
    card.addEventListener('click', function(){
      selectedDebt=i;
     paymentContainer.classList.remove('hide');
      detailsContainer.classList.remove('hide');
      notes.classList.remove('hide');
      historyContainer.classList.remove('hide');
      titleContainer.classList.remove('hide');
    })
   
   // Container for the debt title and "See more" text
   let viewContainer=document.createElement('div')
   viewContainer.style.display='flex';
   viewContainer.style.justifyContent='space-Between';
   viewContainer.style.alignItems='center';
   
   // Container for payment information
   let paymentContainer=document.createElement('div');
   paymentContainer.classList.add('hide');
   
   // Calculate how much of this debt is still unpaid
   let remaining=calculateRemaining(database[selectedCustomer].debts[i]);
   
   let paid2 = document.createElement('p');
   paid2.textContent=(`Remaining Debt: ${remaining}`);
   
   // Container for debt action buttons
   let detailsContainer=document.createElement('div');
   detailsContainer.classList.add('btn');
   detailsContainer.classList.add('hide');
   
   // Create the "See less" button
   let btn6c=document.createElement('button');
   btn6c.textContent="See less";
   btn6c.style.padding='15px';
   
   // Collapse the expanded debt card
   btn6c.addEventListener('click', function(event){
     event.stopPropagation();
     detailsContainer.classList.add('hide');
     paymentContainer.classList.add('hide');
     notes.classList.add('hide');
     historyContainer.classList.add('hide');
     titleContainer.classList.add('hide');
   })
   
   // Create the "Record Payment" button
   let btn6b=document.createElement('button')
   btn6b.textContent='Record Payment';
   
   // Open the payment form for the selected debt
   btn6b.addEventListener('click', function(event){
     event.stopPropagation();
     selectedDebt=i;
     section3.classList.add('hide');
     section6.classList.remove('hide');
     section6.style.marginTop='15px';
   })
   
   // Create the "Edit Debt" button
   let btn6d=document.createElement('button');
   btn6d.textContent='Edit Debt';
   
   // Load the selected debt's information into the edit form
   btn6d.addEventListener('click', function(event){
     event.stopPropagation();
    selectedDebt=i;
    section3.classList.add('hide');
    section5.classList.remove('hide');
    btn11.classList.add('hide');
    editDebt.classList.remove('hide');
    input2.value=database[selectedCustomer].debts[selectedDebt].item;
    input3.value=database[selectedCustomer].debts[selectedDebt].originalAmount;
    input4.value=database[selectedCustomer].debts[selectedDebt].date;
    textarea.value=database[selectedCustomer].debts[selectedDebt].notes;
   })
   
   // Create the "Delete Debt" button
   let btn6e=document.createElement('button');
   btn6e.textContent='Delete Debt';
   btn6e.style.padding='15px';
   
   // Open the debt deletion confirmation screen
   btn6e.addEventListener('click', function(){
     selectedDebt=i;
     section3.classList.add('hide');
     section8.classList.remove('hide')
   })
   
   // Display the basic debt information
   let item=document.createElement('p');
    item.textContent=(`Item: ${database[selectedCustomer].debts[i].item}`);
    item.style.fontWeight='bold';
    
    let viewMore=document.createElement('p')
    viewMore.textContent='See more>';
    viewMore.style.color='red';
    
   let originalAmount=document.createElement('p');
   originalAmount.textContent=(`Amount: ${database[selectedCustomer].debts[i].originalAmount}`);
   
   let date=document.createElement('p');
   date.textContent=(`Date: ${database[selectedCustomer].debts[i].date}`);
   
   let notes=document.createElement('p');
   notes.textContent=(`Notes: ${database[selectedCustomer].debts[i].notes}`);
   notes.classList.add('hide');
   
   // Add the payment information to the payment container
   paymentContainer.appendChild(paid);
   
   paymentContainer.appendChild(paid2);
   
   // Add the action buttons to the details container
   detailsContainer.appendChild(btn6b);
   
    detailsContainer.appendChild(btn6c);
    
    detailsContainer.appendChild(btn6d);
    
    detailsContainer.appendChild(btn6e);
    
    // Build the debt card structure
    viewContainer.appendChild(item);
    
    viewContainer.appendChild(viewMore);
    
    card.appendChild(viewContainer);
    
    card.appendChild(originalAmount);
    
    card.appendChild(date);
    
    card.appendChild(paymentContainer);
    
    card.appendChild(notes);
    
    card.appendChild(titleContainer);
    
    card.appendChild(historyContainer);
    
    card.appendChild(detailsContainer);
    
    container2.appendChild(card);
  }
}

// Return from the customer profile to the customer list
btn5.addEventListener('click', function(){
  btn1.classList.remove('hide');
  section1.classList.remove('hide');
  search_box.classList.remove('hide');
  section3.classList.add('hide');
})

// Update the selected debt with the edited information
editDebt.addEventListener('click', function(event){
  event.preventDefault();

  // Make sure the required fields are filled before saving the edit
  if (input2.value==="" ||  input3.value==="" ||  input4.value===""){
    p2.textContent='please enter the required fields';
  }
  else{
    database[selectedCustomer].debts[selectedDebt].item=input2.value;
    
    database[selectedCustomer].debts[selectedDebt].originalAmount=Number(input3.value);
    
    database[selectedCustomer].debts[selectedDebt].date=input4.value;
    
    database[selectedCustomer].debts[selectedDebt].notes=textarea.value;
    
    // Save the edited debt and refresh the debt list
    save(database);
    renderDebts();
    
    // Clear the edit form
    input2.value="";
    input3.value="";
    input4.value="";
    textarea.value="";
    editDebt.classList.add('hide');
    section5.classList.add('hide');
    section3.classList.remove('hide');
  }
})

// Record a payment for the currently selected debt
btn13.addEventListener('click', function(event){
  event.preventDefault();

  // Make sure the payment date and amount are provided
  if (input5.value === "" || input6.value === "") {
    p3.textContent = 'Please fill all fields';
  }

  // Reject zero or negative payments
  else if (Number(input5.value)<=0){
  p3.textContent='Invalid Amount';
  }

  // Reject values that cannot be converted into a number
  else if (Number.isNaN(Number(input5.value))) {
  p3.textContent = "Invalid amount";
}

  // Prevent the user from paying more than the remaining debt
  else if (
  Number(input5.value) >
  calculateRemaining(database[selectedCustomer].debts[selectedDebt])
) {
  p3.textContent = "Payment cannot be greater than remaining debt";
}

  else {

    // Create a payment record
    const payment = {
      paymentAmount: Number(input5.value),
      paymentDate: input6.value
    };

    // Add the payment to the selected debt's payment history
    database[selectedCustomer].debts[selectedDebt].payments.push(payment);

    // Save the payment and refresh the displayed debt information
    save(database);
    renderDebts();
    displayOutstanding();

    // Clear the payment form and show a success message
    input5.value = "";
    input6.value = "";
    p3.textContent = "Payment successful";
  }
});

// Cancel debt deletion
debtNo.addEventListener('click', function(){
  section3.classList.remove('hide');
  section8.classList.add('hide');
})

// Confirm debt deletion
debtYes.addEventListener('click', function(){
  deleteDebt();
  section8.classList.add('hide');
  section3.classList.remove('hide');
})

// Cancel the payment form and return to the customer profile
btn14.addEventListener('click', function(event){
  event.preventDefault();

  section6.classList.add('hide');
  section3.classList.remove('hide');
});

// Start the customer-management system
phase1();

// Make sure existing customers and debts have the required arrays
// This protects older saved data that may not have debts or payments
database.forEach(function(customer){

  if (!customer.debts){
    customer.debts=[];
  }

  customer.debts.forEach(function(debt){
    if (!debt.payments){
      debt.payments=[];
    }
  });

});

// Save the initialized database and render the customer list
save(database);
renderCustomers();

// Start the debt-management system
debtSystem();