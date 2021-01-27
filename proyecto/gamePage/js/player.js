class Player{
    // sera el personaje principal, tiene que recolectar los platos que se le indican en el tablero
    // moviendose de izq a drcha, tiene que evitar a chikote saltandolo
    // y esquivar el jagger
        constructor(ctx, canvasSize) {
             this.ctx = ctx

             this.canvasSize = { w: canvasSize.w, h: canvasSize.h}
             this.playerSize = {w: 300, h: 300}
             this.playerPos = {x:this.canvasSize.w/2, y:this.canvasSize.h-this.playerSize.h-40}
             this.speed = {x:30, y:0}
             this.playerGravity = 2
             this.playerImageName = 'chef.png'            
             this.playerInstance = undefined
             this.init()
         }
     


         init() {
             this.playerInstance = new Image()
             this.playerInstance.src =  'images/chef.png' 
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
               this.speed.y=-25
               this.speed.y += this.playerGravity
               this.playerPos.y += this.speed.y 
            }   

         }

      }
