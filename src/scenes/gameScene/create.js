const world = require("../../world");
const { width, height } = require("../../constants");
const { worldScrollSpeed } = require("../../world");

//import "../../objects/Player.js";

module.exports = function create() {



  /************************************************ 
  ************* RESET WORLD VALUES ****************
  ************************************************/



  world.lives = 3;
  world.kills = 0;
  world.distance = 0;
  world.player = undefined;
  world.ground = undefined;
  world.enemies = undefined;
  world.frontEnemy = undefined;
  world.frontPlatform = undefined;
  world.enemyShootTimer = 0;
  world.scrollSpeed = -300;



  /************************************************ 
  ***************** BG MUSIC **********************
  ************************************************/



  this.bgMusic = this.sound.add('bgMusic', { volume: 0.3, loop: true });
  this.bgMusic.play();


  world.jump = this.sound.add('jump', { volume: 0.5, loop: false });

  world.die = this.sound.add('die', { volume: 0.5, loop: false });

  world.kill = this.sound.add('kill', { volume: 0.5, loop: false });

  world.shoot = this.sound.add('shoot', { volume: 0.5, loop: false });



  /************************************************ 
  ***************** BACKGROUND ********************
  ************************************************/



  // Create Background 
  this.sky = this.add.tileSprite(0,0,width,height, "sky")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);

  /// add clouds
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

  // create stream animations
  this.anims.create({
    key: "stream",
    frameRate: 7,
    frames: this.anims.generateFrameNumbers("water", {start: 0, end: 3}),
    repeat: -1,
  });

  // add water sprite
  var water = this.add.sprite(0,400, "water")
    .setOrigin(0);

  water.play("stream");


  
  /************************************************ 
  ***************** SCORE *************************
  ************************************************/  



  world.distanceText = this.add.text(16,16, 'Distance: 0', {fontSize: "32px", fill: "#000"});
  world.livesText = this.add.text(330, 16, 'Lives: 3', {fontSize: "32px", fill: "#000"} );
  world.killsText = this.add.text(550, 16, 'Kills: 0', {fontSize: "32px", fill: "#000"} );



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
  player.body.setFriction(1);

  // create left walk animation
  this.anims.create({
    key: 'leftWalk',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 5,
    repeat: -1
  });

  // create turn animation
  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  // create right animation
  this.anims.create({
      key: 'rightWalk',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1
  });

  // create enemy animation
  this.anims.create({
    key: 'enemyAnim',
    frames: this.anims.generateFrameNumbers('enemy',  { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });


 
  /************************************************ 
  ***************** PLATFORMS *********************
  ************************************************/


  
  // create platform group
  let platforms = this.physics.add.group({immovable: true, allowGravity: false, velocityX: world.scrollSpeed, moves: false});

  // create starting ground
  const startPlatform = this.add.image(300, 500, "platform");
  // const startPlatform = this.add.ground(300 , 550, 800, 200, 0x33ff00);

  // set ground pivot to left of object
  startPlatform.displayOriginX = 0;

  // add platforms group to world
  world.ground = platforms;

  // add ground to platformGroup
  world.ground.add(startPlatform);

  // player to platforms collider
  this.physics.add.collider(player, platforms, function(player) {
    
    player.x -= 3;
    player.jumpTimer = 0;
    
  });

  // calculate next gap
  world.nextGap = Math.floor(Math.random() * (world.maxGap - world.minGap +1)) + world.minGap ;



  /************************************************ 
  ***************** ENEMY *************************
  ************************************************/



  // create enemies physics group
  let enemies = this.physics.add.group({immovable: false, allowGravity: true, velocityX: world.scrollSpeed, moves: false, frictionX: 1});

  // creaet bullets physics group
  let bullets = this.physics.add.group({immovable: false, allowGravity: true});

  // link bullets group to world
  world.bullets = bullets;

  // link enemies group to world
  world.enemies = enemies;

  // spawn enemy
  const target = this.add.ball(700,300);

  target.anims.play('enemyAnim');
  /*
  const target = this.add.ball(
    700,
    300,
    30,
    30,
    0xff0000
  );
  */

  // exclude enemy from world bounds
  target.collideWorlBounds = false;

  // add enemy to enemy group
  world.enemies.add(target);

  // select front enemy from group
  world.frontEnemy = world.enemies.children.entries[0];
  
  //console.log(world.enemies);
  this.physics.add.collider(enemies, platforms, function() {
  });

  // bullet and enemy collider
  this.physics.add.overlap(bullets, enemies, hitEnemies, null, this );

  // handle hit enemy
  function hitEnemies (bullet, enemy) {
    world.kill.play();
    bullet.destroy();
    enemy.destroy();
    world.kills += 1;
    //console.log("enemy destroyed");
  }

  // player and enemy collider
  this.physics.add.overlap(player, enemies, function(player) {
    world.die.play();
    player.setActive(false).setVisible(false);
    //console.log("you Died");
    world.lives -=1;
    player.x = (width/2);
    player.y = -100;
    player.setActive(true).setVisible(true);
  }, null, this );

  // player and enemy bullet collider
  this.physics.add.overlap(world.enemyBullets, player, function(player) {
    world.die.play();
    player.setActive(false).setVisible(false);
    //console.log("you Died");
    world.lives -=1;
    player.x = (width/2);
    player.y = -100;
    player.setActive(true).setVisible(true);
  }, null, this );

  // enemy and platforms collider --- not working
  this.physics.add.collider(enemies, platforms, function() {
    console.log("collision detected");
  }, null, this);

  // enemy platform patrol --- not working
  function patrolPlatform(enemy, platform) {
    console.log(enemy);
    console.log(platform);
    if(enemy.body.velocity.x > 0 && enemy.right > platform.right) {
      enemy.body.velocity.x *= -1;
      console.log("turning around enemy");
    }
    else if (enemy.body.velocity.x < 0 && enemy.left < platform.left) {
      enemy.body.velocity.x *= -1;
      console.log("turning around enemy");
    }
  }



  /************************************************ 
  ******************* WORLD ***********************
  ************************************************/



  // set walls
  //this.physics.world.setBounds(10, 10, width - 20, height - 20);

  // add front scrolling rocks
  this.rocks = this.add.tileSprite(0,0,width,height, "rocks")
  // set its origin
  .setOrigin(0)
  // set which way it scrolls
  .setScrollFactor(0,1);



};
