// require word.js
const Word = require("./word.js").Word;
// require inquirer.js
const inquirer = require("inquirer");
// get a new word using the word constructor (which in turn uses the letter constructor)
let mysteryWord = new Word();
mysteryWord.letterize();
mysteryWord.displayWord();
let seeTheWord = mysteryWord.wordDisplay.join(" ");
console.log(seeTheWord);
mysteryWord.letters[1].guessThis();
mysteryWord.displayWord();
seeTheWord = mysteryWord.wordDisplay.join(" ");
console.log(seeTheWord);
