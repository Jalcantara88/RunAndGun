const { Game } = require("phaser");
const world = require("../../world");
const { width, height } = require("../../constants");

module.exports = function create() {



  /************************************************ 
  ******************* MUSIC ***********************
  ************************************************/



    this.gameOverMusic = this.sound.add('gameOverMusic', { volume: 0.5, loop: true });
    this.gameOverMusic.play();



  /************************************************ 
  ***************** BACKGROUND *******************
  ************************************************/



    this.bg = this.add.tileSprite(0,0, width, height, "bg")
    .setOrigin(0)
    .setScrollFactor(1,1);

    this.menuBG = this.add.sprite(0,0, "gameOverBG")
    .setOrigin(0);



  /************************************************ 
  ****************** BUTTONS **********************
  ************************************************/


    // add replay button
    this.replayBtn = this.add.sprite( 250, 450, "replayBtn" ).setInteractive();

    // add menu button
    this.menuBtn = this.add.sprite( 550, 450, "menuBtn" ).setInteractive();

    // change to game scene 
    this.replayBtn.on('pointerdown', function(pointer) {
        this.gameOverMusic.stop();
        this.scene.start("game");
    }.bind(this));

    //change to title scene
    this.menuBtn.on('pointerdown', function(pointer){
        this.gameOverMusic.stop();
        this.scene.start("title");
    }.bind(this));



  /************************************************ 
  ****************** RESULTS **********************
  ************************************************/



    // show distance score
    this.distanceText = this.add.text(500,270, Math.round(world.distance), {fontSize: '35px', fill: '#000'});

    // show skills score
    this.killsText = this.add.text(500, 340, world.kills, {fontSize: '35px', fill: '#000'});


    
};