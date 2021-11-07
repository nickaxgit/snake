"use strict"

const game=new Game()

function gameStep(){
    game.snake.move()
}
  
document.body.addEventListener("keydown",(e)=>game.snake.steer(e))
setInterval(gameStep,50)

