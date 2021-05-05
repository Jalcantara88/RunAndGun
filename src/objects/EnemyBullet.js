const Phaser = require("phaser");
//const { player } = require("../world");

const LIFESPAN = 1000;
const SPEED = 1500;
class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, player, pointer) {
    super(scene, player.x, player.y, 10, 10, 0xff0000);

    this.pointer = pointer;
    this.initialized = false;

    setTimeout(() => {
      this.destroy();
      player.bulletsNum--;
    }, LIFESPAN);
    scene.add.existing(this);
  }

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.scene.physics.moveToObject(this, this.pointer, SPEED);
      //this.body.collideWorldBounds = true;
      //this.body.bounce.setTo(0.9, 0.9);
      this.initialized = true;
      
    }
  }
}

// export bullet for use in game
Phaser.GameObjects.GameObjectFactory.register("bullet", function (...args) {
  const bullet = new Bullet(this.scene, ...args);

  this.displayList.add(bullet);
  this.updateList.add(bullet);

  return bullet;
});