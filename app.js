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
    console.log(arr);
}
function checkLetter(clickedBtn) {
    let matchingLetter = null;
    // Get all elements with "letter" class
    const letterElements = document.querySelectorAll(".letter");
    console.log(letterElements);
    // Loop over letters and check if they match clickedBtn
    for (let i = 0; i < letterElements.length; i++) {
        console.log(letterElements[i].textContent);
        if (letterElements[i].textContent.toLowerCase() === clickedBtn) {
            letterElements[i].classList.add("show");
            matchingLetter = letterElements[i].textContent;
        }
    }
    return matchingLetter;
}

// EVENT HANDLERS
startGameBtn.addEventListener("click", () => {
    // Hide the start screen overlay
    document.getElementById("overlay").style.display = "none";
});

// Initiate/Test game start ->
const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

// NEXT STEP -> ADD EVENT LISTENER TO KEYBOARD
