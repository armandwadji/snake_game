window.onload = () => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const modal = document.getElementById('modal');
    let snakeColor;
    let blockSize;
    let canvasWidth;
    let canvasHeight;
    let config;
    let snakee;
    let apples;
    let delay = 100;
    let score;
    //_BUTTONS
    let isPaused = false;
    let deathModal = document.getElementById('modal');
    let buttonsBar = document.getElementById('btnBar');
    let pauseButton = document.getElementById("pauseBtn");
    let relaunchButton = document.getElementById("relaunchBtn");
    let playAgainButton = document.getElementById("playAgainBtn");

    // Get the config.json file
    loadConfig('conf.json', () => {
        init();
    })

    /**
     * 
     * @param {*} url get the config.json file
     * @param {*} callback
     */
    function loadConfig(url, callback) {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                config = JSON.parse(request.responseText);
                callback();
            }
        };
        request.send(null);
    }

    let timeInterval = setInterval(mooveSnake, delay);

    function init() {
        canvasWidth = config.canvasWidth;
        canvasHeight = config.canvasHeight;
        blockSize = config.blockSize;
        snakeColor = config.snakeColor;
        score = 0;
        console.log(score);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        document.body.appendChild(canvas);
        snakee = new Snake([
            [10, 4],
            [9, 4],
            [8, 4]
        ], "right" ); 

        apples = new Apples( blockSize, canvasWidth, canvasHeight, ctx, snakee.body, isPaused );   
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
     * @description checking if head position is out of the game area
     * @param headPosition [x, y]
     */
    function isTouchingWall(headPosition) {
        const headX = headPosition[0];
        const headY = headPosition[1];
        if (headX < 0 || headX >= (canvasWidth / blockSize) || headY < 0 || headY >= (canvasHeight / blockSize)) {
            gameOver("Snake touch the wall ..!");
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
                gameOver("Snake touch itself ..!");
                clearInterval(timeInterval);
                return true;
            }
        }
        return false;
    }

    /**
     * @description checking if the snake is touching an apple
     * @param headPosition
     */
    function isTouchingApple(headPosition) {
        const headX = headPosition[0];
        const headY = headPosition[1];

        apples.applesTable.forEach((apple) => {
            if (headX === apple.getX() && headY === apple.getY() && apple.getEat()) {
                snakee.ateApple = true;
                score++;
                console.log(apple);
            }
        });
    }

    // Create a function that moove the snake
    function mooveSnake() {
        const head = [ ...snakee.body[ 0 ] ];
        // Copy the head's position
        if ( !isPaused ) {
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
            } else {
                snakee.ateApple = false;
            }
            refreshCanvas();
            isTouchingWall(head);
            isTouchingWall(head);
            isTouchingItself(head);
            isTouchingApple(head);
        }
        refreshCanvas();
        showScore(score);
    }


    // refresh canvas
    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < snakee.body.length; i++) {
            drawSnake(ctx, snakee.body[i]);
        }
        apples.show();
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

    // Create a function to make a break or resume the game
    function togglePause() {
        isPaused = !isPaused;
        const buttonText = isPaused ? "Play" : "Pause";
        pauseButton.innerHTML = buttonText;

        apples.applesTable.forEach( apple => {
            // console.log(apple);
            apple.setIsPaused(isPaused);
        } );
    }
    // add pause() and resume() on pauseButton
    pauseButton.addEventListener("click", togglePause);

    // Create a function to relaunch the game
    function relaunch() {
        if (isPaused) {
            togglePause();
        }
        clearInterval( timeInterval );
        timeInterval = setInterval(mooveSnake, delay);
        init();
    }
    // add event on relaunchButton
    relaunchButton.addEventListener("click", relaunch);
    // Create a function to relaunch the game
    function playAgain() {
        relaunch();
        deathModal.style.display = 'none';
        buttonsBar.style.display = 'flex';
    }
    playAgainButton.addEventListener("click", playAgain);
    function showScore(score) {
        const scoreText = document.getElementsByClassName('score-value');
        Array.from(scoreText).forEach((element) => {
            element.innerHTML = score;
        });
    }

    /**
     *
     * @param death <string>
     */
    function gameOver(death) {
        const modalDeath = document.getElementById('death');
        modalDeath.innerText = death;
        modal.style.display = "block";
        buttonsBar.style.display = 'none';
    }
}
