// require user.js
const User = require("./user.js");
// require word.js
const Word = require("./word.js");
// require inquirer.js
const inquirer = require("inquirer");
// mysteryWord
let mysteryWord = "";
let theUser;
// let the inquiries begin:
initGame();
function initGame() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "wantsToPlay",
            message: "Oh hi! Would you like to play some Hangman?",
            default: true
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
            when: function(answers) {
                let uName = answers.userName;
                
                return 
            }
        } 
    ]).then(function(answers){
        if (answers.wantsToPlay) {
            let userName = answers.userName;
            theUser = new User(userName);
            console.log(theUser);
            playHangman();
        } else {
            console.log("Oh well, maybe some other time then");
        }
    });
};
function playHangman() {
    // get a new word using the word constructor (which in turn uses the letter constructor)
    mysteryWord = new Word();
    // showTheQuestion asks for the current word state what letter do ya wanna pick
    showTheQuestion();
};
function showTheQuestion() {
    // update the word
    mysteryWord.updateWord();
    // allow a representation of the word to exist by means of dot join
    let seeTheWord = mysteryWord.wordDisplay.join(" ");
    console.log(seeTheWord);
    if (mysteryWord.isItTrue) {
        console.log("You got it!")
        initGame();
        return;
    };

    // TODO check for remaining number of guesses

    // inquirer wants you to pick a letter
    inquirer.prompt([
        {
            name: "user_guess",
            message: "Feel free to guess a letter"
        }
    ]).then(function(answer) {
        selectLetter(answer.user_guess);
    })
};
// function to process the selection of a letter
function selectLetter(letter) {
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
    showTheQuestion();

    // TODO decrease guesses

};

