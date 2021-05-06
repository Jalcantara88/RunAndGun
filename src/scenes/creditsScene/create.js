const { Game } = require("phaser");
const world = require("../../world");
const { width, height } = require("../../constants");

module.exports = function create() {



  /************************************************ 
  ***************** BACKGROUND ********************
  ************************************************/



    // add background
    this.bg = this.add.tileSprite(0,0, width, height, "bg")
        .setOrigin(0)
        .setScrollFactor(1,1);

    // add credits
    this.creditsBG = this.add.sprite(0,0, "creditsBG")
        .setOrigin(0);



  /************************************************ 
  ******************* BUTTONS *********************
  ************************************************/



    // add menu button
    this.menuBtn = this.add.sprite(400,480, 'menuBtn').setInteractive();

    // go to title scene
    this.menuBtn.on('pointerdown', function(pointer) {
        this.bgMusic.stop();
        this.scene.start("title");
    }.bind(this)); 



  /************************************************ 
  ******************** MUSIC **********************
  ************************************************/



    // add and play background music
    this.bgMusic = this.sound.add('bgMusic', {volume: 0.3, loop: true});
    this.bgMusic.play();
    


};