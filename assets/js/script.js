// Quiz Game
const choicesElement = document.querySelector("#choices");
const correctIncorrectText = document.querySelector("#correct-incorrect");
const countdownElement = document.querySelector("#time");
const finishElement = document.querySelector("#finish");
const introductionElement = document.querySelector("#introduction");
const questionElement = document.querySelector("#question");
const quizElement = document.querySelector("#quiz");
const finalScoreElement = document.querySelector("#final-score");
const startQuizButtonElement = document.querySelector("#start-quiz");
const clearScoresButtonElement = document.querySelector("#clear-scores");
const initialsElement = document.querySelector("#initials");
const formElement = document.querySelector("#form");
const restartQuizButtonElement = document.querySelector("#restart-quiz");
const highScoresElement = document.querySelector("#high-scores");
const vhScoresLinkElement = document.querySelector("#vh-scores");

let currentQuestionIndex = 0;
let timeRemaining = 75;
let scoresArray = [];

// Array of questions
const questionsArray = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with ______.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: "curly brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store what ______.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ______ what when being assigned to variables?",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing consent to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
];

// Event Listeners

vhScoresLinkElement.addEventListener("click", function () {
  introductionElement.classList.add("hidden");
  highScoresElement.classList.remove("hidden");
  quizElement.classList.add("hidden");
  finishElement.classList.add("hidden");
});
clearScoresButtonElement.addEventListener("click", function () {
  localStorage.removeItem("finalScore");
  location.reload();
});

startQuizButtonElement.addEventListener("click", function () {
  introductionElement.classList.add("hidden");
  quizElement.classList.remove("hidden");
  startTimer();
  renderQuestion();
});

function startTimer() {
  countdownElement.textContent = timeRemaining;
  const timeInterval = setInterval(function () {
    timeRemaining--;
    countdownElement.textContent = timeRemaining;
    if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(function (choice) {
    const choicesButton = document.createElement("button");
    choicesButton.textContent = choice;
    choicesElement.appendChild(choicesButton);
    choicesButton.addEventListener("click", nextQuestion);
  });
}

function nextQuestion() {
  if (this.innerHTML === questionsArray[currentQuestionIndex].correct) {
    correctIncorrectText.innerHTML = "Correct!";
    timeRemaining += 10;
  } else {
    correctIncorrectText.innerHTML = "Incorrect!";
    timeRemaining -= 10;
  }
  currentQuestionIndex++;
  if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
    endQuiz();
  } else {
    renderQuestion();
  }

  // Set a timeout to clear the correct/incorrect text after 1 second
  setTimeout(function () {
    correctIncorrectText.innerHTML = "";
  }, 1000);
}

function endQuiz() {
  quizElement.classList.add("hidden");
  finishElement.classList.remove("hidden");
  finalScoreElement.innerHTML = timeRemaining;
}

function makeLi(text) {
  const li = document.createElement("li");
  li.textContent = text;
  highScoresElement.appendChild(li);
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the user's initials from the input element
  const initials = initialsElement.value.trim().toUpperCase();

  // Check that the initials are between 1 to 3 letters long
  if (initials.length > 3) {
    alert("Please enter upto three letters for your initials.");
    return;
  }

  // Create a new entry for the scores array with the initials and score
  const entry = initials + " " + timeRemaining;
  scoresArray.push(entry);

  // Save the updated scores array to localStorage
  localStorage.setItem("finalScore", JSON.stringify(scoresArray));

  // Display the new entry in the high scores list
  makeLi(entry);

  // Hide the finish element and show the final score element
  finishElement.classList.add("hidden");
  finalScoreElement.classList.remove("hidden");
  // display high scores after initials are entered
  highScoresElement.classList.remove("hidden");
});

clearScoresButtonElement.addEventListener("click", function () {
  localStorage.clear();
  while (highScoresElement.firstChild) {
    highScoresElement.removeChild(highScoresElement.firstChild);
  }
});

restartQuizButtonElement.addEventListener("click", function () {
  introductionElement.classList.remove("hidden");
  highScoresElement.classList.add("hidden");
  finishElement.classList.add("hidden");
  finalScoreElement.classList.add("hidden");
  currentQuestionIndex = 0;
  timeRemaining = 75;
});
