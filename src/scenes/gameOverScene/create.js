const { Game } = require("phaser");
const world = require("../../world");
const { width, height } = require("../../constants");



module.exports = function create() {

    this.gameOverMusic = this.sound.add('gameOverMusic', { volume: 0.5, loop: true });
    this.gameOverMusic.play();

    this.bg = this.add.tileSprite(0,0, width, height, "bg")
    .setOrigin(0)
    .setScrollFactor(1,1);

    this.menuBG = this.add.sprite(0,0, "gameOverBG")
    .setOrigin(0);

    //world.text = this.add.text(400, 300, "GameOver", {fontSize: "62px", fill: "#fff"})
    //.setOrigin(0.5, 0.5);

    this.replayBtn = this.add.sprite( 250, 450, "replayBtn" ).setInteractive();

    this.menuBtn = this.add.sprite( 550, 450, "menuBtn" ).setInteractive();
    //this.replayButton.setOrigin(0.5,0.5);
    //this.centerButton(this.gameButton, 1);

    this.distanceText = this.add.text(500,270, Math.round(world.distance), {fontSize: '35px', fill: '#000'});

    this.killsText = this.add.text(500, 340, world.kills, {fontSize: '35px', fill: '#000'})
    //.setOrigin(0.5,0.5);
    //this.centerButtonText(this.gameText, this.gameButton);

    //this.menuMusic = this.sound.add('menuMusic', { volume: 0.5, loop: true });
    //this.menuMusic.play();

    this.replayBtn.on('pointerdown', function(pointer) {
        //this.menuMusic.stop();
        //this.scene.remove("gameOver");
        this.gameOverMusic.stop();
        this.scene.start("game");
    }.bind(this));

    this.menuBtn.on('pointerdown', function(pointer){
        //this.scene.remove("gameOver");
        this.gameOverMusic.stop();
        this.scene.start("title");
    }.bind(this));
    
    
    
};