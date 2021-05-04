const world = require("../../world");
const Phaser = require("Phaser");
const { width, height } = require("../../constants");

module.exports = function update() {

    this.bg.tilePositionX += 0.5;
    //this.bg.tilePositionY += 0.5;

    this.timer += 1;
};