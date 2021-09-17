const ul = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".guess");
const playPromptButton = document.querySelector(".play-again-hide");

const word = "magnolia";

const placeholder = function (word) {
  const placeholderLetters = [];

  for(const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
  }
    wordInProgress.letter = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
  e.preventDefault();
  const guess = textInput.value;
  console.log(guess);
  guess.value = "";
});

