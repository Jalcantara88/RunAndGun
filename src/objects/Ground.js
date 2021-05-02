const Phaser = require("phaser");


class Ground extends Phaser.GameObjects.Rectangle {
    constructor(scene, ...args) {
        super(scene, ...args);
    }
    preUpdate() {
        
      }
    
}

Phaser.GameObjects.GameObjectFactory.register("ground", function (...args) {
    const ground = new Ground(this.scene, ...args);
  
    this.displayList.add(ground);
    this.updateList.add(ground);
  
    return ground;
  });
  
