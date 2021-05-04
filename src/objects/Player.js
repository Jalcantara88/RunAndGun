const Phaser = require("phaser");
const world = require("../world");
//const { player } = require("../world");

const ACCELERATION = 40;
export default class Player extends Phaser.GameObjects.Sprite {
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
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    
      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });
    
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });
    
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
      this.body.collideWorldBounds = false;
      this.body.bounce.setTo(0, 0);
    }
  }

  // actions for on key presses being listened to in update
  left() {
    this.body.setVelocityX(-300);
    this.anims.play("left", true);
    //this.body.setVelocityX(this.body.velocity.x - ACCELERATION);
  }

  right() {
      if(this.body.touching.down){
        this.body.setVelocityX(500);
      }
      if(!this.body.touching.down){
        this.body.setVelocityX(200);
      }
      
      this.anims.play("right", true);
    //this.body.setVelocityX(this.body.velocity.x + ACCELERATION);
  }

  turn() {
    //let groundVelocity = world.ground.defaults.setVelocityX;
    //console.log("ground velocity " + groundVelocity);
    
    //this.body.setVelocityX(groundVelocity);
    this.body.setVelocityX(-120);
    //console.log("player velocity " + this.body.velocity.x);
    this.anims.play("turn");

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
    this.body.setVelocityY(-800 - ACCELERATION);
    //this.body.setVelocityY(this.body.velocity.y - ACCELERATION);
    //this.isJumping = true;
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

// export ball to game for use
Phaser.GameObjects.GameObjectFactory.register("newPlayer", function (x,y) {
  const newPlayer = new Player(this.scene, x,y);

  this.displayList.add(newPlayer);
  this.updateList.add(newPlayer);

  return newPlayer;
});
