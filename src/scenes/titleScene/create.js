const { Game } = require("phaser");
const world = require("../../world");
const { width, height } = require("../../constants");




module.exports = function create() {

    this.bg = this.add.tileSprite(0,0, width, height, "bg")
        .setOrigin(0)
        .setScrollFactor(1,1);

    this.timer = 0;

    this.menuBG = this.add.sprite(0,0, "menuBG")
        .setOrigin(0);

    this.anims.create({
        key: "dudeRun",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("dudeRunRight", {start: 0, end: 3}),
        repeat: -1,
        });
    
        var dudeRun = this.add.sprite(500,100, "dudeRunRight")
        .setOrigin(0);
    
        dudeRun.play("dudeRun");

    //world.text = this.add.text(400, 300, "RUN & GUN! timer: " + this.timer, {fontSize: "62px", fill: "#000"})
    //.setOrigin(0.5, 0.5);

    this.startButton = this.add.sprite(580,360, 'startBtn').setInteractive();
    //this.centerButton(this.gameButton, 1);

    this.creditsButton = this.add.sprite(580,435, 'creditsBtn').setInteractive();

    //this.gameText = this.add.text(100,200, 'Play', {fontSize: '32px', fill: '#fff'});
    //this.centerButtonText(this.gameText, this.gameButton);

    this.menuMusic = this.sound.add('menuMusic', { volume: 0.5, loop: true });
    this.menuMusic.play();

    this.startButton.on('pointerdown', function(pointer) {
        this.menuMusic.stop();
        //this.scene.remove("title");
        this.scene.start("game");
    }.bind(this));

    this.creditsButton.on('pointerdown', function(pointer) {

    }.bind(this));
    
    
    
};