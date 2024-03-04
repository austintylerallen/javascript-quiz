// GIVEN I am taking a code quiz
// WHEN I click the start button ()
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultsContainer = document.getElementById('results');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitScoreButton = document.getElementById('submit-score');

const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
        correctAnswer: 2
    }
]


let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to start the quiz
function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
    startTimer();
}

// Function to display a question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(index));
        choicesElement.appendChild(button);
    });
}

// Function to select an answer
function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    } else {
        timer -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    finalScoreElement.textContent = score;
}

// Function to start the timer
function startTimer() {
    let timeLeft = 60; 
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Function to handle submission of initials and high scores
function submitScore() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        const highScore = { initials: initials, score: score };
        console.log(highScore); 
    }
}

// Event listeners
startButton.addEventListener('click', startQuiz);
submitScoreButton.addEventListener('click', submitScore);