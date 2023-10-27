class Apples{
    size;
    canvasWidth;
    canvasHeight;
    ctx;
    snakeBody;
    applesTable = [];

    constructor ( blockSize, canvasWidth, canvasHeight, ctx, snakeBody ) {
        this.size = blockSize;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.snakeBody = snakeBody;

        this.createApples();
    }
    
    /**
     * Create 2 new apples
     */
    createApples () {

        this.firstApple = new Apple(this.size, this.canvasWidth, this.canvasHeight, this.ctx, this.snakeBody );
        this.secondApple = new Apple(this.size, this.canvasWidth, this.canvasHeight, this.ctx, this.snakeBody );
        
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
        const [ firstApple, secondApple ] = this.applesTable;

        if ( firstApple.getEat() && secondApple.getEat() ) { 
            this.createApples();
        }
        // else {
        //     console.log("wait");
        // }
    }
}