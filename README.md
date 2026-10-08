# Word Scramble

A browser game where you unscramble words before time runs out. Built with plain HTML, CSS and JavaScript, no libraries or frameworks.

## How to play

1. Press **Start**. A scrambled word appears together with a hint, and the countdown begins.
2. Type your answer and press **Check Word**.
3. Press **Refresh Word** to reshuffle the letters of the current word (the word itself does not change).
4. Answer every word in a topic before the timer hits zero to move on to the next topic.
5. When all topics have been played, the game ends and your final score is shown. Press **Restart** to play again.

### Scoring

- Correct answer, word longer than 5 letters: **+5 points**
- Correct answer, word of 5 letters or fewer: **+1 point**
- Wrong answer: **-1 point** (the score never goes below 0)

### Rules

- Topics come up in random order, and words inside a topic also come up in random order.
- Every topic has its own time limit (for example, fruit is 60 seconds and animal is 90 seconds).
- If time runs out while words are still left, the game switches to the next topic. Press **Start** to continue.
- Empty answers and numbers are rejected with an alert and do not change your score.

## Features

- Multiple topics, each with its own words, hints and time limit
- Letter shuffling that never returns the original word (when a different arrangement exists)
- Countdown timer per topic
- Game over screen with the final score, plus a Restart button

## Project structure

```
.
├── index.html   # page structure
├── style.css    # styling
└── index.js     # game logic
```

## Run locally

No installation needed. Download or clone the project and open `index.html` in a browser.

## Adding your own topics

All game data lives in the `gameTopic` array at the top of `index.js`. Each topic is an object with a name, a time limit in seconds, and a list of words with hints:

```js
{ topic: "color", time: 60, words: [
    {word: "yellow", hint: "the colour of a banana"}
]}
```

Add a new object to the array and the game will include it automatically.

## Built with

- HTML
- CSS
- JavaScript (vanilla)

## Possible improvements

- Reuse one function for the "show word, update time, start timer" steps that appear in several places
- Show a message when the player runs out of time on a topic
- Save the best score with `localStorage`
- Add more topics and difficulty levels
