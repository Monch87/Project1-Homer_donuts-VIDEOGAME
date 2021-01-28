class Obstacle1{

    constructor(ctx, canvasSize) {
        this.ctx = ctx

        this.canvasSize = { w: canvasSize.w, h: canvasSize.h}
        this.obstacle1Size = {w: 250, h: 250}
        this.obstacle1Pos = {x:0, y:this.canvasSize.h-this.obstacle1Size.h-40}
        this.speed = {x:15, y: 0}
        this.obstacle1Instance = undefined
        this.imageobstacles = ['images/bartsimpson.gif', 'images/maggiesimpson.png', 'images/Itchy.png']
        this.init()
    }



    init() {

        this.obstacle1Instance = new Image()
        this.obstacle1Instance.src = this.imageobstacles[Math.floor(this.imageobstacles.length* Math.random())]
    }



    draw() {
        this.ctx.drawImage(this.obstacle1Instance, this.obstacle1Pos.x, this.obstacle1Pos.y, this.obstacle1Size.w, this.obstacle1Size.h)
        this.move()
    
    }

    move() {
            this.obstacle1Pos.x += this.speed.x
    }
 }


