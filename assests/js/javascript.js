var questions = [
    {
        question: "What is the main character's name?",
        answer: "Kevin",
        options: ["Steve", "Carl", "Santa", "Kevin"]
    },
    {
        question: "What pet does Buzz own?",
        answer: "Tarantula",
        options: ["Tarantula", "Snake", "Dog", "Cat"]
    },
    {
        question: "What does Kevin steal from the drug store?",
        answer: "Toothbrush",
        options: ["Candy", "Bandaid", "Toothbrush", "Baseball Cards"]
    },
];

var currentQuestionIndex = 0;

var score = 0;

var questionParent = document.querySelector("#questionList");
var timeLeft = 60;
var displayHighScores = function (event) {
    while (questionParent.lastChild) {
        questionParent.removeChild(questionParent.lastChild);
    }
    var highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "High Scores";
    questionParent.appendChild(highScoreTitle);
    var scoresLocalStorage = window.localStorage.getItem("highScore");
    if (scoresLocalStorage === null) {
        return;
    }
    scoresLocalStorage = JSON.parse(scoresLocalStorage);
    for(var i = 0; i < scoresLocalStorage.length; i++) {
        var scoreEl = document.createElement ("p");
        scoreEl.textContent = scoresLocalStorage[i].name + " " + scoresLocalStorage[i].score;
        questionParent.appendChild(scoreEl);
    }
}

var viewHighScores = document.querySelector ("#viewHighScores");
viewHighScores.addEventListener("click", displayHighScores)


// show correct and append in new div
var rightWrong = document.querySelector("#answerResult")

var clearRightWrong = function () {
    rightWrong.textContent = "";

}
var saveScore = function (event) {
   // save to local storage
   var highScores = window.localStorage.getItem ("highScore");
   if (highScores === null) {
       highScores = [];
   }
   else {
       highScores = JSON.parse(highScores);
   }
   var nameValue = document.querySelector("input").value;
   var newScore = {
       name: nameValue, score: score
   }
   highScores.push (newScore)

   window.localStorage.setItem ("highScore", JSON.stringify(highScores));

}
var displayEndGame = function() {
    while (questionParent.lastChild) {
        questionParent.removeChild(questionParent.lastChild);
    }
    var parentEndGame = document.createElement ("div");
    questionParent.appendChild(parentEndGame);
    var allDoneEl = document.createElement ("h2");
    allDoneEl.textContent = "All Done!";
    parentEndGame.appendChild (allDoneEl); 
    // create score element
    var scoreLableEl = document.createElement ("p");
    //scoreLableEl.textContent = "Your Score: ";
    scoreLableEl.innerHTML = "Your Score:  <span>" + score + "</span>"
    parentEndGame.appendChild(scoreLableEl);
    
    var enterInitialsEl = document.createElement ("input");
    enterInitialsEl.setAttribute ("type", "text") 
    enterInitialsEl.setAttribute ("placeHolder", "Enter Initials Here");
    parentEndGame.appendChild(enterInitialsEl);
    var saveButton = document.createElement ("button");
    parentEndGame.appendChild(saveButton);
    saveButton.textContent = "Save Score";
    saveButton.addEventListener ("click", saveScore);
}

var answerClicked = function (event) {
    if (event.target.tagName != "LI") {
        return;
    }
    if (event.target.textContent === questions[currentQuestionIndex].answer) {
        rightWrong.textContent = "Correct!";
        // adding 10 points to every correct answer
        score += 10;
        console.log(score);
        setTimeout(clearRightWrong, 1000);
        if (questions.length -1 === currentQuestionIndex) {
            displayEndGame();
            return;
        }
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
    }

    // if wrong deduct time by 5 seconds
    else {
        timeLeft = timeLeft -5;
        rightWrong.textContent = "Wrong!";
        setTimeout(clearRightWrong, 1000);
        if (questions.length -1 === currentQuestionIndex) {
            displayEndGame();
            return;
        }
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        
    }

}
var questionList = document.querySelector("#questionList");
questionList.addEventListener("click", answerClicked);

var displayQuestion = function (question) {
    
    // delete any children if they exist
    while (questionParent.lastChild) {
        questionParent.removeChild(questionParent.lastChild);
    }
    var questionText = document.createElement("div");
    questionText.className = "questionFont"
    questionText.textContent = question.question;
    questionParent.appendChild(questionText);

    var currentOptions = question.options;
    // add ordered list
    var orderedList = document.createElement ("ol");
    questionParent.appendChild(orderedList);
    for (var i = 0; i < currentOptions.length; i++) {
        var optionBox = document.createElement("li");
        optionBox.textContent = currentOptions[i];
        orderedList.appendChild(optionBox);
    }
}

var startButton = document.querySelector("#quizStart");

var updateTimer = function () {
    var timerStart = document.querySelector("#timer");
    timerStart.textContent = timeLeft;
    timeLeft--;
}

var startQuiz = function (event) {
    // make the start button go away after its been clicked
    startButton.className = "hidden";

var rules = document.querySelector("#rules");
    rules.className = "hidden";

    var interval = setInterval(updateTimer, 1000);

    // Display first question

    var currentQuestion = questions[0];
    displayQuestion(currentQuestion);
}
startButton.addEventListener("click", startQuiz);


