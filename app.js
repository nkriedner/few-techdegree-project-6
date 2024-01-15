// SELECT ELEMENTS
const keyboard = document.getElementById("qwerty");
const phraseContainer = document.getElementById("phrase");
const startGameBtn = document.querySelector(".btn__reset");

// DEFINE VARIABLES
const phrases = ["Sesame", "Abrakadabra", "Simsalabim", "Hokuspokus", "I am happiness"];
let missed = 0;

// EVENT HANDLERS
startGameBtn.addEventListener("click", () => {
    // Hide the start screen overlay
    document.getElementById("overlay").style.display = "none";
});
