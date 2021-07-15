const Phaser = require("phaser");
const world = require("../world");

const ACCELERATION = 40;
class Ball extends Phaser.GameObjects.Sprite {
  // ball varables
  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    this.initialized = false;
    this.maxBullets = 3; 
  }

  // For some reason, Phaser needs this empty method.
  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    if (!this.initialized) {
      //this.body.collideWorldBounds = true;
      //this.body.bounce.setTo(0, 0);
    }
  }

  // actions for on key presses being listened to in update
  left() {
    this.body.x += 1;
  }

  right() {
    this.body.setVelocityX(this.body.velocity.x + ACCELERATION);
  }


  down() {
    this.body.setVelocityY(this.body.velocity.y + ACCELERATION);
  }

  shoot(target) {
    if(world.enemyBulletsNum < this.maxBullets) {
      const bullet = this.scene.add.enemyBullet(this, target);
      world.shoot.play();
      world.enemyBullets.add(bullet)
      this.bulletsNum++;
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
