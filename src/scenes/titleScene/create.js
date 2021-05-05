const { Game } = require("phaser");



module.exports = function create() {

    this.bg = this.add.sprite(0,0,"bg")
        .setOrigin(0)
        .setScrollFactor(0,1);

    this.timer = 0;

    var text = this.add.text(400, 300, "RUN & GUN! timer: " + this.timer, {fontSize: "62px", fill: "#000"});
    text.setOrigin(0.5, 0.5);

    this.gameButton = this.add.sprite(100,200, 'bg').setInteractive();
    //this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(100,200, 'Play', {fontSize: '32px', fill: '#fff'});
    //this.centerButtonText(this.gameText, this.gameButton);

    this.menuMusic = this.sound.add('menuMusic', { volume: 0.5, loop: true });
    this.menuMusic.play();

    this.gameButton.on('pointerdown', function(pointer) {
        this.menuMusic.stop();
        this.scene.start("game");
    }.bind(this));


    
    
    
};