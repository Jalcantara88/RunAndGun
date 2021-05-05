const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import dudeRunRight from '../../assets/dudeRunRight.png';
import menuBG from '../../assets/menuBG.png';
import startBtn from '../../assets/startBtn.png';
import creditsBtn from '../../assets/creditsBtn.png';
import menuMusic from '../../assets/music/menu.mp3';

module.exports = function preload() {

    // preload background image to game
    this.load.image("bg", bg);

    this.load.spritesheet("dudeRunRight", dudeRunRight, { frameWidth: 160, frameHeight: 240});

    this.load.image("menuBG", menuBG);

    this.load.image("startBtn", startBtn);

    this.load.image("creditsBtn", creditsBtn);

    this.load.audio("menuMusic", menuMusic);
};