const world = require("../../world");
const Phaser = require("Phaser");
const { width, height } = require("../../constants");

module.exports = function update() {

    this.bg.tilePositionX += 0.5;
    this.bg.tilePositionY += 0.5;
    
    //world.text.setText("RUN & GUN! timer: " + this.timer);


    this.timer += 1;

    //console.log(this.timer);
};