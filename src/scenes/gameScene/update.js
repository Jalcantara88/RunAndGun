const world = require("../../world");
const Phaser = require("Phaser");
const { width, height } = require("../../constants");

//const ACCELERATION = 50;

module.exports = function update() {
  //score increase over time while game is active
  if (world.isAlive) {
    world.distance += .1;
  }

  // update HUD text over time
  world.distanceText.setText("Distance: " + Math.round(world.distance));

  world.livesText.setText("Lives: " + world.lives);

  world.killsText.setText("kills: " + world.kills);


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

  // key press listeners

  // on event: left arrow
  if (left.isDown) {
    player.left();
  }

  // on event: right arrow
  if (right.isDown) {
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
    //player.jumpTimer += .1;
    player.isJumping = true;
    //player.touchingDown();
    //player.jump();
  }
  // release jump
  if(up.isUp) {
    player.isJumping = false;
    player.acceleration = 40;
  }
  
  // on event: land
  if (player.body.touching.down && left.isUp && right.isUp && up.isUp) {
    //console.log(world.ground);
    player.turn();
    //player.jumpTimer = 0;
    //debugger;
  }

  // lava death bounds
  if ((player.y > 500 || (player.x + player.width / 2) < 0) && player.active) {
    //player.destroy();
    player.setActive(false).setVisible(false);
    console.log("you Died in Lava");
    player.x = (width/2);
    player.y = 0;
    player.setActive(true).setVisible(true);
    world.ground.velocityX = -300;

    world.lives -= 1;
  }

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
    //ground.destroy();
    console.log("ground destroyed");
  }

  // when platform gap to game bounds reaches limit, create new platform and recalculate next random values
  if ( (width - (world.backPlatform.x + world.backPlatform.width)) > world.nextGap) {
    world.nextGap = Math.floor(Math.random() * (world.maxGap - world.minGap +1)) + world.minGap ;


    var nextHeight = Math.floor(Math.random() * (world.maxHeight - world.minHeight +1)) + world.minHeight;
    //console.log("next height is " + nextHeight);

    var nextWidth = Math.floor(Math.random() * (world.maxWidth - world.minWidth +1)) + world.minWidth;
    //console.log("next width is " + nextWidth);
    //console.log("next gap is " + nextGap);

    //world.ground.children.entries[world.ground.children.entries.length] = this.add.ground(300 , 550, 800, 200, 0x33ff00);
    let newPlatform = this.add.ground(width , nextHeight, nextWidth, 100, 0x33ff00);

     // set ground pivot to left of object
    newPlatform.displayOriginX = 0;

    //add ground to platformGroup
    world.ground.add(newPlatform);

    //console.log(world.ground.children.entries);

    //world.currentGap = 0;
    //debugger;
    //world.randomCalc = false;
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
