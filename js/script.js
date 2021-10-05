const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//expanded version
const getWord = async () => {
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
const placeholder = (word) => {
  const placeholderLetters = [];
  for(const letter of word) {
      placeholderLetters.push("●");
  }
    wordInProgress.innerText = placeholderLetters.join("");
};

//guess button
guessButton.addEventListener("click",(e) => {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//check Player’s Input
const validateInput = (input) => {
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

//capture Input
const makeGuess = (guess) => {
  guess = guess.toUpperCase();
  if(guessedLetters.includes(guess)) {
    message.innerText = "Oops, guess another letter!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updatedLetters();
    guessTracker(guess);
    updateWordInProgress(guessedLetters);
  }
};


//Show guessed letters
 const updatedLetters = () => {
   guessedLettersElement.innerHTML = "";
   for (const letter of guessedLetters) {
     const li = document.createElement("li");
     li.innerText = letter;
     guessedLettersElement.append(li);
   }
 };

//Update word in progress
const updateWordInProgress = (guessedLetters) => {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if(guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

// Guesses remaining
const guessTracker = (guess) => {
  const upperWord = word.toUpperCase();
  if(!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}!`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if(remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if(remainingGuesses === 1) {
    guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};
  
//Check if player won
const checkIfWin = () => {
 if(wordInProgress.innerText === word.toUpperCase()) {
   message.classList.add("win");
   message.innerHTML = `<p class="highlight">You guessed the correct the word! Congrats!</p>`;
   startOver();
  }   
};

//TODO: Restart game
const startOver = () => {
  guessButton.classList.add("hide");
  guessesRemaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};


//TODO: Play again button
playAgainButton.addEventListener("click", (e) => {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = [];
    remainingGuesses = [];
    guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
  
    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

    getWord();
});




