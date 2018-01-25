const fs = require("fs");
// require user.js
const User = require("./user.js");
// require word.js
const Word = require("./word.js");
// require inquirer.js
const inquirer = require("inquirer");
// mysteryWord
let mysteryWord = "";
let theUser;
let userObj = [];
function isAlphabetCharacter(letter) {
    return (letter.length === 1) && /[a-z]/i.test(letter);
};
function fillUpUserObj() {
    fs.readFile('users.json', function (err, data) {
        if (!err) {
            try {
                userObj = JSON.parse(data);
            } catch (e) {
                console.error(e);
            }
        }
    });
};
function retrieveUser(username) {
    for (let key = 0; key < userObj.length; key++) {
        let nameInObj = userObj[key].name;
        if (nameInObj === username) {
            return userObj[key];
        } 
    }
    return "no such user";
};
function initGame() {
    fillUpUserObj();
    theUser = new User("default");
    inquirer.prompt([
        {
            type: "confirm",
            name: "wantsToPlay",
            message: "Oh hi! Would you like to play some Hangman?",
            default: true,
        },
        {
            when: function(answers) {
                return answers.wantsToPlay;
            },
            type: "name",
            name: "userName",
            message: "What is your user name?"
        },
        {
            name: "user_exists",
            // checks to see if user already exists
            when: function(answers) {
                for (let key = 0; key < userObj.length; key++) {
                    let nameInObj = userObj[key].name;
                    let nameRequested = answers.userName;
                    if (nameInObj == nameRequested) {
                        return true;
                    } 
                }
                return false;
            },
            type: "list",
            message: function(answers) {
                return `would you to play as existing user: ${answers.userName}?`;
            },
            choices:["yes","no"]
        }
    ]).then(function(answers){
        theUser.name = answers.userName;
        if (answers.wantsToPlay) {
            // for if you are a user already and say yes
            if (answers.user_exists === "yes") {
                console.log("hello, existing user: " + answers.userName);
                let userRecord = retrieveUser(theUser.name);
                theUser.points = userRecord.points;
                theUser.lookups = userRecord.lookups;
                theUser.favoriteWords = userRecord.favoriteWords;
                theUser.storeUser();
                console.log(`here's your stats:`);
                console.log(`points: ${theUser.points}\nfavorite words: ${theUser.favoriteWords.join(", ")}`);
            // for if you are a user already and say no
            } else if (answers.user_exists === "no") {
                initGame();
                return;
            // for if neither choice is made (question not asked)
            } else {
                console.log("hello, new user " + answers.userName);
                theUser.storeUser();
            }
            playHangman();
        } else {
            console.log("Oh well, maybe some other time then");
        }
    });
};
function playHangman() {
    // get a new word using the word constructor (which in turn uses the letter constructor)
    mysteryWord = new Word();
    // reset user guesses 
    theUser.guesses = 17;
    // showTheQuestion asks for the current word state what letter do ya wanna pick
    showTheQuestion();
};
function startAgain() {
    inquirer.prompt([
        {
            name:"startAgain",
            message:"start over?",
            type: "confirm",
            default: true,
        }
    ]).then(function(answer){
        if(answer.startAgain) {
            playHangman();
        } else {
            console.log("k, bye");
            process.exit();
        }
    })
};
function storeWord() {
    inquirer.prompt([
        {
            name:"storeWord",
            type: "confirm",
            message:"do you want to save this on your profile with your favorite words?",
            default: false,
        }
    ]).then(function(answer){
        if(answer.storeWord) {
            theUser.favoriteWords.push(mysteryWord.word);
            theUser.storeUser();
        } else {
            console.log("alrighty");
        }
        startAgain();
    })
}
function showTheQuestion() {
    // update the word
    mysteryWord.updateWord();
    // allow a representation of the word to exist by means of dot join
    let seeTheWord = mysteryWord.wordDisplay.join(" ");
    console.log(seeTheWord);
    // check if whole word is guessed
    if (mysteryWord.isItTrue) {
        console.log("You got it!");
        theUser.guessRight(mysteryWord);
        theUser.storeUser();
        storeWord();
        return;
    };
    if (theUser.guesses > 0) {
        inviteGuess();
    } else if (theUser.guesses <= 0) {
        console.log("boohoo! guess you just haven't got what it takes to guess this one word :(");
        theUser.failToGuess(mysteryWord);
        console.log("here's the word you failed to guess: " + mysteryWord.word);
        theUser.storeUser();
        storeWord();
    };
};
function inviteGuess() {
    // inquirer wants you to pick a letter
    inquirer.prompt([
        {
            name: "user_guess",
            message: "Feel free to guess a letter"
        }
    ]).then(function(answer) {
        if (mysteryWord.lettersGuessed.includes(answer.user_guess)) {
            console.log("you've already guessed that letter!");
            showTheQuestion();
        } else if (isAlphabetCharacter(answer.user_guess)) {
            selectLetter(answer.user_guess);
            theUser.guesses--;
        } else {
            console.log(`looks like you are guessing at some kinda non-letter! try again`);
            showTheQuestion();
        }
    })
};
// function to process the selection of a letter
function selectLetter(letter) {
    mysteryWord.lettersGuessed.push(letter);
    let theWord = mysteryWord.word;
    let theLetters = mysteryWord.actualLetters;
    if (theWord.includes(letter)) {
        // loop through the letters in the word comparing them with the letter the user person guessed
        for (let i = 0; i < theLetters.length; i++) {
            if (theLetters[i].letter === letter) {
                console.log("yeah!")
                theLetters[i].guessCorrectly();
            }
        }
    } else {
        console.log("nope")
    }
    console.log("guesses remaining: " + theUser.guesses);
    showTheQuestion();
};
module.exports = {
    initGame: initGame,
};