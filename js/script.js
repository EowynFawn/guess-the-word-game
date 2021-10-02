const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playPromptButton = document.querySelector(".play-again-hide");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//expanded version
const getWord = async function() {
  const res = await fetch (`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length)
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//Fire off the game
getWord();

//Placeholders
const placeholder = function (word) {
  const placeholderLetters = [];
  for(const letter of word) {
      placeholderLetters.push("●");
  }
    wordInProgress.textContent = placeholderLetters.join("");
};

//guess button
guessButton.addEventListener("click", function(e){
  e.preventDefault();
  message.textContent = "";
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//check Player’s Input
const validateInput = function(input) {
  const acceptedLetters = /[a-zA-Z]/;
  
  if(input.length === 0) {
    message.textContent = "Please enter a letter";
  } else if(input.length > 1) {
    message.textContent = "Please add only 1 letter";
  } else if(!input.match(acceptedLetters)) {
    message.textContent = "Pleas enter a letter between A-Z";
  } else {
    return input;
  }
};

//capture Input
const makeGuess = function(guess) {
  guess = guess.toUpperCase();
  if(guessedLetters.includes(guess)) {
    message.textContent = "Oops, guess another letter!";
  } else {
    guessedLetters.push(guess);
    updatedLetters();
    guessTracker(guess);
    updateWordInProgress(guessedLetters);
  }
};


//Show guessed letters
 const updatedLetters = function() {
   guessedLettersElement.textContent = "";
   for (const letter of guessedLetters) {
     const li = document.createElement("li");
     li.textContent = letter;
     guessedLettersElement.append(li);
   }
 };

//Update word in progress
const updateWordInProgress = function() {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if(guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
    wordInProgress.textContent = revealWord.join("");
  }
  checkIfWin();
};

// Guesses remaining
const guessTracker = function(guess) {
  const upperWord = word.toUpperCase();
  if(!upperWord.includes(guess)) {
    message.textContent = `Sorry, the word has no ${guess}!`;
    remainingGuesses -= 1;
  } else {
    message.textContent = `Good guess! The word has the letter ${guess}.`;
  }

  if(remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if(remainingGuesses === 1) {
    guessesRemainingSpan.textContent = `${remainingGuesses} guess!`;
  } else {
    guessesRemainingSpan.textContent = `${remainingGuesses} guesses to go!`;
  }
};
  
//Check if player won
const checkIfWin = function() {
 if(wordInProgress.textContent === word.toUpperCase()) {
   message.classList.add("win");
   message.innerHTML = `<p class="highlight">You guessed the correct the word! Congrats!</p>`;
   }
};



