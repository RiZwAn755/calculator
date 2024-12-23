
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.nav');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});



let op1 = 0; 
let op2 = 0;
var result = 0;
let op = null; 
let flag = false; 


const dis = document.querySelector('.display');
const keys = document.querySelectorAll('.o1'); 
const chars = document.querySelectorAll('.opr'); 
const eq = document.querySelector('.equal');
const clear = document.querySelector('.clear'); 

var x = false;
keys.forEach(key => {
  key.addEventListener("click", function () {
    const num = +key.textContent; 
    if (dis.textContent.length >= 22) {
      dis.textContent = "Too long 🤯"; 
      x = true;
      return; 
    }

    if(x === false)
    dis.textContent += key.textContent;

   
    if (!flag) {
      op1 = op1 * 10 + num; 
    } else {
      op2 = op2 * 10 + num; 
    }

    
    console.log(`op1: ${op1}, op2: ${op2}, op: ${op}, flag: ${flag}`);
  });
});


chars.forEach(ch => {
  ch.addEventListener("click", function () {
    if (op !== null && flag && op2 !== 0) {
  
      
      calculate();
    }

  
    
    dis.textContent += ` ${ch.textContent} `; 
    op = ch.textContent; // Set the current operator
    flag = true; // Switch to entering op2
    console.log(`op1: ${op1}, op2: ${op2}, op: ${op}, flag: ${flag}`);
  });
});

// Handle equals key click
eq.addEventListener('click', function () {
  if (op !== null) {
    calculate();
    dis.textContent = result; 
    op2 = 0; 
    flag = false; 
    console.log(`op1: ${op1}, op2: ${op2}, op: ${op}, flag: ${flag}`);
    console.log(`Result: ${result}`);
    console.log(`op1: ${op1}, op2: ${op2}, op: ${op}, flag: ${flag}`);
  }
});

// // Handle clear key click
clear.addEventListener('click', function () {
  dis.textContent = ""; // Clear the display
  resetAll(); // Reset all states
  console.log(`op1: ${op1}, op2: ${op2}, op: ${op}, flag: ${flag}`);
});




// Function to perform the calculation
function calculate() {
  op = op.trim();
  switch (op) {
    case '/':
      if (op2 === 0) {
        op1 = "Error"; // Prevent division by zero
      } else {
        result =  op1 / op2;
        // op1 = op1 / op2;
        op1 = op1 / op2;
      }
      break;
    case '*':
      result = op1 * op2;
      op1 = op1 * op2;
      break;
    case '+':
      result = op1 + op2;
      op1 = op1 + op2;
      break;
    case '-':
      result = op1 - op2;
      op1 = op1 - op2;
      break;
      case '⌫': 
      {
        if (flag) {
          op2 = op2.slice(0, -1); // Remove the last character from op2
          result = op2 || '0';    // Update the result with op2 or '0' if empty
        } else {
          op1 = op1.slice(0, -1); // Remove the last character from op1
          result = op1 || '0';    // Update the result with op1 or '0' if empty
        }
        break;
      }
    
      
    default:
      break;
  }
  dis.textContent = result; // Update the display with the result
  op2 = 0; // Reset op2 after calculation
}

// Function to reset all states
function resetAll() {
  op1 = 0;
  op2 = 0;
  op = null;
  flag = false;
  result = 0;
}