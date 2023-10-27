class Apples{
    size;
    canvasWidth;
    canvasHeight;
    ctx;
    snakeBody;
    applesTable = [];
    firstApple;
    secondApple;
    isPaused;

    constructor ( blockSize, canvasWidth, canvasHeight, ctx, snakeBody, isPaused ) {
        this.size = blockSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.snakeBody = snakeBody;
        this.isPaused = isPaused;

        this.createApples();
    }
    
    /**
     * Create 2 new apples
     */
    createApples () {

        this.firstApple = new Apple(this.size, this.canvasWidth, this.canvasHeight, this.ctx, this.snakeBody, this.isPaused );
        this.secondApple = new Apple(this.size, this.canvasWidth, this.canvasHeight, this.ctx, this.snakeBody, this.isPaused );
        
        if ( this.firstApple.getX() === this.secondApple.getX() || this.firstApple.getY() === this.secondApple.getY() ) { // if the apples are side by side
            this.createApples()
        } else {
            this.applesTable =  [this.firstApple, this.secondApple];
        }
    }

    show () {
        this.applesTable.forEach( apple => !apple.getEat() && apple.show() );
        this.applesEat()
    }

    applesEat () {
        if ( this.firstApple.getEat() && this.secondApple.getEat() ) {
            this.createApples();
        }
    }
}