class Apple {
    //Fisrt apple
    x1;
    y1;
    
    //Second apple
    x2;
    y2;

    constructor ( blockSize, canvasWidth, canvasHeight, ctx, snakeBody ) {
      this.size = blockSize;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.ctx = ctx;
      this.snakeBody = snakeBody;
      this.setRandomPosition();

    }
    
    
    setRandomPosition() {
        this.x1 = Math.round(Math.random() * this.canvasWidth % (this.canvasWidth / this.size));
        this.y1 = Math.round( Math.random() * this.canvasHeight % ( this.canvasHeight / this.size ) );

        this.x2 = Math.round(Math.random() * this.canvasWidth % (this.canvasWidth / this.size));
        this.y2 = Math.round( Math.random() * this.canvasHeight % ( this.canvasHeight / this.size ) );

        if ( this.x1 === this.x2 || this.y1 === this.y2 ) { // if the apples are side by side
            this.setRandomPosition()
        } else if (this.appleInSnake()) { //if one of the apples is in the body of the snake
            this.setRandomPosition()
        } else {
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect( this.x1 * this.size, this.y1 * this.size, this.size, this.size );
            this.ctx.fillRect( this.x2 * this.size, this.y2 * this.size, this.size, this.size );
        }
    }

    show() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect( this.x1 * this.size, this.y1 * this.size, this.size, this.size );
        this.ctx.fillRect( this.x2 * this.size, this.y2 * this.size, this.size, this.size );
    }

    appleInSnake () {
        let result = false;
        
        for (const [snakeX, snakeY] of this.snakeBody) {
            if ( this.x1 === snakeX && this.y1 === snakeY || this.x2 === snakeX && this.y2 === snakeY ) {
                result = true;
            }
        }

        return result;
    }
}
