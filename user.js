const User = function(username, password) {
    this.name = username;
    this.password = password;
    this.guesses = 10;
    this.points = 0;
    this.lookups = 5;
};
User.prototype.guessRight = (word) => {
    let newPoints = this.guesses + word.word.length;
    this.points = this.points + newPoints;
};
User.prototype.failToGuess = (word) => {
    let lettersUnguessed = 0;
    for (let i = 0; i < word.wordDisplay.length; i++) {
        if (word.wordDisplay[i] === "_") {
            lettersUnguessed++;
        };
    };
    this.points = this.points - lettersUnguessed;
};
module.exports.User = User;