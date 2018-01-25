const fs = require("fs");
const Word = require("./word.js");
let User = function(username) {
    this.name = username;
    this.guesses = 17;
    this.points = 0;
    this.lookups = 5;
    this.favoriteWords = [];
};
// guessRight points system
User.prototype.guessRight = function(word) {
    let newPoints = this.guesses + word.word.length;
    this.points = this.points + newPoints;
};
// don't guess in time points system
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
    let myObj = this;
    // checks if the file exists
    if (fs.existsSync("users.json")) {
        fs.readFile('users.json', function (err, data) {
            let json = [];
            if (!err) {
                try {
                    json = JSON.parse(data);
                } catch (e) {
                    console.error(e);
                }
            }
            // if we have the same name as a name in the databse we delete it in favor of pushing  up the new info
            for (let key = 0; key < json.length; key++){
                let myName = myObj.name;
                let names = json[key].name;
                if (myName === names) {
                    json.splice([key], 1);
                }
            }
            // push it up now
            json.push(myObj);
            fs.writeFile("users.json", JSON.stringify(json, null, 2), function(err){
                if (err) throw err;
            });
        });
    // if the file does not exist, we will create it
    } else {
        let json = [];
        json.push(myObj);
        fs.writeFile("users.json", JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
        });
    }
};
module.exports = User;