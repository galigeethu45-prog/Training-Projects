const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
        question: "who is the Writer of One Piece?",
        answers: [
            { text: "Eiichiro Oda", correct: true },
            { text: "Masashi Kishimoto", correct: false },
            { text: "Tite Kubo", correct: false },
            { text: "Hajime Isayama", correct: false }
        ],
    },
    {
        question: "What is the name of the main character in One Piece?",
        answers: [
            { text: "Roronoa Zoro", correct: false },
            { text: "Shanks", correct: false },
            { text: "Monkey D. Luffy", correct: true },
            { text: "Sanji", correct: false }
        ],

    },
    {
        question: "What is the name of the pirate crew that Monkey D. Luffy belongs to?",
        answers: [
            { text: "Blackbeard Pirates", correct: false },
            { text: "Straw Hat Pirates", correct: true },
            { text: "Whitebeard Pirates", correct: false },
            { text: "Red Hair Pirates", correct: false }
        ],

    },
    {
        question: "What is the name of the island where the Straw Hat Pirates first meet Tony Tony Chopper?",
        answers: [
            { text: "Drum Island", correct: true },
            { text: "Sabaody Archipelago", correct: false },
            { text: "Whole Cake Island", correct: false },
            { text: "Fishman Island", correct: false }
        ],
    },
    {
        question: "What is the name of the Devil Fruit that Monkey D. Luffy ate?",
        answers: [
            { text: "Moku Moku no Mi", correct: false },
            { text: "Hie Hie no Mi", correct: false },
            { text: "Yami Yami no Mi", correct: false },
            { text: "Gomu Gomu no Mi", correct: true }
        ],

    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);

restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();

}
function showQuestion() {
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];


    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

         answersContainer.appendChild(button);

         
    });




}

function selectAnswer(event) {
    if (answerDisabled) return;
    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Excellent! You're a One Piece expert!(Nakama)";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Good job! You know your One Piece!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Not bad! You have some knowledge of One Piece!";
    } else {
        resultMessage.textContent = "Better luck next time! Keep watching One Piece!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove('active');

    startQuiz();
}



