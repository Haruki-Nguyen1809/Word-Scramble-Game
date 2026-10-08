const gameTopic = [
    { topic: "fruit", time: 60, words: [
        {word: "apple", hint: "red, keeps the doctor away"},
        {word: "banana", hint: "yellow, monkeys like it"},
        {word: "orange", hint: "this fruit has a similar color with the name of this fruit"},
        {word: "strawberry", hint: "red, sour, small"}
    ]},
    { topic: "animal", time: 90, words: [
        {word: "cat", hint: "a very popular pet"},
        {word: "tiger", hint: "striped big cat"},
        {word: "crocodile", hint: "green, amphibian"},
        {word: "dinosaur", hint: "die for a long time ago"}
    ]},
    { topic: "country", time: 120, words: [
        {word: "argentina", hint: "tango, penso"},
        {word: "germany", hint: "beer, berlin"},
        {word: "england", hint: "fish and chip"},
        {word: "morocco", hint: "capital of this country is rabat"}
    ]},
    { topic: "Scientific & Medical Terminology", time: 90, words: [
        {word: "cholesterol", hint: "A waxy, fat-like substance found in all cells of the body"},
        {word: "molecude", hint: "This is a group of two or more atoms bonded together, forming the smallest fundamental unit of a chemical compound"},
        {word: "insulin", hint: "A crucial peptide hormone produced by the pancreas that lowers blood glucose levels"},
        {word: "parasite", hint: "An organism that lives on or inside another host organism and benefits at the host's expense"}
    ]}
];
let currentTopic = null;
let wordsArray = null;
let currentWord = null;
let playedTopics = [];
let playedWords = [];
let point = 0;
let countDownTimer = null;
let timeLeft;
const answerField = document.getElementById("answer-field");
const refreshBtn = document.getElementById("refresh-btn");
const checkBtn = document.getElementById("check-btn");
const wordContainer = document.getElementById('word-container');
const hintEl = document.getElementById('hint');
const startBtn = document.getElementById('start-btn');
const pointEl = document.getElementById('point');
const timeEl = document.getElementById('time-left');
const resultBox = document.getElementById('result-box');
const gameOver = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const contentBox = document.getElementById('content-box');
const restartBtn = document.getElementById('restart-btn');

function randomChoice(array) {
    let randomNumber = Math.floor(Math.random() * array.length);
    let randomGameTopic = array[randomNumber];
    return randomGameTopic;
}

currentTopic = randomChoice(gameTopic);
wordsArray = currentTopic.words;
timeLeft = currentTopic.time;

function randomLetters(word) {
    let replicateLetters = new Set(word);
    if (replicateLetters.size <= 1) {
        return word;
    }
    let seperatedLetters = word.split('');
    let shuffled = null;
    let scrambleWord = null;
    do {
        shuffled = [...seperatedLetters];
        for (let i = shuffled.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * (i+1));
            [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
        }
        scrambleWord = shuffled.join('');
    } while (scrambleWord === word);
    return scrambleWord;
}

startBtn.addEventListener('click', function() {
    if (countDownTimer !== null) {
        return;
    }
    if (filterArr() === true) {
        uiAppear();
        timeEl.textContent = `Time left: ${timeLeft}`;
        if (countDownTimer === null) {
            countDownTimer = setInterval(countDown, 1000);
    }
    } else {
        contentBox.classList.add("hidden");
        endGame();
    }
});

function uiAppear() {
    let finalWord = randomLetters(currentWord.word);
    let hintUi = currentWord.hint;
    wordContainer.textContent = finalWord;
    hintEl.textContent = "Hint: " + hintUi;
}

function filterArr() {
    let filterArray = wordsArray.filter((w) => !(playedWords.includes(w.word)));
    if (filterArray.length === 0) {
        if (changeTopic() === true) {
            timeEl.textContent = `Time left: ${timeLeft}`;
            countDownTimer = setInterval(countDown, 1000);
            return filterArr();
        } else {
            return false;
        }
    }
    currentWord = randomChoice(filterArray);
    playedWords.push(currentWord.word);
    return true;
}

checkBtn.addEventListener('click', function() {
    if (currentWord === null) {
        return;
    }
    let answerValue = answerField.value;
    answerField.value = "";
    let finalAnswerValue = answerValue.trim().toLowerCase();
    if (finalAnswerValue === "" || !(isNaN(finalAnswerValue))) {
        return alert('Please type in valid answer');
    }
    if (finalAnswerValue === currentWord.word && currentWord.word.length > 5) {
        point = point + 5;
        pointEl.textContent = `Point: ${point}`;
        if (filterArr() === true) {
            uiAppear();
        } else {
            contentBox.classList.add("hidden");
            endGame();
        }   
    } else if (finalAnswerValue === currentWord.word && currentWord.word.length <= 5) {
        point++;
        pointEl.textContent = `Point: ${point}`;
        if (filterArr() === true) {
            uiAppear();
        } else {
            contentBox.classList.add("hidden");
            endGame();
        }   
    } else if (point <= 0) {
        pointEl.textContent = `Point: ${point}`;
    } else {
        point--;
        pointEl.textContent = `Point: ${point}`;
    }
});

function countDown() {
    timeLeft--;
    timeEl.textContent = `Time left: ${timeLeft}`;
    countdownFinished();
}

function countdownFinished() {
    if (timeLeft === 0) {
        clearInterval(countDownTimer);
        timeEl.textContent = `Time's up`;
        if (changeTopic() === false) {
            contentBox.classList.add("hidden");
            endGame();
        } else {
            wordContainer.textContent = `Please click the start button to continue`;
            hintEl.textContent = `Hint:`;
        }
    }
}

function filterTopic() {
    let filterTopicArr = gameTopic.filter((t) => !(playedTopics.includes(t.topic)));
    if (filterTopicArr.length === 0) {
        return false;
    }
    currentTopic = randomChoice(filterTopicArr);
    return true;
}

function endGame() {
    let finalPoint = point;
    resultBox.classList.remove('hidden');
    gameOver.textContent = `🎮 Game over 🎮`;
    finalScore.textContent = `Point: ${finalPoint}`;
}

refreshBtn.addEventListener('click', function() {
    if (currentWord === null) {
        return;
    }
    uiAppear();
});

function changeTopic() {
        playedTopics.push(currentTopic.topic);
        clearInterval(countDownTimer);
        countDownTimer = null;
        if (filterTopic() === true) {
            playedWords = [];
            timeLeft = currentTopic.time;
            wordsArray = currentTopic.words;
            currentWord = null;
            return true;
        } else {
            currentWord = null;
            return false;
        }
}

restartBtn.addEventListener('click', function() {
    point = 0;
    pointEl.textContent = `Point: ${point}`;
    playedTopics = [];
    playedWords = [];
    currentTopic = randomChoice(gameTopic);
    wordsArray = currentTopic.words;
    timeLeft = currentTopic.time; 
    resultBox.classList.add('hidden');
    contentBox.classList.remove('hidden');
    if (filterArr() === true) {
        uiAppear();
        timeEl.textContent = `Time left: ${timeLeft}`;
        if (countDownTimer === null) {
            countDownTimer = setInterval(countDown, 1000);
    }
}
});