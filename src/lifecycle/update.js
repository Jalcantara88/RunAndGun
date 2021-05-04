const world = require("../world");
const Phaser = require("Phaser");
const { width, height } = require("../constants");

//const ACCELERATION = 50;

module.exports = function update() {
  //score increase over time
  world.score += .1;
  world.scoreText.setText("Score: " + Math.round(world.score));

  // set background scroll speed
  this.background.tilePositionX += 0.5;

  // get keyboard inputs
  const cursors = this.input.keyboard.createCursorKeys();
  
  //pull specific keys from all keyboard inputs variable
  const { left, right, up, down } = cursors;

  //pull variables from world.js
  const { player } = world;
  const { ground } = world;
  const { worldScrollSpeed } = world;

  // outer bounds variable
  

  // key press listeners
  if (left.isDown) {
    player.left();
  }

  if (right.isDown) {
    player.right();
  }

  if (up.isDown && player.body.touching.down) {
    player.jumpTimer += .1;
    if(player.jumpTimer < 50) {
    //player.touchingDown();
    player.jump();
    }
  }

  if (player.body.touching.down && left.isUp && right.isUp && up.isUp) {
    //console.log(world.ground);
    player.turn();
    //debugger;
  }

  /*
  if (up.isDown) {
    player.jumpTimer += .1;
    if(player.jumpTimer < 3) {
    player.jump();
  }
  */
    /*
    player.timer = this.time.addEvent({
      delay: 50,
      callback: player.tick,
      callbackScope: player,
      loop: true
    });
    
    
    //player.isJumping = true;
  }
  */

  /*
  if(up.isUp) {
    //player.jumpTimer = 0;
    //player.endJump();
  }

  
  
  if (down.isDown) {
    player.down();
  }

  if (player.body.collideWorldBounds) {
    
  }
  */


  // lava death bounds
  if ((player.y > 500 || (player.x + player.width / 2) < 0) && player.active) {
    //player.destroy();
    player.setActive(false).setVisible(false);
    console.log("you Died in Lava");
    player.x = (width/2);
    player.y = 0;
    player.setActive(true).setVisible(true);
    world.ground.velocityX = -300;
  }
  
  // ground platforms move speed
  
  //world.ground.x -= worldScrollSpeed;

  let platformArray = world.ground.children.entries;
  
  //world.frontPlatform = world.ground.children.entries[0];
  world.frontPlatform = platformArray[0];

  world.backPlatform = platformArray[platformArray.length -1]

  var outerLeft = (0 - world.frontPlatform.width);

  
  

  // move ground platforms back to start on reaching outer bounds
  if (world.frontPlatform.x < outerLeft) {
    world.ground.children.entries.shift();
    //ground.destroy();
    //ground.x = width ;
    //ground.setActive(false).setVisible(false);
    console.log("ground destroyed");
  }



  if((world.backPlatform.x + world.backPlatform.width) < width) {
    world.currentGap = (width - (world.backPlatform.x + world.backPlatform.width));
    console.log(world.currentGap);

  }
  

  if ( world.currentGap > 100) {
    //world.ground.children.entries[world.ground.children.entries.length] = this.add.ground(300 , 550, 800, 200, 0x33ff00);
    let newPlatform = this.add.ground(width , 550, 800, 200, 0x33ff00);

     // set ground pivot to left of object
    newPlatform.displayOriginX = 0;

    //add ground to platformGroup
    world.ground.add(newPlatform);

    console.log(world.ground.children.entries);

    world.currentGap = 0;
    //debugger;
  }

  // handle onclick shoot
  this.input.on("pointerdown", function (pointer) {
    
    if(!player.isShooting) {
      player.isShooting = true;
      player.shoot(pointer);
      
    }
    
  });

  // handle offclick shoot
  this.input.on("pointerup", function (pointer) {
    if(player.isShooting) {
      player.isShooting = false;
      
    }
    
  });



  
};
