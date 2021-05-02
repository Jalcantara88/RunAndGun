const Phaser = require("phaser");


class Lava extends Phaser.GameObjects.Rectangle {
    constructor(scene, ...args) {
        super(scene, ...args);
    }
    preUpdate() {
        
      }
    
}

Phaser.GameObjects.GameObjectFactory.register("lava", function (...args) {
    const lava = new Lava(this.scene, ...args);
  
    this.displayList.add(lava);
    this.updateList.add(lava);
  
    return lava;
  });
  