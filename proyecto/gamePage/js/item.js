class Item{
    // la comida sale desde arriba desplazandose en el eje Y, 
    // habra 5 platos distintos, y tendra que cocinar 20 de cada.

    constructor(ctx, canvasSize, imageSource) {
        this.ctx = ctx
        this.canvasSize = {w: canvasSize.w, h: canvasSize.h}
        this.itemSize = {w: 50, h: 50}
        this.itemPos = {x: Math.floor(Math.random() * ((this.canvasSize.w-this.itemSize.w) - 50) -50), y:0}
        this.speed = {x:0, y: 15}
        this.imageSource = imageSource
        this.itemInstance = undefined
        this.init()
    }


    init() {
        this.itemInstance = new Image()
        this.itemInstance.src = this.imageSource
    }


    draw() {
        this.ctx.drawImage(this.itemInstance, this.itemPos.x, this.itemPos.y, this.itemSize.w, this.itemSize.h)
        this.move() 
    }

    move() {
         this.itemPos.y += this.speed.y        
        }
 }




 class GoodFood  extends Item {

    constructor(ctx, canvasSize) {
        super(ctx, canvasSize, 'images/car.png')

    }

}



class BadFood extends Item {

    constructor(ctx, canvasSize) {
        super(ctx, canvasSize, 'images/mariokart.png')
    }

    
}



class BadDrink extends Item {

    constructor(ctx, canvasSize) {
        super(ctx, canvasSize, 'images/logo1.png')
    }

    moveSlower(playerSpeedX){
        console.log (playerSpeedX) 
     playerSpeedX= 500
    
    }
}


class GoodDrink extends Item {

    constructor(ctx, canvasSize) {
        super(ctx, canvasSize, 'images/logo.png')
    }
    
}