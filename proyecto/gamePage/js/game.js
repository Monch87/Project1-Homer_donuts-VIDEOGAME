const lunchGame = {
    // un chef tiene que dar una comida clandestina para 20 comensales,
    //  tendra que preparar 5 platos para cada comensal, 
    // tendra que tener cuidado con la bedida y la comida fast food, 
    // ademas de esquivar a chikote que le quiere chapar el garito.
    name: 'Covid Lunchtime',
    description: 'Canvas App for lunch prep',
    author: 'Montserrat Mosqueda, Carlos Prado',
    version: '1.0.0',
    license: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    player: undefined,
    obstacle1:undefined,
    itemArr:[],
    goodFoodArr:[],
    badFoodArr:[],
    goodDrinkArr:[],
    badDrinkArr:[],
    score:0,
    lives:3,
    background:undefined,
    canvasDom: undefined,
    frames:0,
    keys: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
        space: ' '
      },
    canvasSize: {
        w: undefined,
        h: undefined
      },

    init(id){
        this.canvasDom = document.querySelector (`#${id}`)
        this.ctx = this.canvasDom.getContext ('2d')
        this.setDimensions()
        this.createPlayer()
        this.createObstacle1()
        this.drawAll()
        this.setEventListeners() 
        this.start()
        this.createFood()
        this.createDrinks()
    },

    setDimensions(){
        this.canvasSize = {
            w: window.innerWidth-600,
            h: window.innerHeight,
            PosX:200
        }
        this.canvasDom.setAttribute ('width', this.canvasSize.w)
        this.canvasDom.setAttribute ('height', this.canvasSize.h)
    },


    drawBoard() {
        // this.ctx.fillStyle = 'white'
        // this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.background = new Image()
        this.background.src = 'images/cocina.jpg'
        this.ctx.drawImage(this.background,0,0,this.canvasSize.w,this.canvasSize.h); 
    },
 

    createPlayer() {
      this.player = new Player (this.ctx, this.canvasSize) 
    },

    createObstacle1() {
      this.obstacle1 = new Obstacle1 (this.ctx, this.canvasSize) 
    },

    createFood() {
      this.goodFoodArr.push(new GoodFood (this.ctx, this.canvasSize))
      this.badFoodArr.push(new BadFood (this.ctx, this.canvasSize))
    },

    createDrinks() {
      this.goodDrinkArr.push(new GoodDrink (this.ctx, this.canvasSize))
      this.badDrinkArr.push(new BadDrink (this.ctx, this.canvasSize,this.player.speed.x))
    },
    


    setEventListeners() {
    document.onkeydown = e => {

      if (e.key === this.keys.left){
        this.player.move('left')
      }

      if (e.key === this.keys.right) {
        this.player.move('right')
      }

      if (e.key === this.keys.space){ 
        this.player.move('space')
       }  
    }
  },


drawAll() {
  this.drawBoard()
  this.drawScore()
  this.player.draw()
  this.obstacle1.draw()
  this.goodFoodArr.forEach (elm2=>{elm2.draw()}) 
  this.badFoodArr.forEach (elm2=>{elm2.draw()}) 
  this.goodDrinkArr.forEach (elm2=>{elm2.draw()}) 
  this.badDrinkArr.forEach (elm2=>{elm2.draw()})
},

drawScore(){
  //-----preguntar a TEO SCORE FUERA DE CANVAS
  this.ctx.font = "40px Arial"
  this.ctx.fillStyle = "black" 
  this.ctx.fillText("Score: " + this.score + "Lives: " + this.lives, 100, 70)
  //this.ctx.fillText("Lives: " + this.lives, 100, 70)
},


start(){
  setInterval(() => {
    this.clearScreen()
    this.drawAll()
    this.clearAll()
    this.collisionDetection() 
    this.frames++  
    this.frames % 30 === 0 ? this.createFood() : null  
    this.frames % 70 === 0 ? this.createDrinks() : null   
}, 70)
},


//// REVISAR////
clearAll() {
  this.goodFoodArr= this.goodFoodArr.filter(elm => elm.itemPos.x > -elm.itemSize.w)
  this.badFoodArr= this.badFoodArr.filter(elm => elm.itemPos.x > -elm.itemSize.w)
  this.goodDrinkArr= this.goodDrinkArr.filter(elm => elm.itemPos.x > -elm.itemSize.w)
  this.badDrinkArr= this.badDrinkArr.filter(elm => elm.itemPos.x > -elm.itemSize.w)
  
  console.log(this.goodFoodArr.length)
},


clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
},


collisionDetection(){
  if (this.player.playerPos.x < this.obstacle1.obstacle1Pos.x + this.obstacle1.obstacle1Size.w &&
    this.player.playerPos.x + this.player.playerSize.w > this.obstacle1.obstacle1Pos.x &&
    this.player.playerPos.y < this.obstacle1.obstacle1Pos.y + this.obstacle1.obstacle1Size.h &&
    this.player.playerSize.h + this.player.playerPos.y > this.obstacle1.obstacle1Pos.y){
      if (this.lives<=0){
      alert ("GAME OVER || recarge la pagina para continuar")
    } else {
      this.lives-- 
      this.obstacle1.restart()
    }
  }

  this.badDrinkArr.forEach((elm, i)=>{
    if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
      this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
      this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
      this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y){
        elm.moveSlower(this.player)
        this.badDrinkArr.splice(i,1)  
   }
  }) 

  this.goodDrinkArr.forEach((elm, i) =>{
    if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
      this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
      this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
      this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y){
        elm.moveNormal(this.player)
        this.goodDrinkArr.splice(i,1)  
   }
  })

  this.goodFoodArr.forEach((elm, i) =>{
    if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
      this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
      this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
      this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y){
        this.goodFoodArr.splice(i,1)   
        this.score+=1
        this.score>=20 ? alert ('ENHORABUENA!!! HAS GANADO!!!'): null
   }
  }) 

  this.badFoodArr.forEach((elm, i) =>{
    if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
      this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
      this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
      this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y){
         this.badFoodArr.splice(i,1)   
         this.score>0 ? this.score-=1 : null     
   }
  })
},

}

