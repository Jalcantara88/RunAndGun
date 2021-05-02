const Phaser = require("phaser");
//const { player } = require("../world");

const ACCELERATION = 40;
class Ball extends Phaser.GameObjects.Ellipse {
  constructor(scene, ...args) {
    super(scene, ...args);
    this.initialized = false;
    scene.add.existing(this);
    this.bulletsNum = 0;
    this.maxBullets = 3;
    this.isShooting = false;
    this.isJumping = false;
  }

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.body.collideWorldBounds = true;
      this.body.bounce.setTo(0, 0);
    }
  }

  left() {
    this.body.setVelocityX(this.body.velocity.x - ACCELERATION);
  }

  right() {
    this.body.setVelocityX(this.body.velocity.x + ACCELERATION);
  }

  up() {
    this.body.setVelocityY(this.body.velocity.y - ACCELERATION);
  }

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

Phaser.GameObjects.GameObjectFactory.register("ball", function (...args) {
  const ball = new Ball(this.scene, ...args);

  this.displayList.add(ball);
  this.updateList.add(ball);

  return ball;
});
