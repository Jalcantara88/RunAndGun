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

    // add menu
    this.menuBG = this.add.sprite(0,0, "menuBG")
        .setOrigin(0);


  /************************************************ 
  ******************* MUSIC ***********************
  ************************************************/


    // add menu music
    this.menuMusic = this.sound.add('menuMusic', { volume: 0.5, loop: true });
    this.menuMusic.play();



  /************************************************ 
  ******************* IMAGES **********************
  ************************************************/



    // create dude run animation
    this.anims.create({
        key: "dudeRun",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("dudeRunRight", {start: 0, end: 3}),
        repeat: -1,
        });
  
    // add dude run sprite
    var dudeRun = this.add.sprite(500,100, "dudeRunRight")
    .setOrigin(0);

    // play dude run animation
    dudeRun.play("dudeRun");



  /************************************************ 
  ****************** BUTTONS **********************
  ************************************************/

    // add start button
    this.startButton = this.add.sprite(580,360, 'startBtn').setInteractive();

    // add credits button
    this.creditsButton = this.add.sprite(580,435, 'creditsBtn').setInteractive();


    // go to game scene
    this.startButton.on('pointerdown', function(pointer) {
        this.menuMusic.stop();
        this.scene.start("game");
    }.bind(this));

    // go to credits scene
    this.creditsButton.on('pointerdown', function(pointer) {
        this.menuMusic.stop();
        this.scene.start("credits");

    }.bind(this));
    
    
    
};