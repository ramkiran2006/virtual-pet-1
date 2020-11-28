var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var canvas;
var database;

function preload()
{
  dogImg = loadImage("images/DOG1.png");
  happyDogImg = loadImage("images/DOG2.png");
}

function setup() {
  canvas = createCanvas(500,500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  

  background("white");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
   
  }
 
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  
  }

  text("food remaining = " +foodS,100,100);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}
