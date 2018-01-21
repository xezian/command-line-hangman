// constructor function to hold not just a letter, but a fascinating and complex object comprised of multiple properties and methods.
const Letter = function(letter) {
    this.letter = letter;
    this.isGuessed = false;
    this.showThis = "_";
};
// this is where we add the methods to the prototype on the constructor function
Letter.prototype.guessThis = function() {
    this.isGuessed = true;
    this.showThis = this.letter;
};
// now export the constructor so it can be used elsewhere
module.exports.Letter = Letter;