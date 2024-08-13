const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Game logic and rendering goes here

    requestAnimationFrame(gameLoop);
}

gameLoop();
