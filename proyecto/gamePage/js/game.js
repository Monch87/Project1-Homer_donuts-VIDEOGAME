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
    chef: undefined,
    canvasDom: undefined,
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
        this.createChef()
        this.drawAll()
        this.setEventListeners() 
    },

    setDimensions(){
        this.canvasSize = {
            w: window.innerWidth-600,
            h: window.innerHeight,
            PosX:200
        }
        this.canvasDom.setAttribute ('width', this.canvasSize.w)
        this.canvasDom.setAttribute ('height', this.canvasSize.h)
        //this.canvasDom.setAttribute ()

        console.log(this.canvasDom)
    },

    drawBoard() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
 },
 
 createChef() {
    this.chef = new Chef (this.ctx, this.canvasSize) //150, 550, 100, 100, 'mariokart.png')
  },


  setEventListeners() {
    document.onkeydown = e => {
        console.log(e)

      if (e.key === this.keys.left){
        this.chef.move('left')
      }
      if (e.key === this.keys.right) {
        this.chef.move('right')
        console.log(e)
      }
      if (e.key === this.keys.space){ 
        this.chef.move('space')
        console.log(e)
       }  
    }
    
    
    // createChikote() {
    //   this.chikote = new Chikote (this.ctx, this.canvasSize) //150, 550, 100, 100, 'mariokart.png')
    // },
  
  


  },

  drawAll() {
    setInterval(() => {
       // this.frames++
        // this.frames % 70 === 0 ? this.createObstacle() : null
        this.clearScreen()
        this.drawBoard()
        // this.drawDashedLines()
        // this.drawContinuousLines()
        //this.chikote.draw()
        this.chef.draw()
        //this.chef.move()
        // this.obstacle.drawObst() //? this.createObstacle() : null REVISAR
        // this.totalScore() //REVISAR---------------------------------------------
    }, 70)
},

clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
},
}

