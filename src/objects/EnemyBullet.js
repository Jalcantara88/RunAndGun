const Phaser = require("phaser");
const world = require("../world");


const LIFESPAN = 1000;
const SPEED = 800;
class enemyBullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, player, pointer) {
    super(scene, player.x, player.y, 10, 10, 0xf35a2c);

    this.pointer = pointer;
    this.initialized = false;

    setTimeout(() => {
      this.destroy();
      world.enemyBulletsNum--;
    }, LIFESPAN);
    scene.add.existing(this);
  }

  // For some reason, Phaser needs this empty method.
  preUpdate() {
    if (!this.initialized) {
      this.scene.physics.moveToObject(this, this.pointer, SPEED);
      this.initialized = true;    
    }
  }
}

// export bullet for use in game
Phaser.GameObjects.GameObjectFactory.register("enemyBullet", function (...args) {
  const ebullet = new enemyBullet(this.scene, ...args);

  this.displayList.add(ebullet);
  this.updateList.add(ebullet);

  return ebullet;
});