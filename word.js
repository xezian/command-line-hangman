// require Letter constructor function out of which to assemble entire words!
const Letter = require("./letter.js").Letter;
// random word to get a bunch o rando words yo
const randomWord = require('random-word');
// constructor function to create a word out of letters
const Word = function() {
    // what's the word
    this.word = randomWord();
    // array to contain each letter of the word
    this.actualLetters = [];
    this.wordDisplay = [];
};
Word.prototype.letterize = function() {
    for (let i = 0; i < this.word.length; i++) {
        let newLetter = new Letter(this.word[i]);
        this.actualLetters.push(newLetter);
    }
};
Word.prototype.displayWord = function() {
    this.wordDisplay = [];
    for (let i = 0; i < this.actualLetters.length; i++) {
        this.wordDisplay.push(this.actualLetters[i].showThis);
    }
}
Word.prototype.check = function() {
    guessedWord = this.wordDisplay.join("");
    actualWord = this.word;
    if (guessedWord === actualWord) {
        console.log("Great going!")
        return true;
    }
};
module.exports.Word = Word;