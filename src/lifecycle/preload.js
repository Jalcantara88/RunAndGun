const { Game } = require("phaser");
import bg from '../assets/bg.png';


module.exports = function preload() {
    this.load.image("background", bg);
};
