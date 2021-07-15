const Phaser = require("phaser");
const world = require("../world");

const ACCELERATION = 40;
class Player extends Phaser.GameObjects.Sprite {
  // player varables
  constructor(scene, x, y) {
    super(scene, x, y, "dude");
    //config.scene.sdd.existing(this);
    this.initialized = false;
    //scene.add.existing(this);
    this.bulletsNum = 0;
    this.maxBullets = 3;
    this.isShooting = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.acceleration = 40; 
    this.onGround = false;

  }

  // For some reason, Phaser needs this empty method.
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (!this.initialized) {
      this.body.collideWorldBounds = false;
      this.body.bounce.setTo(0, 0);
    }
  }

  // actions for on key presses being listened to in update
  left() {
    this.body.setVelocityX(-500);
  }

  right() {
      if(this.body.touching.down){
        this.body.setVelocityX(500);
      }
      if(!this.body.touching.down){
        this.body.setVelocityX(200);
      }
  }

  turn() {
    this.anims.play("turn", true);
  }

  jump() {
    //world.jump.play();
    this.y -= 5;
    this.body.setVelocityY(this.body.velocity.y - this.acceleration);
  }

  shoot(target) {
    if(this.bulletsNum < this.maxBullets) {
      const bullet = this.scene.add.bullet(this, target);
      world.shoot.play();
      world.bullets.add(bullet)
      this.bulletsNum++;
    }
    
  }
}

// export ball to game for use
Phaser.GameObjects.GameObjectFactory.register("newPlayer", function (x,y) {
  const newPlayer = new Player(this.scene, x,y);

  this.displayList.add(newPlayer);
  this.updateList.add(newPlayer);

  return newPlayer;
});
