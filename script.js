document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  const queueDisplay = document.getElementById("queue-display");
  const buttons = document.querySelectorAll(".num-op button");
  const lightButton = document.getElementById("light");
  const darkButton = document.getElementById("dark");
  const body = document.body;

  let queue = [];
  let currentNumber = "";

  function updateDisplay() {
    output.textContent = currentNumber || "0";
    queueDisplay.textContent = queue.join(" ");

    output.classList.add("animate");
    queueDisplay.classList.add("animate");
    setTimeout(() => {
      output.classList.remove("animate");
      queueDisplay.classList.remove("animate");
    }, 300);
  }

  function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if ("0123456789.".includes(buttonValue)) {
      currentNumber += buttonValue;
    } else if ("+-*/".includes(buttonValue)) {
      if (currentNumber) {
        queue.push(parseFloat(currentNumber));
        queue.push(buttonValue);
        currentNumber = "";
      }
    } else if (buttonValue === "=") {
      if (currentNumber) {
        queue.push(parseFloat(currentNumber));
        currentNumber = computeQueue(queue).toString();
        queue = [];
      }
    } else if (buttonValue === "AC") {
      clearAll();
    }

    updateDisplay();
  }

  function computeQueue(queue) {
    let result = queue[0];

    for (let i = 1; i < queue.length; i += 2) {
      const operator = queue[i];
      const num = queue[i + 1];

      switch (operator) {
        case "+":
          result += num;
          break;
        case "-":
          result -= num;
          break;
        case "*":
          result *= num;
          break;
        case "/":
          result /= num;
          break;
      }
    }

    return result;
  }

  function clearAll() {
    queue = [];
    currentNumber = "";
  }

  // Toggle between light mode and dark mode
  function toggleLightMode() {
    body.classList.remove("dark-mode");
  }

  function toggleDarkMode() {
    body.classList.add("dark-mode");
  }

  // Add click event listeners to buttons
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // Add event listeners to toggle modes
  lightButton.addEventListener("click", toggleLightMode);
  darkButton.addEventListener("click", toggleDarkMode);
});
