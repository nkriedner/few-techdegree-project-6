// SELECT ELEMENTS
const keyboard = document.getElementById("qwerty");
const phraseContainer = document.getElementById("phrase");
const startGameBtn = document.querySelector(".btn__reset");

// DEFINE VARIABLES
const phrases = ["Sesame", "Abrakadabra", "Simsalabim", "Hokuspokus", "I am happiness"];
let missed = 0;

// FUNCTIONS
function getRandomPhraseArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const randomPhaseSplit = randomPhrase.split("");
    return randomPhaseSplit;
}
function addPhraseToDisplay(arr) {
    const ul = phraseContainer.querySelector("#phrase ul");
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        const text = arr[i];
        li.textContent = text;
        // Add the 'letter' class if text is not space
        if (text !== " ") {
            li.className = "letter";
        }
        ul.appendChild(li);
    }
}
function checkLetter(clickedBtn) {
    let matchingLetter = null;
    // Get all elements with "letter" class
    const letterElements = document.querySelectorAll(".letter");
    // Loop over letters and check if they match clickedBtn
    for (let i = 0; i < letterElements.length; i++) {
        if (letterElements[i].textContent.toLowerCase() === clickedBtn) {
            letterElements[i].classList.add("show");
            matchingLetter = letterElements[i].textContent;
        }
    }
    return matchingLetter;
}
function checkWin() {
    let playerWins;
    // Get all elements with "letter" class
    const letterElements = document.querySelectorAll(".letter");
    let letterClassNumber = letterElements.length;
    let showClassNumber = 0;
    // Loop over letterElements and check if each has 'show' class
    for (let i = 0; i < letterElements.length; i++) {
        if (letterElements[i].classList.contains("show")) {
            showClassNumber++;
        }
    }
    // Check if number of letters with class "show" is equal to number of letters with class "letter"
    if (letterClassNumber == showClassNumber) {
        playerWins = true;
    } else {
        playerWins = false;
    }
    // Set overlay according to win or lose
    if (playerWins) {
        console.log("WIN!!!");
        // Show overlay screen with "win" class
        document.getElementById("overlay").style.display = "";
        document.getElementById("overlay").className = "win";
        document.querySelector("#overlay .title").textContent = "You won - AMAZING!!!";
    } else if (missed >= 5) {
        console.log("no win :(");
        // Show overlay screen with "win" class
        document.getElementById("overlay").style.display = "";
        document.getElementById("overlay").className = "lose";
        document.querySelector("#overlay .title").textContent = "You lost... :-(";
    } else {
        return;
    }
}

// EVENT HANDLERS
startGameBtn.addEventListener("click", () => {
    // Hide the start screen overlay
    document.getElementById("overlay").style.display = "none";
});
keyboard.addEventListener("click", (e) => {
    // Add 'chosen' class to button of letter and add 'disabled' attribute
    e.target.className = "chosen";
    e.target.setAttribute("disabled", true);
    // Pass button to checkLetter() function
    const letterFound = checkLetter(e.target.textContent);
    if (letterFound === null) {
        missed++;
        console.log("missed:", missed);
        // Change one liveHeart.png to lostHeart.png
        // Target the heart li's images
        const tries = document.querySelectorAll(".tries img");
        // Change liveHeart to lostHeart
        tries[missed - 1].src = "images/lostHeart.png";
    }
    checkWin();
});

// Initiate/Test game start ->
const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

// NEXT STEP -> Create checkWin() function
