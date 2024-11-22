let num;
let attempt = 0;
let score = 0;
let lives;
const heartsContainer = document.getElementById("hearts");
const difficulty = document.getElementById("difficulty");
const attemptData = document.getElementById("Attempt");
const userinp = document.getElementById("inp");
const subBtn = document.getElementById("submit");
const resBtn = document.getElementById("resBtn");
const message = document.getElementById("msg");
const scoreDisplay = document.getElementById("score");
const hintBtn = document.getElementById("hintBtn");

function initializeGame() {
  const level = difficulty.value;
  if (level === "easy") {
    lives = 7;
  } else if (level === "medium") {
    lives = 9;
  } else {
    lives = 11;
  }
  num = Math.floor(Math.random() * 100) + 1;
  attempt = 0;
  attemptData.innerHTML = attempt;
  updateHearts();
  message.innerHTML = "";
  scoreDisplay.innerHTML = score;
  resBtn.style.display = "none";
}

function updateHearts() {
  heartsContainer.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heartsContainer.appendChild(heart);
  }
}

function check() {
  let usernum = parseInt(userinp.value);
  if (isNaN(usernum) || usernum < 1 || usernum > 100) {
    message.innerHTML = "Please enter a valid number between 1 and 100.";
    return;
  }

  if (usernum === num) {
    message.innerHTML = "Congratulations! You guessed the number!";
    message.style.color = "green";
    score += 10;
    resBtn.style.display = "block";
  } else {
    message.innerHTML = usernum > num ? "Too high!" : "Too low!";
    message.style.color = "red";
    lives--;
    updateHearts();

    if (lives === 0) {
      message.innerHTML = "Game Over! The correct number was " + num;
      resBtn.style.display = "block";
    }
  }

  attempt++;
  attemptData.innerHTML = attempt;
  setTimeout(() => {
    message.innerHTML = "";
    userinp.value = "";
  }, 2000);
}

function giveHint() {
  if (lives > 0) {
    const hint = num % 2 === 0 ? "The number is even." : "The number is odd.";
    message.innerHTML = hint;
    message.style.color = "lightgreen";
    setTimeout(() => {
      message.innerHTML = "";
    }, 3000);
  }
}

difficulty.addEventListener("change", initializeGame);
subBtn.addEventListener("click", check);
hintBtn.addEventListener("click", giveHint);
resBtn.addEventListener("click", initializeGame);

initializeGame();
