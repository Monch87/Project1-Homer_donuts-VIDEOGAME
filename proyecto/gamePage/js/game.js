const lunchGame = {
  name: 'Covid Lunchtime',
  description: 'Canvas App for lunch prep',
  author: 'Montserrat Mosqueda, Carlos Prado',
  version: '1.0.0',
  license: undefined,
  /** @type {CanvasRenderingContext2D} */
  ctx: undefined,
  player: undefined,
  obstacles1: [],
  itemsArrs: {
    goodFoodArr: [],
    badFoodArr: [],
    goodDrinkArr: [],
    badDrinkArr: [],
  },
  score: 0,
  lives: 3,
  background: [],
  canvasDom: undefined,
  frames: 0,
  keys: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    space: ' '
  },
  canvasSize: {
    w: undefined,
    h: undefined
  },

  init(id) {
    this.canvasDom = document.querySelector(`#${id}`)
    this.ctx = this.canvasDom.getContext('2d')
    this.setDimensions()
    this.createPlayer()
    this.createObstacle1()
    this.drawAll()
    this.setEventListeners()
    this.start()
    this.createFood()
    this.createDrinks()
    this.playSound()
  },

  setDimensions() {
    this.canvasSize = {
      w: window.innerWidth - 600,
      h: window.innerHeight - 70,
      PosX: 200
    }

    this.canvasDom.setAttribute('width', this.canvasSize.w)
    this.canvasDom.setAttribute('height', this.canvasSize.h)
  },


  drawBoard() {
    this.background = new Image()
    this.background.src = ('images/thesimpsons.png') 
    this.ctx.drawImage(this.background,0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  drawBoardGameOver() {
   // this.background = new Image()
   // this.background.src = ('images/gameover.png')
   // this.ctx.drawImage(this.background, 0, 0, this.canvasSize.w, this.canvasSize.h);
  },
  drawBoardWin() {
   // this.background = new Image()
  //  this.background.src = ('images/win.jpg') 
  //  this.ctx.drawImage(this.background, 0, 0, this.canvasSize.w, this.canvasSize.h);
  },


  createPlayer() {
    this.player = new Player(this.ctx, this.canvasSize)
  },

  createObstacle1() {
    this.obstacles1.push(new Obstacle1(this.ctx, this.canvasSize))
  },

  createFood() {
    this.itemsArrs.goodFoodArr.push(new GoodFood(this.ctx, this.canvasSize))
    this.itemsArrs.badFoodArr.push(new BadFood(this.ctx, this.canvasSize))
  },

  createDrinks() {
    this.itemsArrs.goodDrinkArr.push(new GoodDrink(this.ctx, this.canvasSize))
    this.itemsArrs.badDrinkArr.push(new BadDrink(this.ctx, this.canvasSize, this.player.speed.x))
  },



  setEventListeners() {
    document.onkeydown = e => {

      if (e.key === this.keys.left) {
        this.player.move('left')
      }

      if (e.key === this.keys.right) {
        this.player.move('right')
      }

      if (e.key === this.keys.space) {
        this.player.move('space')
      }
    }
  },


  drawAll() {
    this.drawBoard()
    this.drawScore()
    this.player.draw()
    this.obstacles1.forEach(elm => elm.draw())  
    Object.values(this.itemsArrs).flat().forEach(elm => elm.draw())
  },




  drawScore() {
    let domFood = document.querySelector("#scorepoints")
    domFood.innerText = this.score
    let domLives = document.querySelector("#lives")
    domLives.innerText = this.lives
  },


  start() {
    this.interval=setInterval(() => {
      this.clearScreen()
      this.drawAll()
      this.clearAll()
      this.collisionDetection()
      this.frames++
      this.frames % 30 === 0 ? this.createFood() : null
      this.frames % 200 === 0 ? this.createDrinks() : null
      this.frames % 200 === 0 ? this.createObstacle1() : null
    }, 70)
  },

   playSound(){
    let audio = document.getElementById("audio")
    console.log(audio)
    audio.play()

   },


  clearAll() {
    Object.values(this.itemsArrs).forEach(elm => elm = elm.filter(elm => elm.itemPos.y < this.canvasSize.h))
  },



  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
  },

  addScore() {
    this.score += 1
  },


  collisionDetection() {
    this.obstacles1.forEach((elm, i) => {
      if (this.player.playerPos.x < elm.obstacle1Pos.x + elm.obstacle1Size.w &&
        this.player.playerPos.x + this.player.playerSize.w > elm.obstacle1Pos.x &&
        this.player.playerPos.y < elm.obstacle1Pos.y + elm.obstacle1Size.h &&
        this.player.playerSize.h + this.player.playerPos.y > elm.obstacle1Pos.y) {
      if (this.lives <= 0) {
        this.clearScreen()
        this.drawBoardGameOver()  
        this.gameOver()
      } else {
        this.lives--
        this.obstacles1.splice(i, 1)
      }
     }
    })

    this.itemsArrs.badDrinkArr.forEach((elm, i) => {
      if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
        this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
        this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
        this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y) {
        elm.moveSlower(this.player)
        this.itemsArrs.badDrinkArr.splice(i, 1)
      }
    })

    this.itemsArrs.goodDrinkArr.forEach((elm, i) => {
      if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
        this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
        this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
        this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y) {
        elm.moveNormal(this.player)
        this.itemsArrs.goodDrinkArr.splice(i, 1)
      }
    })

    this.itemsArrs.goodFoodArr.forEach((elm, i) => {
      if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
        this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
        this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
        this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y) {
        this.itemsArrs.goodFoodArr.splice(i, 1)
        this.addScore()
        if (this.score >= 10) {
          this.clearScreen()
          this.drawBoardWin()
          this.gameOver()
        }
      }
    })

    this.itemsArrs.badFoodArr.forEach((elm, i) => {
      if (this.player.playerPos.x < elm.itemPos.x + elm.itemSize.w &&
        this.player.playerPos.x + this.player.playerSize.w > elm.itemPos.x &&
        this.player.playerPos.y < elm.itemPos.y + elm.itemSize.h &&
        this.player.playerSize.h + this.player.playerPos.y > elm.itemPos.y) {
        this.itemsArrs.badFoodArr.splice(i, 1)
        this.score > 0 ? this.score -= 1 : null
      }
    })
  },

  gameOver() {
    clearInterval(this.interval)
    // this.ctx.font="50px Avenir"
    // this.ctx.fillStyle="white"
    // this.ctx.fillStyle('GAME OVER',100,100)
  },

}

