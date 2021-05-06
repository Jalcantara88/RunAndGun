const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import creditsBG from '../../assets/creditsBG.png';
import menuBtn from '../../assets/menuBtn.png';
import bgMusic from '../../assets/music/gameplay.mp3';

module.exports = function preload() {



  /************************************************ 
  ******************* IMAGES **********************
  ************************************************/



    // preload background image to game
    this.load.image("bg", bg);

    // preload credits image
    this.load.image("creditsBG", creditsBG);

    // preload menu button
    this.load.image("menuBtn", menuBtn);

    // preload credits music
    this.load.audio("bgMusic", bgMusic);



};