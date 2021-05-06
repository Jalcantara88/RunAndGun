import bg from '../../assets/bg.png';
import gameOverBG from '../../assets/gameOverBG.png';
import replayBtn from '../../assets/replayBtn.png';
import menuBtn from '../../assets/menuBtn.png';
import gameOverMusic from '../../assets/music/gameover.mp3';

module.exports = function preload() {



  /************************************************ 
  ****************** IMAGES ***********************
  ************************************************/



    // preload background image to game
    this.load.image("bg", bg);

    // preload replay button
    this.load.image("replayBtn", replayBtn);

    // preload game over image
    this.load.image("gameOverBG", gameOverBG);

    // preload menu button
    this.load.image("menuBtn", menuBtn);



  /************************************************ 
  ******************* MUSIC ***********************
  ************************************************/


  
    // preload game over music
    this.load.audio("gameOverMusic", gameOverMusic);



};