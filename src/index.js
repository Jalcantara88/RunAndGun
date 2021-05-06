const Phaser = require("phaser");

import titleScene from './scenes/titleScene/index';
import creditsScene from './scenes/creditsScene/index';
import gameOverScene from './scenes/gameOverScene/index';
import gameScene from './scenes/gameScene/index';

// factories
require("./objects/Ball.js");
require("./objects/Bullet.js");
require("./objects/Player.js");
require("./objects/EnemyBullet.js");

// constants
const { width, height } = require("./constants");

// game config 
var config = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fps: 60,
      gravity: {
        y: 1000,
      },
    },
  },
};

// create Phaser game
var game = new Phaser.Game(config);

// add scenes to Phaser game
game.scene.add("title", titleScene);
game.scene.add("game", gameScene);
game.scene.add("gameOver", gameOverScene);
game.scene.add("credits", creditsScene);

//set Phaser game starting scene
game.scene.start("title");
