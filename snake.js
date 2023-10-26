window.onload = () => {
    const canvasWidth = setDimension(900);
    const canvasHeight = setDimension(600);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const snakeColor = "red";
    const blockSize = 10;
    let snakee;
    let delay = 100;

    init();

    let timeInterval = setInterval(mooveSnake, delay);

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
        /**
     * @param dimension integer
     * @returns integer
     */
    function setDimension(dimension){
        return dimension + 10 ;
    }
    /**
     * @description checking if head position is out of the game area
     * @param headPosition [x, y]
     */
    function isTouchingWall(headPosition){
        headX = headPosition[0];
        headY = headPosition[1];
        if ( headX < 0 || headX >= (canvasWidth / 10) || headY < 0 || headY >= (canvasHeight / 10)  ){
            console.log("Snake touch wall ..!");
            clearInterval(timeInterval);
            return true;
        }
        return false;
    }

    // Create a function that moove the snake
    function mooveSnake() {
        if (canMove == true) {
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
            console.log(snakee.body);
            isTouchingWall(head);
        }
    }

    // refresh canvas
    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < snakee.body.length; i++) {
            drawSnake(ctx, snakee.body[i]);
        }
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
        console.log(snakee.direction);
    });
}
