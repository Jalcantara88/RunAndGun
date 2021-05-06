const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import dudeRunRight from '../../assets/dudeRunRight.png';
import menuBG from '../../assets/menuBG.png';
import startBtn from '../../assets/startBtn.png';
import creditsBtn from '../../assets/creditsBtn.png';
import menuMusic from '../../assets/music/menu.mp3';

module.exports = function preload() {



  /************************************************ 
  ******************* IMAGES **********************
  ************************************************/

    // preload background image to game
    this.load.image("bg", bg);

    // preload dude run spritesheet
    this.load.spritesheet("dudeRunRight", dudeRunRight, { frameWidth: 160, frameHeight: 240});

    // preload menu
    this.load.image("menuBG", menuBG);



  /************************************************ 
  ******************* BUTTONS *********************
  ************************************************/



    //preload start button
    this.load.image("startBtn", startBtn);

    //preload credits button
    this.load.image("creditsBtn", creditsBtn);



  /************************************************ 
  ***************** MUSIC ********************
  ************************************************/    


  
    this.load.audio("menuMusic", menuMusic);



};