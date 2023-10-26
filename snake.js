window.onload = () => {
    const canvasWidth = 900;
    const canvasHeight = 600;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const snakeColor = "red";
    const blockSize = 10;
    let snakee;
    let delay = 100;

    init();

    // setInterval(mooveSnake, delay);

    function init() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        document.body.appendChild(canvas);
        snakee = new Snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ], "right");
    }

    // Create a function that create snake body
    // This snake has direction to know where he goes
    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        for (let i = 0; i < body.length; i++) {
            drawSnake(ctx, this.body[i]);
        }
    }

    // Create a function that draw the snake
    function drawSnake(ctx, position) {
        ctx.fillStyle = snakeColor;
        // ctx.fillRect(x, y, width, height);
        ctx.fillRect(position[0] * blockSize, position[1] * blockSize, blockSize, blockSize);
    }

    // Create a function that moove the snake
    function mooveSnake() {
        snakee.body = ([[snakee.body[0][0] + 1, snakee.body[0][1]]]).concat(snakee.body);
        for (let i = 0; i < snakee.body.length; i++) {
            drawSnake(ctx, snakee.body[i]);
        }
        // refreshCanvas();
        console.log(snakee.body);
    }

    // refresh canvas
    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawSnake();
    }

    // Create the new direction on keypress
    window.addEventListener('keydown', (e) => {
        let newDirection;

        // Loop if keypress is left one
        if (e.key === "ArrowLeft") {
            if (snakee.direction === 'right') {
                newDirection = 'up';
            } else if (snakee.direction === 'up') {
                newDirection = 'left';
            } else if (snakee.direction === 'left') {
                newDirection = 'down';
            } else if (snakee.direction === 'down') {
                newDirection = 'right';
            }
            // loop if keypress is right one
        } else if (e.key === "ArrowRight") {
            if (snakee.direction === 'right') {
                newDirection = 'down';
            } else if (snakee.direction === 'down') {
                newDirection = 'left';
            } else if (snakee.direction === 'left') {
                newDirection = 'up';
            } else if (snakee.direction === 'up') {
                newDirection = 'right';
            }
        }
        snakee.direction = newDirection;
        console.log(snakee.direction);
    });
}
