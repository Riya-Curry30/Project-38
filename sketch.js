var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var gameState = "play";

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);
  console.log(gameState);
  if(gameState === "play")
  {
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
 // backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  }
  
  score = 0;
}

function draw() 
{
  
  background(255);
  
  if(gameState === "play")
  {
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player))
    {
      FoodGroup.destroyEach();
    score = score + 2;
    }

    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }

    
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
       // player.scale=0.08;
     // score=score-2;
     gameState = "lost";
    }

    if(score === 4)
    {
      gameState = "end";
    }
}
    console.log(score);

    if(gameState === "lost")
    {
      background("black");
      textSize(70);
      fill("red")
      text("You Lost!", 600, 350);
      //player.velocityY = 0;
      //player.y = 600;
      player.destroy();
      backgr.destroy();
      obstaclesGroup.destroyEach();
      FoodGroup.destroyEach();
    }
   

   if(gameState === "end")
    {
      background("black");
      textSize(70);
      fill("red")
      text("You Win!", 600, 350);
      //player.velocityY = 0;
      //player.y = 600;
      player.destroy();
      backgr.destroy();
      obstaclesGroup.destroyEach();
      
    }
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 70 === 0) {
    var obstacle = createSprite(800,350,10,40);
    camera.x = obstacle.x;
    camera.y = obstacle.y;;
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
