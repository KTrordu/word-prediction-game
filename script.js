const answerWord = ["u", "n", "i", "t", "y"];

const submitBtn = document.getElementById("submit-button");
const resetBtn = document.getElementById("reset-button");
const inputValue = document.getElementById("prediction-input");
const scoreElement = document.getElementById("score");

let lives = 3;
let score = 0;
let predictedWords = [];

submitBtn.addEventListener("click", predict);
resetBtn.addEventListener("click", resetGame);
inputValue.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitBtn.click();
    }
});


function predict() {
    if(!isPredictionValid()) {
        return;
    }

    let result = compareInput();
    renderLetters();
    updateScoreAndLives(result);
    renderScoreAndLives();

    if(isGameFinished() == 0) {
        winGame();
    } else if(isGameFinished() == 1) {
        loseGame();
    }
}

function isPredictionValid() {
    let input = inputValue.value.toLowerCase().trim();

    if(isGameFinished() == 0) {
        alert("You have already won the game.");
        return false;
    }
    else if (input.length == 0 || input == null) {
        alert("Please enter a prediction.");
        return false;
    } else if(!isLettersOnly(input)) {
        alert("Please enter a letter or a word.");
        return false;
    } else if(!(input.length == 1 || input.length == 5)) {
        alert("Please enter a one-letter or one word (five letters) prediction.");
        return false;
    } else if(predictedWords.includes(input)) {
        alert("You have already predicted this letter.");
        return false;
    }
    else {
        return true;
    }
}

function isLettersOnly(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function compareInput() {
    const prediction = inputValue.value.toLowerCase().trim();

    if (prediction.length == 1) {
        for (let i = 0; i < answerWord.length; i++) {
            if (prediction == answerWord[i]) {
                predictedWords.push(answerWord[i]);
                return 0;
            }
        }
        return 2;
    } else {
        if (prediction == answerWord.join("")) {
            predictedWords = answerWord;
            return 1;
        } else return 3;
    }
}

function updateScoreAndLives(result) {
    if (result == 0) {
        score += 20;
    } else if (result == 1) {
        score = 100;
    } else if (result == 2) {
        lives -= 1;
    } else if (result == 3) {
        lives = 0;
    }
}

function renderScoreAndLives() {
    scoreElement.innerHTML = `Score : ${score}`;

    for (let i = 3; i > lives; i--) {
        document.getElementById(`life-${i}`).style.visibility = "hidden";
    }

    if (lives === 3) {
        for (let i = 3; i > 0; i--) {
            document.getElementById(`life-${i}`).style.visibility = "visible";
        }
    }
}

function renderLetters() {
    for (let i = 0; i < answerWord.length; i++) {
        let letterContainer = document.getElementById(`${answerWord[i]}-card`);
        let letter = document.getElementById(`${answerWord[i]}`);

        if (predictedWords.includes(answerWord[i])) {
            letterContainer.style.backgroundColor = "wheat";
            letterContainer.style.border = "none";

            letter.style.visibility = "visible";
        } else {
            letterContainer.style.backgroundColor = "darkgreen";
            letterContainer.style.border = "0.15vw solid black";

            letter.style.visibility = "hidden";
        }
    }
}

function isGameFinished() {
    if (score == 100) {
        return 0;
    } else if (lives == 0) {
        return 1;
    } else {
        return;
    }
}

function winGame() {
    alert("You won the game!");
}

function loseGame() {
    alert("You lost the game!");
}

function resetGame() {
    score = 0;
    lives = 3;
    predictedWords = [];

    inputValue.value = "";
    renderScoreAndLives();
    renderLetters(); 
}