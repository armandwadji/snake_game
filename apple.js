class Apple {
  _x;
  _y;
  _eat = false;

  constructor(blockSize, canvasWidth, canvasHeight, ctx, snakeBody) {
    this.size = blockSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
    this.snakeBody = snakeBody;

    this.setRandomPosition();
  }

  /**
   * create a new Apple
   */
  setRandomPosition() {
    this.x = Math.round(
      (Math.random() * this.canvasWidth) % (this.canvasWidth / this.size)
    );
    this.y = Math.round(
      (Math.random() * this.canvasHeight) % (this.canvasHeight / this.size)
    );

    if (this.appleInSnake()) {
      //if one of the apples is in the body of the snake
      this.setRandomPosition();
    } else {
      this.show();
      this.appleHidden();
    }
  }

  /**
   * Create new apple in canvas
   */
  show() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      this.x * this.size,
      this.y * this.size,
      this.size,
      this.size
    );
    this.appleEat();
  }

  /**
   * tchek if the apple is in the body of the snake
   * @returns boolean
   */
  appleInSnake() {
    let inSnake = false;

    for (const [snakeX, snakeY] of this.snakeBody) {
      if (this.x === snakeX && this.y === snakeY) {
        inSnake = true;
      }
    }

    return inSnake;
  }

  /**
   * remove apple if the snake eats it
   */
  appleEat() {
    const [headX, headY] = this.snakeBody[0];
    if (headX === this.x && headY === this.y) {
      this.eat = true;
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  /**
   * remove the apple after X seconds
   */
  appleHidden() {
    setTimeout(() => {
      if (this.eat) return;

      this.eat = true;
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }, 10000);
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getEat() {
    return this.eat;
  }
}
