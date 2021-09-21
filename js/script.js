const ul = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playPromptButton = document.querySelector(".play-again-hide");

const word = "magnolia";
const guessedLetters = [];

//TODO: Add a New Global Variable for Player Guesses

const placeholder = function (word) {
  const placeholderLetters = [];

  for(const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
  }
    wordInProgress.letter = placeholderLetters.join("");
};

placeholder(word);

//TODO: Validate Input in the Button Event Handler
guessButton.addEventListener("click", function(e){
  e.preventDefault();
  message.innerText = "";
  textInput.value = "";
});

//Function to Check Player’s Input
const inputValidatiion = function(input) {
  const acceptedLetter = /[a-zA-Z]/;
  
  if(input.length === 0) {
    message.innerText = "Please enter a letter" 
  } else if(input.length > 1) {
    message.innerText = "Please add only 1 letter"
  } else if(!input.math(acceptedLetter)) {
    message.innerText = "Pleas enter a letter between A-Z"
  } else {
    return input;
  }
};

  



//Create a Function to Capture Input

