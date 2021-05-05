const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import gameOverBG from '../../assets/gameOverBG.png';
import replayBtn from '../../assets/replayBtn.png';
import menuBtn from '../../assets/menuBtn.png';
import gameOverMusic from '../../assets/music/gameover.mp3';

module.exports = function preload() {

    // preload background image to game
    this.load.image("bg", bg);

    this.load.image("replayBtn", replayBtn);

    this.load.image("gameOverBG", gameOverBG);

    this.load.image("menuBtn", menuBtn);

    this.load.audio("gameOverMusic", gameOverMusic);


    //this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48});

    //this.load.audio("menuMusic", menuMusic);
};