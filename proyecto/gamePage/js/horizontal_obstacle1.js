class Obstacle1{
    // sale de izq a drch intentando atrapar al chef, si lo atrapa se acaba el juego.

    constructor(ctx, canvasSize) {
        this.ctx = ctx

        this.canvasSize = { w: canvasSize.w, h: canvasSize.h}
        this.obstacle1Size = {w: 100, h: 100}
        this.obstacle1Pos = {x:0, y:this.canvasSize.h-this.obstacle1Size.h-40}
        this.speed = {x:15, y: 0}
        this.obstacle1ImageName = 'flappy.png'
        this.obstacle1Instance = undefined
        this.init()
    }



    init() {
        this.obstacle1Instance = new Image()
        this.obstacle1Instance.src = 'images/flappy.png'

    }



    draw() {
        this.ctx.drawImage(this.obstacle1Instance, this.obstacle1Pos.x, this.obstacle1Pos.y, this.obstacle1Size.w, this.obstacle1Size.h)
        this.move()
    
    }

    move() {
            this.obstacle1Pos.x += this.speed.x
            if (this.obstacle1Pos.x >= this.canvasSize.w - this.obstacle1Size.w || this.obstacle1Pos.x<=0) {
                this.changeSpeed()
            }
        }

            changeSpeed() {
            this.speed.x *= -1
        }

    restart () {
        this.obstacle1Pos.x=0
    }    

 }


