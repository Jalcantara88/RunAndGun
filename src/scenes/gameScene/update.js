const world = require("../../world");
const Phaser = require("phaser");
const { width, height } = require("../../constants");
const { Game } = require("phaser");

//const ACCELERATION = 50;

module.exports = function update() {





  /************************************************ 
  ******************* WORLD ***********************
  ************************************************/



  // while alive, increase distance
  if (world.lives > 0) {
    world.distance += .1;
  }

  // end game if lives less than 1
  if (world.lives < 1) {
    // stop music
    this.bgMusic.stop();

    // start next scene
    this.scene.start("gameOver");
  }

  // update HUD text over time
  world.distanceText.setText("Distance: " + Math.round(world.distance));

  // update lives
  world.livesText.setText("Lives: " + world.lives);

  // update kills
  world.killsText.setText("kills: " + world.kills);

  // set background scroll speed off parallax bg
  this.sky.tilePositionX += 0.1;
  this.clouds.tilePositionX += 0.2;
  this.mountains.tilePositionX += 0.3;
  this.trees.tilePositionX += 1;
  this.rocks.tilePositionX += 3;

  // get keyboard inputs
  const cursors = this.input.keyboard.createCursorKeys();
  
  // pull specific keys from all keyboard inputs variable
  const { left, right, up, down } = cursors;

  // pull player from world.js
  const { player } = world;



  /************************************************ 
  ****************** CONTROLS *********************
  ************************************************/



  // on event: left arrow
  if (left.isDown) {


    if(player.anims.currentAnim.key !== 'leftWalk') {
      //console.log(this.anims);
      player.anims.play('leftWalk', false);
      console.log("going left");
    }

    player.left();
  }

  // on event: right arrow
  if (right.isDown) {

    if(player.anims.currentAnim.key !== 'rightWalk') {
      player.anims.play('rightWalk', false);
      console.log("going right");
    }

    player.right();
  }

  // on event: up arrow
  // while jumping
  if (up.isDown && player.isJumping) {
    player.jumpTimer += .1;
    if (player.jumpTimer < 3) {
      player.jump();
      player.acceleration -= .5;
    }
    if (player.jumpTimer === 3) {
      player.jumpTimer = 0
      player.isJumping = false;
    }
  }

  // start jump
  if (up.isDown && player.body.touching.down) {
    player.isJumping = true;
  }

  // release jump
  if(up.isUp) {
    player.isJumping = false;
    player.acceleration = 40;
  }
  
  // on event: land
  if (player.body.touching.down && left.isUp && right.isUp && up.isUp) {
    player.turn();
  }



  /************************************************ 
  ***************** KILL ZONES ********************
  ************************************************/

  // kill player
  if ((player.y > 500 || (player.x + player.width / 2) < 0) && player.active) {

    // remove a life
    world.lives -= 1;

    // play death sound
    world.die.play();

    // reset player position to top of screen
    player.setActive(false).setVisible(false);
    player.x = (width/2);
    player.y = 0;
    player.setActive(true).setVisible(true);
  }

  // kill enemy
  if ( world.frontEnemy) {
    if(world.frontEnemy.x < -20 || world.frontEnemy.y > 500) {
      world.enemies.children.entries.shift();
    }
  }
  
  // kill front enemy
  world.frontEnemy = world.enemies.children.entries[0];

  //create array from platform group
  let platformArray = world.ground.children.entries;
  
  //set front platform from array
  world.frontPlatform = platformArray[0];

  //set back platform from array
  world.backPlatform = platformArray[platformArray.length -1]

  //create destroy bounds based on width of front platform
  var outerLeft = (0 - world.frontPlatform.width);

  // remove front platform when reaching outer bounds
  if (world.frontPlatform.x < outerLeft) {
    world.ground.children.entries.shift();
  }



  /************************************************ 
  ***************** BIRTH ZONES *******************
  ************************************************/



  // when platform gap to game bounds reaches limit, create new platform and recalculate next random values
  if ((width - (world.backPlatform.x + world.backPlatform.width)) > world.nextGap) {

    // calculate next random gap
    world.nextGap = Math.floor(Math.random() * (world.maxGap - world.minGap +1)) + world.minGap;

    // calculate next random height
    var nextHeight = Math.floor(Math.random() * (world.maxHeight - world.minHeight +1)) + world.minHeight;

    // calculate next random width
    var nextWidth = Math.floor(Math.random() * (world.maxWidth - world.minWidth +1)) + world.minWidth;

    // create new platform with random values
    let newPlatform = this.add.image(width, nextHeight, "platform");
    newPlatform.width = nextWidth;
    newPlatform.displayWidth = nextWidth;

    // set ground pivot to left of object
    newPlatform.displayOriginX = 0;

    // add ground to platformGroup
    world.ground.add(newPlatform);

    // create new enemy and randomly place on new platform
    const newEnemy = this.add.ball((Math.random() * newPlatform.width) + width,
    (Math.random() * newPlatform.height) + 50);

    newEnemy.anims.play('enemyAnim', true);

    // add new enemy to group
    world.enemies.add(newEnemy);
  }



  /************************************************ 
  ****************** SHOOTING *********************
  ************************************************/



  // handle onclick shoot
  this.input.on("pointerdown", function (pointer) {
    
    if(!player.isShooting) {
      player.isShooting = true;
      player.shoot(pointer);
    }
    
  });

  // handle offclick shoot
  this.input.on("pointerup", function () {
    if(player.isShooting) {
      player.isShooting = false;
    }
  });

  // increment enemy shoot timer
  world.enemyShootTimer += .1;

  // enemy shoot when reaching timer limit
  if (world.enemyShootTimer > 8 && world.enemies.children.entries.length > 0){
    world.enemies.children.entries[0].shoot(player);

    // reset enemy shoot timer
    world.enemyShootTimer = 0;
  }



  /************************************************ 
  *************** SCROLL SPEED ********************
  ************************************************/


  
  //increment scroll speed as game persists
  world.scrollSpeed -= .1;

  // set ground velocity to new scroll speed
  world.ground.setVelocityX(world.scrollSpeed);

  // set enemy velocity to new scroll speed
  world.enemies.setVelocityX(world.scrollSpeed);



};
