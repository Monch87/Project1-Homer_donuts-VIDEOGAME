class Player{

        constructor(ctx, canvasSize) {
             this.ctx = ctx

             this.canvasSize = {w: canvasSize.w, h: canvasSize.h}
             this.playerSize = {w: 250, h: 450}
             this.playerPos = {x:this.canvasSize.w/2, y:this.canvasSize.h-this.playerSize.h-40}
             this.speed = {x:30, y:0}
             this.playerGravity = 1.4
             this.playerImageName = 'homersimpson.png'            
             this.playerInstance = undefined
             this.init()
         }
     


         init() {
             this.playerInstance = new Image()
             this.playerInstance.src = 'images/homersimpson.png' 
             this.draw()
         }


     
         draw() {  
            if (this.playerPos.y < this.canvasSize.h-this.playerSize.h-40) { 
                this.speed.y += this.playerGravity
                this.playerPos.y += this.speed.y 
            }

         
           this.ctx.drawImage(this.playerInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
         }
     
         move(dir) {
       
             dir === 'left' && this.playerPos.x > 20 ? this.playerPos.x -= this.speed.x : null
             dir === 'right' && this.playerPos.x < (this.canvasSize.w-this.playerSize.w-35) ? this.playerPos.x += this.speed.x : null
             if (dir === 'space'&& this.playerPos.y >= this.canvasSize.h-this.playerSize.h-40){
               this.speed.y=-35
               this.speed.y += this.playerGravity
               this.playerPos.y += this.speed.y 
            }   

         }

      }
