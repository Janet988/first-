const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let speed = 100; // 默认速度为简单模式


function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));
}

function drawFood() {
    drawRect(food.x, food.y, 'red');
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = getRandomFoodPosition();
        document.getElementById('score').innerText = `得分: ${score}`; // 更新得分显示
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert(`游戏结束！你的得分是: ${score}`);
        document.location.reload();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    drawSnake();
    drawFood();
}

document.addEventListener('DOMContentLoaded', function() {
    const modeSelect = document.getElementById('mode');
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    if (mode) {
        modeSelect.value = mode;
        speed = mode === 'hard' ? 33.33 : 50; // 修改速度设置逻辑
    }
    gameInterval = setInterval(gameLoop, speed);
});

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

document.getElementById('mode').addEventListener('change', function() {
    speed = this.value === 'hard' ? 33.33 : 50; // 修改速度设置逻辑
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
});

food = getRandomFoodPosition();
let gameInterval = setInterval(gameLoop, speed);