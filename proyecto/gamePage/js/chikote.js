class Chikote{
    // sale de izq a drch intentando atrapar al chef, si lo atrapa se acaba el juego.




    constructor(ctx, canvasSize) {
        this.ctx = ctx


        this.chikotePos = {x:200, y: 550}
        this.chikoteSize = {w: 100, h: 100}
        this.canvasSize = { w: canvasSize.w, h: canvasSize.h}
        this.speed = {x: 0,y: -20}


        this.chikoteImageName = 'flappy.png'
        
        this.chikoteInstance = undefined

        this.init()

       
       //  this.speed.y+=this.chefGravity
       //  this.chefInstance = undefined
       
    }

    init() {
        this.chikoteInstance = new Image()
        this.chikoteInstance.src =  'images/flappy.png'
    }



    draw() {
      this.ctx.drawImage(this.chikoteInstance, this.chikotePos.x, this.chikotePos.y, this.chikoteSize.w, this.chikoteSize.h)
    }

    move(dir) {
        dir === 'left' && this.chikotePos.x > 20 ? this.chikotePos.x -= 20 : null
        dir === 'right' && this.chikotePos.x < (1230-this.chikoteSize.w) ? this.chikotePos.x += 20 : null
 console.log (move)
    }

 }


