const Phaser = require("phaser");
//const { player } = require("../world");

const ACCELERATION = 40;
class Ball extends Phaser.GameObjects.Ellipse {
  // ball varables
  constructor(scene, ...args) {
    super(scene, ...args);
    this.initialized = false;
    scene.add.existing(this);
    this.bulletsNum = 0;
    this.maxBullets = 3;
    this.isShooting = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    
  }

  /*
  tick() {
    if (this.power < 1) {
      this.body.setVelocityY(this.body.velocity.y - ACCELERATION);
      //this.power += .1;
      //console.log(this.power);
    }
  }
  */

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.body.collideWorldBounds = true;
      this.body.bounce.setTo(0, 0);
    }
  }

  // actions for on key presses being listened to in update
  left() {
    this.body.x += 1;
    //this.body.setVelocityX(this.body.velocity.x - ACCELERATION);
  }

  right() {
    this.body.setVelocityX(this.body.velocity.x + ACCELERATION);
  }

  jump() {
    /*
    this.timer = Phaser.Time.TimerEventConfig({
      delay: 50,
      callback: this.tick,
      callbackScope: this,
      loop: true 
    })
    */
    this.body.setVelocityY(this.body.velocity.y - ACCELERATION);
    //this.isJumping = true;
  }
/*
  endJump() {
    if (this.timer) {
      this.timer.remove();
      this.body.setVelocityY(this.power * 100);
      this.power = 0;
    }
    
  }
  */

  down() {
    this.body.setVelocityY(this.body.velocity.y + ACCELERATION);
  }

  shoot(target) {
    if(this.bulletsNum < this.maxBullets) {
      const bullet = this.scene.add.bullet(this, target);
      this.scene.physics.add.existing(bullet);
      this.bulletsNum++;
      // const bullet = this.scene.add.bullet(this.x, this.y, x, y);
    }
    
  }
}

// export ball to game for use
Phaser.GameObjects.GameObjectFactory.register("ball", function (...args) {
  const ball = new Ball(this.scene, ...args);

  this.displayList.add(ball);
  this.updateList.add(ball);

  return ball;
});
