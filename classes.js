"use strict"

class Game{
    fruits="🍏 🍌 🍒 🍇 🍉 🍍 💎".split(" ")
    fruitX=0
    fruitY=0
    fruit 
    
    constructor(){
        this.snake=new Snake(this,50,25,1,1,5,10)

        this.fruit = document.createElement("div")
        this.fruit.classList.add("fruit")
        document.body.appendChild(this.fruit)                
        this.throwFruit()

    }

    throwFruit(){
        this.fruitX=Math.floor(Math.random()*100)
        this.fruitY=Math.floor(Math.random()*100)
        
        this.fruit.style.left= this.fruitX+"%"
        this.fruit.style.top= this.fruitY+"%"
                
        this.fruit.innerHTML=this.fruits[Math.floor(Math.random()*this.fruits.length)]
    }
}


class Snake{
    segments=[]
    headX
    headY
    dx
    dy
    game
  
    constructor(game,x,y, xs,ys, startLength,maxLength){
        this.game=game
        this.headX=x
        this.headY=y
        this.xs=xs  //X Scale
        this.ys=ys  //Y Scale
        this.dx=0
        this.dy=-1
        this.length = 0 //length
        this.maxLength = maxLength

        for (let i=0;i<startLength;i++){
            this.move()
        }       
    }
    
    move(){

        this.headX+=this.dx
        this.headY+=this.dy
        
        this.checkFruit()  //See if we have hit the fruit, and if so extend the maxLength
            
        if(this.bites(this)){ //has the snake 'bitten' itself (or, later - for multiplayer, another snake)
            //Loose a life
            alert ("You lost a life")
        }
        else{

            const head=new Segment(this) 
            
            this.segments.push(head)    

            if (this.length>this.maxLength){
                const tail=this.segments.shift()                
                document.body.removeChild(tail.div)
            }
            else{
                this.length++
            }
        }
    }

    checkFruit(){
        if(this.headX==this.game.fruitX && this.headY==this.game.fruitY){
            this.maxLength+=3   
            this.game.throwFruit()
        }        
    }

    bites(target){
        
        for (let i=0;i<target.length-1;i++){  //NB: we go to <length-1 .. which is the 'neck' of the snake (not the head - which is at length-1 )
            let segment=target.segments[i]
            if(segment.x==this.headX && segment.y==this.headY){
                return true
            }
        }
        return false
    }

    steer(e){
        if (e.key=="ArrowLeft"){
            this.dx=-1
            this.dy=0
        }
        else if (e.key=="ArrowRight"){
            this.dx=1
            this.dy=0        
        }
        else if (e.key=="ArrowUp"){
            this.dx=0
            this.dy=-1
        }
        else if (e.key=="ArrowDown"){
            this.dx=0
            this.dy=1
        }
    }    
}


class Segment{
    x
    y
    div

    constructor(snake){
        this.x=snake.headX
        this.y=snake.headY
                
        const head =  document.createElement("div")        
        head.classList.add("segment")
        head.style.top=this.y * snake.xs +"%"
        head.style.left=this.x * snake.ys +"%"
        document.body.appendChild(head)

        this.div=head //hang on to a reference to the div
      // grid.cells[this.y][this.x]=true // 'occupy this 'sqaure' of the grid

    }
}
