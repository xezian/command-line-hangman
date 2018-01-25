// require Letter constructor function out of which to assemble entire words!
const Letter = require("./letter.js");
// random word to get a bunch o rando words yo
const randomWord = require('random-word');
// constructor function to create a word out of letters
const Word = function(word) {
    // if no word argument is provided, get random word from random-word npm api (very simple, no key needed)
    if (!word) {
        word = randomWord();
    }
    // what's the word?
    this.word = word;
    // every letter our user guessed for every new word
    this.lettersGuessed = [];
    // these 3 are set based on functions baked into the Object.prototype
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
// this function resets the displayed word
Word.prototype.updateWord = function() {
    this.wordDisplay = this.displayWord();
    this.isItTrue = this.check();
}
module.exports = Word;