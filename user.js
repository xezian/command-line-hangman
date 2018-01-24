const fs = require("fs");
const Word = require("./word.js");
let User = function(username) {
    this.name = username;
    this.guesses = 10;
    this.points = 0;
    this.lookups = 5;
};
User.prototype.guessRight = function(word) {
    let newPoints = this.guesses + word.word.length;
    this.points = this.points + newPoints;
};
User.prototype.failToGuess = function(word) {
    let lettersUnguessed = 0;
    for (let i = 0; i < word.wordDisplay.length; i++) {
        if (word.wordDisplay[i] === "_") {
            lettersUnguessed++;
        };
    };
    this.points = this.points - lettersUnguessed;
};
User.prototype.storeUser = function() {
    fs.appendFile("users.json", JSON.stringify(this, null, 2), function(err){
        if (err) throw err;
        console.log(`Your "object" was successfully appended!`);
    });
};

module.exports = User;