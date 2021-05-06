const world = require("../../world");
const Phaser = require("Phaser");
const { width, height } = require("../../constants");

module.exports = function update() {



  /************************************************ 
  ***************** BACKGROUND ********************
  ************************************************/
    

  
    // update background tile scroll
    this.bg.tilePositionX += 0.5;
    this.bg.tilePositionY += 0.5;



};