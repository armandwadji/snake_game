window.onload = () => {

    const canvasWidth = 900;
    const canvasHeight = 600;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const snakeColor = "red";
    const blockSize = 10;
    let snakee;
    let apple;
    let delay = 100;
    let score = 0;

    //Apple constructor
    init();

    let timeInterval = setInterval(mooveSnake, delay);

    function init() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        document.body.appendChild(canvas);
        snakee = new Snake([
            [10, 4],
            [9, 4],
            [8, 4],
            [7, 4],
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4],
            [2, 4],
            [1, 4],
        ], "right" );
        apple = new Apple( blockSize, canvasWidth, canvasHeight, ctx, snakee.body );  
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

    /**
     * @param dimension integer
     * @returns integer
     */
    // function setDimension(dimension) {
    //     return dimension + 10;
    // }

    /**
     * @description checking if head position is out of the game area
     * @param headPosition [x, y]
     */
    function isTouchingWall(headPosition) {
        const headX = headPosition[0];
        const headY = headPosition[1];
        if (headX < 0 || headX >= (canvasWidth / blockSize) || headY < 0 || headY >= (canvasHeight / blockSize)) {
            window.alert("Snake touch wall ..!");
            clearInterval(timeInterval);
            return true;
        }
        return false;
    }

    /**
     * @description checking if the snake is touching itself
     * @param headPosition [x, y]
     */
    function isTouchingItself(headPosition) {
        const headX = headPosition[0];
        const headY = headPosition[1];
        for (let i = 1; i < snakee.body.length; i++) {
            if (headX === snakee.body[i][0] && headY === snakee.body[i][1]) {
                window.alert("Snake touch itself ..!");
                clearInterval(timeInterval);
                return true;
            }
        }
        return false;
    }

    // Create a function that moove the snake
    function mooveSnake() {
        const head = [...snakee.body[0]]; // Copy the head's position
        switch (snakee.direction) {
            case "up":
                head[1] -= 1;
                break;
            case "down":
                head[1] += 1;
                break;
            case "left":
                head[0] -= 1;
                break;
            case "right":
                head[0] += 1;
                break;
        }

        snakee.body.unshift(head); // Add the new head
        if (!snakee.ateApple) {
            snakee.body.pop(); // Remove the tail if not eating an apple
        }
        refreshCanvas();
        isTouchingWall(head);
        isTouchingItself(head);
    }


    // refresh canvas
    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < snakee.body.length; i++) {
            drawSnake(ctx, snakee.body[i]);
        }
        apple.show();
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
        } else {
            newDirection = snakee.direction;
        }
        snakee.direction = newDirection;
    });

    function showScore(score) {
        const scoreText = document.getElementsByClassName('score-value');
        Array.from(scoreText).forEach((element) => {
            element.innerHTML = score;
        });
    }
}
