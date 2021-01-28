class Item{

    constructor(ctx, canvasSize, imageSource) {
        this.ctx = ctx
        this.canvasSize = {w: canvasSize.w, h: canvasSize.h}
        this.itemSize = {w: 100, h: 100}
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
        let imageGoodFood = ['images/donut-rose.png','images/donut-cream.png','images/donut.svg']
        super(ctx, canvasSize,imageGoodFood[Math.floor(imageGoodFood.length * Math.random())])
    }
}


class BadFood extends Item {
    constructor(ctx, canvasSize) {
        let imageBadFood=['images/brocoli.svg','images/carrot.svg','images/cabbage.svg']
        super(ctx, canvasSize, imageBadFood[Math.floor(imageBadFood.length* Math.random())])
    }

}



class BadDrink extends Item {

    constructor(ctx, canvasSize) {
        super(ctx, canvasSize, 'images/coffee-cup.svg')
    }

    moveSlower(player){
       player.speed.x= 10
    }
}


class GoodDrink extends Item {

    constructor(ctx, canvasSize,itemSize) {
        let imagedrinks = ['images/beer.png', 'images/canduff.png']
        super(ctx, canvasSize, imagedrinks[Math.floor(imagedrinks.length * Math.random())])
        this.itemSize = itemSize
        this.itemSize = {w: 60, h: 130}



    }
    moveNormal(player){
        player.speed.x= 30
     }
}