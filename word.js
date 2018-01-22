// require Letter constructor function out of which to assemble entire words!
const Letter = require("./letter.js").Letter;
// random word to get a bunch o rando words yo
const randomWord = require('random-word');
// constructor function to create a word out of letters
const Word = function() {
    // what's the word
    this.word = randomWord();
    // array to contain each letter of the word
    this.letters = [];
    this.wordDisplay = [];
};
Word.prototype.letterize = function() {
    for (let i = 0; i < this.word.length; i++) {
        let newLetter = new Letter(this.word[i]);
        this.letters.push(newLetter);
    }
};
Word.prototype.displayWord = function() {
    this.wordDisplay = [];
    for (let i = 0; i < this.letters.length; i++) {
        this.wordDisplay.push(this.letters[i].showThis);
    }
}
module.exports.Word = Word;