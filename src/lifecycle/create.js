const world = require("../world");
const { width, height } = require("../constants");

module.exports = function create() {

  this.background = this.add.tileSprite(0,0,width,height, "background")
    .setOrigin(0)
    .setScrollFactor(0,1);

  
  // spawn player
  const player = this.add.ball(300, 400, 30, 30, 0xffffff);
  world.player = this.physics.add.existing(player);
  player.body.immovable = false;
  player.body.setGravityY(300);
  //player.pushable(true);

  var groundArray = [];

  const lava = this.add.lava(0, 500, 800, 100, 0xffff00);
  lava.displayOriginX = 0;
  lava.displayOriginY = 0;

  //console.log(world.width);

  const ground = this.add.ground(300 , 550, 300, 200, 0x33ff00);
  
  ground.displayOriginX = 0;
  world.ground = this.physics.add.existing(ground);
  //ground.setPushable(false);
  ground.body.immovable = true;
  ground.body.allowGravity = false;

  this.physics.add.collider(player, ground, function(player) {
    player.x -= 3;
    //player.isJumping = false;
  });
  

  // set target
  const target = this.add.ball(
    Math.random() * width,
    Math.random() * height,
    30,
    30,
    0xff0000
  );

  world.target = this.physics.add.existing(target);
  target.body.setVelocityX(Math.random() * 1000);
  target.body.setVelocityY(Math.random() * 500);
  target.body.setImmovable(false);

  this.physics.add.collider(target, ground);

  //world.ground - this.physics.add.existing(ground);
  //ground.body.setVelocityX(Math.random() * 1000);
  //ground.body.setVelocityY(Math.random() * 500);

  // set walls
  this.physics.world.setBounds(0, 0, width, height);
};
