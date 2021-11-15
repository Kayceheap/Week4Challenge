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


var timeLeft = 60;


// show correct and append in new div
var rightWrong = document.querySelector("#answerResult")

var clearRightWrong = function () {
    rightWrong.textContent = "";
}
var answerClicked = function (event) {
    if (event.target.textContent === questions[currentQuestionIndex].answer) {
        rightWrong.textContent = "Correct!";
        setTimeout(clearRightWrong, 1000);
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
    }

    // if wrong deduct time by 5 seconds
    else {
        timeLeft = timeLeft -5;
        rightWrong.textContent = "Wrong!";
        setTimeout(clearRightWrong, 1000);
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        
    }

}
var questionList = document.querySelector("#questionList");
questionList.addEventListener("click", answerClicked);

var displayQuestion = function (question) {
    var questionParent = document.querySelector("#questionList");
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


