var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");

var interval = 100;

canvas.width = 400;

canvas.height = 400;

var startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
  startGame();
  startButton.style.display = "none";
});

function closeModale() {
  $("#myModal").modal("hide");
}

var score = 0;

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 10, 20);
}

function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#8cbb41";

    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(apple.x + 5, apple.y + 5, 5, 0, 2 * Math.PI);
  ctx.fill();
}

var apple = {
  x: 0,
  y: 0,
};

var snake = [
  { x: 200, y: 200 },

  { x: 190, y: 200 },

  { x: 180, y: 200 },

  { x: 170, y: 200 },

  { x: 160, y: 200 },
];

var dx = 10;

var dy = 0;

var gameStarted = false;

function startGame() {
  $("#myModal").modal("hide");
  snake = [
    { x: 200, y: 200 },

    { x: 190, y: 200 },

    { x: 180, y: 200 },

    { x: 170, y: 200 },

    { x: 160, y: 200 },
  ];

  dx = 10;

  dy = 0;

  gameStarted = true;

  setTimeout(main, interval);
}

function moveSnake() {
  var snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.pop();

  snake.unshift(snakeHead);
}

function generateApple() {
  apple.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  apple.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function gameOver() {
  $("#myModal").modal("show"); // Afficher la modale BS
  gameStarted = false;
}

function checkAppleCollision() {
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    var newBlock = {
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y,
    };
    snake.push(newBlock);
    generateApple();
    score++;
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    gameOver();
  }

  for (var i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver();
    }
  }
}

var position = "droite";

document.addEventListener("keydown", function (event) {
  if (!gameStarted) {
    startGame();
  } else {
    if (event.keyCode === 37 && position != "droite") {
      // gauche

      position = "gauche";

      dx = -10;

      dy = 0;
    } else if (event.keyCode === 38 && position != "bas") {
      // haut
      event.preventDefault();

      position = "haut";

      dx = 0;

      dy = -10;
    } else if (event.keyCode === 39 && position != "gauche") {
      // droite

      position = "droite";

      dx = 10;

      dy = 0;
    } else if (event.keyCode === 40) {
      // bas
      event.preventDefault();

      position = "bas";

      dx = 0;

      dy = 10;
    }
  }
});

function main() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mettre à jour la position du serpent
  moveSnake();

  // Vérifier les collisions
  checkCollision();
  checkAppleCollision();

  // Dessiner la pomme
  drawApple();

  // Dessiner le serpent
  drawSnake();

  // Dessiner le score
  drawScore();

  if (gameStarted) {
    // Répéter la boucle

    setTimeout(main, interval);
  }
}

generateApple();
