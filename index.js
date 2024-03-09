// Selecting DOM elements
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const resultsContainer = document.getElementById('results');
const finalScoreSpan = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submit-score');
const quizContainer = document.getElementById('quiz');

// Quiz questions
const quizQuestions = [
    {
        question: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language'],
        correctAnswer: 'Hyper Text Markup Language'
    },
    {
        question: 'Javascript is a _______ language?',
        choices: ['Programming', 'Networking', 'None of These'],
        correctAnswer: 'Programming'
    },
    {
        question: 'What is the DOM?',
        choices: ['Document Object Model', 'Dissolved Organic Matter', 'Days On Market', 'Disk Operating Machine'],
        correctAnswer: 'Document Object Model'
    }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    startBtn.style.display = 'none';
    resultsContainer.style.display = 'none';
    displayQuestion();
    startTimer();
}

// Function to display a question
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.textContent = choice;
        choiceBtn.setAttribute('data-index', index);
        choiceBtn.addEventListener('click', checkAnswer);
        choicesContainer.appendChild(choiceBtn);
    });
}

// Function to check the selected answer
function checkAnswer(event) {
    const selectedChoiceIndex = parseInt(event.target.getAttribute('data-index'));
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (currentQuestion.choices[selectedChoiceIndex] === currentQuestion.correctAnswer) {
        score++;
    } else {
        timeLeft -= 10; // Subtract time if the answer is incorrect
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.textContent = '';
    choicesContainer.innerHTML = '';
    resultsContainer.style.display = 'block';
    finalScoreSpan.textContent = score;
}

// Function to submit the score
function submitScore() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        // Save score and initials to local storage
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ initials, score });
        localStorage.setItem('highScores', JSON.stringify(highScores));

        // Display high scores on the page
        displayHighScores(highScores);
    } else {
        alert('Please enter your initials.');
    }
}

// Function to display high scores
function displayHighScores(highScores) {
    resultsContainer.innerHTML = ''; // Clear previous scores

    // Display each high score
    highScores.forEach((entry, index) => {
        const scoreEntry = document.createElement('div');
        scoreEntry.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
        resultsContainer.appendChild(scoreEntry);
    });
}

// Event listener for the start button
startBtn.addEventListener('click', startQuiz);

// Event listener for submitting score
submitScoreBtn.addEventListener('click', submitScore);
