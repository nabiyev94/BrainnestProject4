// Selecting the elements from the DOM
const displayed_input = document.querySelector(".displayed_input");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

// Creating the eventlistener
buttons.forEach(button => {
    button.addEventListener("click", calculate);
});

let counterDotButton = 0;
let countElements = 0;
let zeroWithDotPressed = false;
let zeroWithDotChecked = false;

// The  Function for the application to perform the desired operations
function calculate() {
    let buttonText = this.innerText;
    if (buttonText === "AC") {
        displayed_input.innerText = "";
        result.innerText = "0";
        result.style.animation = "";
        displayed_input.style.animation = "";
        counterDotButton = 0;  // After Pressing "AC" "counterDotButton" will be set to "0", 
        // otherwise we  can not press dot button 
        countElements = 0;
        zeroWithDotPressed = false;
        return;
    }

    // Slice(...) has been used to get rid of the elements on the display when we want to perform new operation
    // or sometimes it can help recorrecting our typos.
    if (buttonText === "DEL") {
        displayed_input.textContent = displayed_input.textContent.slice(0, displayed_input.textContent.length - 1);
        counterDotButton = 0;
        countElements = 0;
        zeroWithDotPressed = false;
        return;
    }

    // İf the user inputs some string, we need to evaluate it in some way. We have in Javascript an option such as Function()
    // to evaluate the expression in a fast and safe manner. It is safe because it returns an anonymous function to us that we can call.
    // The userInput can be found in the body of that anonymous  function.
    if (buttonText === "=") {
        result.innerText = new Function("return " + displayed_input.innerText)();
        result.style.animation = "big 0.5s ease-in-out";
        displayed_input.style.animation = "small 0.5s ease-in-out";
        result.style.animationFillMode = "forwards";
        displayed_input.style.animationFillMode = "forwards";
    }
    else if (buttonText === "0") {
        if (countElements == 0) {
            displayed_input.textContent += "0."; // After pressing zero button first time
            zeroWithDotPressed = true;
        }
        else {
            displayed_input.textContent += buttonText;
        }
        countElements += 1;
    }
    else if (buttonText === ".") {
        if (countElements == 0) {
            // Dot button should not work when we press it first time, because it must only be followed by any input.
            displayed_input.textContent += "";
        }
        else {
            counterDotButton += 1;
            if (counterDotButton > 1) {
                displayed_input.textContent += "";
                countElements += 1;
            }
            else {
                if (zeroWithDotPressed === true) {
                    displayed_input.textContent += ""; // Pressing dot button after first pressing of zero button
                }
                else {
                    displayed_input.textContent += ".";
                }
            }
        }
    }
    else {
        displayed_input.textContent += buttonText;
        countElements += 1;
    }
    return;
}

