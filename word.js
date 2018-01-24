// require Letter constructor function out of which to assemble entire words!
const Letter = require("./letter.js");
// random word to get a bunch o rando words yo
const randomWord = require('random-word');
// constructor function to create a word out of letters
const Word = function() {
    // what's the word?
    this.word = randomWord();
    // array to contain each letter of the word
    this.actualLetters = this.letterize();
    this.wordDisplay = this.displayWord();
    this.isItTrue = this.check();
};
Word.prototype.letterize = function() {
    let arr = [];
    for (let i = 0; i < this.word.length; i++) {
        let newLetter = new Letter(this.word[i]);
        arr.push(newLetter);
    }
    return arr;
};
Word.prototype.displayWord = function() {
    let arr = [];
    for (let i = 0; i < this.actualLetters.length; i++) {
        arr.push(this.actualLetters[i].showThis);
    }
    return arr;
};
Word.prototype.check = function() {
    let guessedWord = this.wordDisplay.join("");
    let actualWord = this.word;
    if (guessedWord === actualWord) {
        console.log("Great going!")
        return true;
    } else {
        return false;
    }
};
Word.prototype.updateWord = function() {
    this.wordDisplay = this.displayWord();
    this.isItTrue = this.check();
}
module.exports = Word;