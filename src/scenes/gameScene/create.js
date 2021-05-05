const world = require("../../world");
const { width, height } = require("../../constants");
const { worldScrollSpeed } = require("../../world");
//import "../../objects/Player.js";

module.exports = function create() {

  this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  this.bgMusic.play();

  /************************************************ 
  ***************** BACKGROUND ********************
  ************************************************/

  // Create Background 
  /*
  this.background = this.add.tileSprite(0,0,width,height, "background")
    // set its origin
    .setOrigin(0)
    // set which way it scrolls
    .setScrollFactor(0,1);
  */ 

  this.sky = this.add.tileSprite(0,0,width,height, "sky")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);

  this.clouds = this.add.tileSprite(0,0,width,height, "clouds")
    // set its origin
    .setOrigin(0)
    // set which way it scrolls
    .setScrollFactor(0,1);

  this.mountains = this.add.tileSprite(0,0,width,height, "mountains")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);

  this.trees = this.add.tileSprite(0,0,width,height, "trees")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);

  
  this.anims.create({
    key: "stream",
    frameRate: 7,
    frames: this.anims.generateFrameNumbers("water", {start: 0, end: 3}),
    repeat: -1,
  });

  var water = this.add.sprite(0,400, "water")
    .setOrigin(0);

  water.play("stream");
  
  /************************************************ 
  ***************** SCORE *************************
  ************************************************/  

  world.distanceText = this.add.text(16,16, 'Distance: 0', {fontSize: "32px", fill: "#000"});
  world.livesText = this.add.text(330, 16, 'Lives: 3', {fontSize: "32px", fill: "#000"} )
  world.killsText = this.add.text(550, 16, 'Kills: 0', {fontSize: "32px", fill: "#000"} )




  /************************************************ 
  ***************** PLAYER ************************
  ************************************************/

  // spawn player
  const player = this.add.newPlayer(300, 400);

  // add player to world
  world.player = this.physics.add.existing(player);
  //let outside forces effect player
  player.body.immovable = false;
  player.body.setGravityY(500);
  
  // create water area


  /*
  var water = this.add.sprite(0,600, "water")
    .setOrigin(0);

  var river = water.animations.add("river");

  water.animatioins.play("river", 10, true);
  
  const lava = this.add.lava(0, 500, 800, 100, 0xffff00);
  lava.displayOriginX = 0;
  lava.displayOriginY = 0;
  */

 
  /************************************************ 
  ***************** PLATFORMS *********************
  ************************************************/
  
  // create platform group
  let platforms = this.physics.add.group({immovable: true, allowGravity: false, velocityX: -300, moves: false});

  //this.physics.world.enable(platforms);

  // create starting ground
  const startPlatform = this.add.ground(300 , 550, 800, 200, 0x33ff00);

  // set ground pivot to left of object
  startPlatform.displayOriginX = 0;

  //add platforms group to world
  world.ground = platforms;

  //add ground to platformGroup
  world.ground.add(startPlatform);

  //player to platforms collider
  this.physics.add.collider(player, platforms, function(player) {
    
    player.x -= worldScrollSpeed;
    player.jumpTimer = 0;
    
  });

  world.nextGap = Math.floor(Math.random() * (world.maxGap - world.minGap +1)) + world.minGap ;


  

  /************************************************ 
  ***************** ENEMY *********************
  ************************************************/

  let enemies = this.physics.add.group({immovable: false, allowGravity: true, velocityX: -300, moves: false});


  world.enemies = enemies;

  

  
  // spawn enemy
  const target = this.add.ball(
    Math.random() * width,
    Math.random() * height,
    30,
    30,
    0xff0000
  );
  
  target.collideWorlBounds = false;

  world.enemies.add(target);

  world.frontEnemy = world.enemies.children.entries[0];

  
  console.log(world.enemies);
  this.physics.add.collider(enemies, platforms, function(enemies) {
    //console.log("enemy ground collide");
    //enemies.x -= 5;
    //player.jumpTimer = 0;
    
  });
 /*
  world.target = this.physics.add.existing(target);
  target.body.setVelocityX(Math.random() * 1000);
  target.body.setVelocityY(Math.random() * 500);
  target.body.immovable = false;

  // enemy, ground collider
  this.physics.add.collider(target, world.ground, function(target) {
    //var velocity = target.body.velocity;

    //if (velocity.x === 0) velocity.x = 0.001;
    target.x -= worldScrollSpeed;
  });



  /************************************************ 
  ******************* WORLD ***********************
  ************************************************/

  // set walls
  //this.physics.world.setBounds(10, 10, width - 20, height - 20);

  this.rocks = this.add.tileSprite(0,0,width,height, "rocks")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);
};
