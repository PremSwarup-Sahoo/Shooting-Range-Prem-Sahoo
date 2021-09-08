var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
  
}

function draw() {
  background("#BDA297");

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }

    heading.html("Life: "+life)
    heading.style('color:red'); 
    heading.position(150,20)
  
    scoreboard.html("Score: "+score)
    scoreboard.style('color:red'); 
    scoreboard.position(width-200,20)

    drawSprites();
  }
     
}

function keyPressed(){
  if(keyCode===32){
    shootBullet();
  }
}

function shootBullet(){
    bullet= createSprite(150, width/2, 50,20)
    bullet.y= gun.y-20
    bullet.addImage(bulletImg)
    bullet.scale=0.12
    bullet.velocityX= 13
    bullet.lifetime = 820
    bulletGroup.add(bullet)
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -random(8,11);
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}

function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function handleBubbleCollision(bubbleGroup){
  if (life > 0) {
     score=score+1;
  }

  blastSprite = createSprite(bullet.x+60, bullet.y, 50,50);
  blastSprite.addImage(blastImg);
  blastSprite.scale=0.3;
  blastSprite.lifetime=20;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();

}

function handleGameover(bubbleGroup){
  
  life-=1;
  bubbleGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}
