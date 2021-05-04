const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import dude from '../../assets/dude.png';


module.exports = function preload() {

    // preload background image to game
    this.load.image("bg", bg);

    this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48});

    
};