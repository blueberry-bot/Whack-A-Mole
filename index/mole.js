const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('scoreBoard');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

let score = 0;
let highScore = localStorage.getItem('whackHighScore') || 0;
let activeHole = null;
let moleInterval = 1000;
let gameInterval;
let timerInterval;
let timeLeft = 30;
// Create mole element
const mole = document.createElement('div');
mole.classList.add('mole');
mole.textContent = '🐹';
//  scoreboard
function updateScoreBoard() {
  scoreBoard.textContent = `Score: ${score} | High Score: ${highScore}`;
}
// Move mole
function moveMole() {
  if (activeHole) activeHole.innerHTML = '';
  const index = Math.floor(Math.random() * holes.length);
  activeHole = holes[index];
  activeHole.appendChild(mole);
}
// Start mole loop
function startMoleLoop() {
  gameInterval = setInterval(moveMole, moleInterval);
}
// Increase speed every 10 seconds
function speedUp() {
  if (moleInterval > 300) {
    moleInterval -= 200;
    clearInterval(gameInterval);
    startMoleLoop();
  }
}
// Countdown timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft % 10 === 0 && timeLeft !== 30) {
      speedUp();
    }

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}
// End game
function endGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  if (activeHole) activeHole.innerHTML = '';
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('whackHighScore', highScore);
  }
  alert(`Time's up! Final Score: ${score}`);
}
// Handle mole click
holes.forEach(hole => {
  hole.addEventListener('click', function(event) {
    if (event.target.classList.contains('mole')) {
      score++;
      updateScoreBoard();
      hole.innerHTML = '';
      activeHole = null;
    }
  });
});
// Start button handler
startBtn.addEventListener('click', () => {
  // Reset everything
  score = 0;
  timeLeft = 30;
  moleInterval = 1000;
  if (activeHole) activeHole.innerHTML = '';
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  updateScoreBoard();
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  startMoleLoop();
  startTimer();
});
// Initial scoreboard
updateScoreBoard();
