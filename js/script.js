const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
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
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);
  if(goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//Function to Check Player’s Input
const validateInput = function(input) {
  const acceptedLetters = /[a-zA-Z]/;
  
  if(input.length === 0) {
    message.innerText = "Please enter a letter";
  } else if(input.length > 1) {
    message.innerText = "Please add only 1 letter";
  } else if(!input.match(acceptedLetters)) {
    message.innerText = "Pleas enter a letter between A-Z";
  } else {
    return input;
  }
};

//Function to Capture Input

const makeGuess = function(guess) {
  guess = guess.toUpperCase();
  if(guessedLetters.includes(guess)) {
    message.innerText = "Oops, guess another letter!";
  } else {
    guessedLetters.push(guess);
    updatedLetters();
    console.log(guessedLetters);
  }
};


//TODO: Function to show guessed letters
const updatedLetters = function() {
  guessedLettersElement.innerText = "";

  for(const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
}

//TODO: Function to update word in progress

//TODO: Function to check if player won

//
