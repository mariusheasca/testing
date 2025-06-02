const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

document.getElementById("score").innerText = `Score: ${score}`;

// Keyboard controls (desktop)
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "ArrowDown":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "ArrowLeft":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "ArrowRight":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
});

// Mobile button controls
document.getElementById("up").addEventListener("touchstart", e => {
  e.preventDefault();
  if (dy === 0) { dx = 0; dy = -1; }
});
document.getElementById("down").addEventListener("touchstart", e => {
  e.preventDefault();
  if (dy === 0) { dx = 0; dy = 1; }
});
document.getElementById("left").addEventListener("touchstart", e => {
  e.preventDefault();
  if (dx === 0) { dx = -1; dy = 0; }
});
document.getElementById("right").addEventListener("touchstart", e => {
  e.preventDefault();
  if (dx === 0) { dx = 1; dy = 0; }
});

// Also handle click for desktop mouse users on buttons
["up", "down", "left", "right"].forEach(id => {
  document.getElementById(id).addEventListener("click", e => {
    e.preventDefault();
    switch (id) {
      case "up": if (dy === 0) { dx = 0; dy = -1; } break;
      case "down": if (dy === 0) { dx = 0; dy = 1; } break;
      case "left": if (dx === 0) { dx = -1; dy = 0; } break;
      case "right": if (dx === 0) { dx = 1; dy = 0; } break;
    }
  });
});

function gameLoop() {
  if (dx === 0 && dy === 0) {
    draw(); // Just draw initial frame
    return;
  }

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return gameOver();

  // Check self collision
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) return gameOver();

  snake.unshift(head);

  // Check food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  snake.forEach(s => {
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);

  // Prevent placing food inside the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function gameOver() {
  alert(`💀 Game Over! Your score: ${score}`);
  location.reload();
}

setInterval(gameLoop, 150);
