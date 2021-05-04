const { Game } = require("phaser");



module.exports = function create() {

    this.bg = this.add.sprite(0,0,"bg")
        .setOrigin(0)
        .setScrollFactor(0,1);

    this.timer = 0;

    var text = this.add.text(400, 300, "RUN & GUN! timer: " + this.timer, {fontSize: "62px", fill: "#000"});
    text.setOrigin(0.5, 0.5);
    
    
};