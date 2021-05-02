const world = require("../world");
const Phaser = require("Phaser");
const { width, height } = require("../constants");

//const ACCELERATION = 50;

module.exports = function update() {
  this.background.tilePositionX += 0.5;

  const cursors = this.input.keyboard.createCursorKeys();

  const { left, right, up, down } = cursors;
  const { player } = world;
  const { ground } = world;
  const { worldScrollSpeed } = world;

  var outerLeft = (0 - ground.width);

  if (left.isDown) {
    player.left();
  }

  if (right.isDown) {
    player.right();
  }

  if (up.isDown && !player.isJumping) {
    player.up();
    player.isJumping = true;
  }

  if (down.isDown) {
    player.down();
  }

  if (player.body.collideWorldBounds) {
    player.isJumping = false;
  }
 
  if (player.y > 500 && player.active) {
    //player.destroy();
    player.setActive(false).setVisible(false);
    console.log("you Died in Lava");
    player.x = (width/2);
    player.y = 0;
    player.setActive(true).setVisible(true);
  }
  

  if (ground.active) {
    ground.x -= worldScrollSpeed;
    //console.log(ground.x);
  }

  if (ground.x < outerLeft && ground.active) {
    //ground.destroy();
    ground.x = width ;
    //ground.setActive(false).setVisible(false);
    console.log("ground destroyed");
    //console.log(ground);
    
  }

  this.input.on("pointerdown", function (pointer) {
    
    if(!player.isShooting) {
      player.isShooting = true;
      player.shoot(pointer);
      
    }
    
  });

  this.input.on("pointerup", function (pointer) {
    if(player.isShooting) {
      player.isShooting = false;
      
    }
    
  })

  
};
