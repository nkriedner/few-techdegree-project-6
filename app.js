// SELECT ELEMENTS
const keyboard = document.getElementById("qwerty");
const phraseContainer = document.getElementById("phrase");
const phraseList = phraseContainer.querySelector("#phrase ul");
const startGameBtn = document.querySelector(".btn__reset");

// DEFINE VARIABLES
const phrases = ["Good morning", "Good evening", "This moment loves you", "Follow your bliss", "Relax and just be"];
let phraseArray = [];
let missed = 0;

// FUNCTIONS
function getRandomPhraseArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const randomPhraseSplit = randomPhrase.split("");
    return randomPhraseSplit;
}
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        const text = arr[i];
        li.textContent = text;
        // Add the 'letter' class if text is not space
        if (text !== " ") {
            li.className = "letter";
        }
        phraseList.appendChild(li);
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
        // Show overlay screen with "win" class
        document.getElementById("overlay").style.display = "";
        document.getElementById("overlay").className = "win";
        document.querySelector("#overlay .title").textContent = "You won - AMAZING!!!";
        startGameBtn.textContent = "Restart Game";
    } else if (missed >= 5) {
        // Show overlay screen with "lose" class
        document.getElementById("overlay").style.display = "";
        document.getElementById("overlay").className = "lose";
        document.querySelector("#overlay .title").textContent = "You lost... :-(";
        startGameBtn.textContent = "Restart Game";
    } else {
        return;
    }
}

// EVENT HANDLERS
startGameBtn.addEventListener("click", () => {
    // Reset phrase list
    phraseList.innerHTML = "";
    // Reset hearts
    const tries = document.querySelectorAll(".tries img");
    for (let i = 0; i < tries.length; i++) {
        tries[i].src = "images/liveHeart.png";
    }
    // Reset keyboard
    const keyboardBtns = keyboard.querySelectorAll("button");
    for (let i = 0; i < keyboardBtns.length; i++) {
        keyboardBtns[i].classList.remove("chosen");
        keyboardBtns[i].removeAttribute("disabled");
    }
    // Get random phrase
    phraseArray = getRandomPhraseArray(phrases);
    missed = 0;
    addPhraseToDisplay(phraseArray);
    // Hide the start screen overlay
    document.getElementById("overlay").style.display = "none";
});
keyboard.addEventListener("click", (e) => {
    // Check if clicked element is button (only then continue)
    if (e.target.tagName === "BUTTON") {
        // Add 'chosen' class to button of letter and add 'disabled' attribute
        e.target.className = "chosen";
        e.target.setAttribute("disabled", true);
        // Pass button to checkLetter() function
        const letterFound = checkLetter(e.target.textContent);
        if (letterFound === null) {
            missed++;
            // Target the heart li's images
            const tries = document.querySelectorAll(".tries img");
            // Change liveHeart to lostHeart
            tries[missed - 1].src = "images/lostHeart.png";
        }
        checkWin();
    }
});

// Choose random phrase on page load
phraseArray = getRandomPhraseArray(phrases);
