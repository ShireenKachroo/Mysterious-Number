document.addEventListener('DOMContentLoaded', function() {

    let name;
    let greet = function() {
        do {
            name = prompt("Hey folk! Enter your name.");
            if (name === null) {
                // User clicked Cancel
                return; // Exit the function or handle it as required
            }
            if (name.trim() === "") {
                // User entered an empty string
                alert("You must enter a valid name.");
            }
        } while (name === null || name.trim() === ""); // Continue prompting if the name is invalid

        // Update the text content with the valid name
        document.getElementById("greet").innerText = `Greetings, ${name}!!\n\nYou've just stepped into a realm where numbers hold secrets and every guess could be a revelation. \nHope you have read the game instructions with care: they hold the key to your success.\n`;
    };
    greet();

    // Generate a random number b/w 1 to 100
    let randomNum = Math.floor((Math.random() * 100) + 1);

    // Record player's turn, start at 1
    let turnNumber = 1;

    // Take input from player
    const playerInput = document.getElementById("guess");

    // Function to calculate how far the guess was
    const guessDifference = function(inputVal, randomNum) {
        const difference = Math.abs(inputVal - randomNum);
        return difference;
    };

    // Function to disable text-box and submit button
    const disableBoxes = () => {
        let buttonDisable = document.getElementById("submit");
        let textDisabled = document.getElementById("guess");
        buttonDisable.disabled = true;
        textDisabled.disabled = true;
    };

    // Function to reset the game ---> re-enable button and text-box and reset game state
    const resetGame = () => {
        randomNum = Math.floor((Math.random() * 100) + 1); // Generate new random number
        turnNumber = 1; // Reset turn number
        let buttonDisable = document.getElementById("submit");
        let textDisabled = document.getElementById("guess");
        buttonDisable.disabled = false;
        textDisabled.disabled = false;
        document.getElementById("guess").value = ""; // Clear input box
        document.getElementById("ans").innerText = ''; // Clear the answer message
        document.getElementById("records").getElementsByTagName('tbody')[0].innerHTML = ''; // Clear previous guesses
    };

    // Record the previous guesses
    let recordPrevGuesses = function(currGuess, turnNumber) {
        let table = document.getElementById("records").getElementsByTagName('tbody')[0];
        let newRow = table.insertRow();
        let newCell = newRow.insertCell(0);
        newCell.textContent = turnNumber;
        let newCell2 = newRow.insertCell(1);
        newCell2.textContent = currGuess;
    };

    // Function to check for correct guess
    let playGame = function() {
        const inputVal = parseInt(playerInput.value);
        if (isNaN(inputVal)) {
            document.getElementById("ans").innerText = "Please enter a valid number.";
            return;
        }
        // If correct --> congratulations + disable button + restart option
        if (inputVal === randomNum) {
            //document.getElementById("ans").innerText = "Congratulations! You won the challenge.";
			alert(`Yippee! Congratulations ${name}, you successfully guessed the number`)
            disableBoxes();
            document.getElementById("reset-game").classList.add("reset");
        } else {
            // If wrong and turns left ---> tell how far guess was + put other guess + increment turn
            if (guessDifference(inputVal, randomNum) <= 10) {
                document.getElementById("ans").innerText = "Clue: The guess is close";
            }
			else if (guessDifference(inputVal, randomNum) <= 20) {
                document.getElementById("ans").innerText = "Clue: The guess is very close";
            } else {
                document.getElementById("ans").innerText = "Clue: The number guessed by you is too far";
            }
            recordPrevGuesses(playerInput.value, turnNumber);
            turnNumber++;
        }

        // If wrong and no turns left --> game over + disable submit button + restart game
        if (turnNumber > 10) {
			alert(`${name},you lost the challenge and the number still remains undiscovered!`)
            document.getElementById("ans").innerText = "...Turns Exceeded...";
            disableBoxes();
            document.getElementById("reset-game").classList.add("reset");
        }
    };

    // Check if elements exist before adding event listeners
    const submitButton = document.getElementById("submit");
    const resetButton = document.getElementById("reset-game");

    if (submitButton && resetButton) {
        submitButton.addEventListener("click", playGame);
        resetButton.addEventListener("click", resetGame);
    } else {
        console.error("Submit or Reset button not found.");
    }
});
