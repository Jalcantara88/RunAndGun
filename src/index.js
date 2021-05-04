const Phaser = require("phaser");
// load gameScene
const gameSceneCreate = require("./scenes/gameScene/create");
const gameScenePreload = require("./scenes/gameScene/preload");
const gameSceneUpdate = require("./scenes/gameScene/update");

// factories
require("./objects/Ball.js");
require("./objects/Bullet.js");
require("./objects/Ground.js");
require("./objects/Lava.js");

// constants
const { width, height } = require("./constants");


//create scenes
var gameScene = new Phaser.Scene("game");
var titleScene = new Phaser.Scene("title");

// add scene files to gameScene
gameScene.preload = gameScenePreload;
gameScene.create = gameSceneCreate;
gameScene.update = gameSceneUpdate;


// game config 
var config = {
  type: Phaser.AUTO,
  width,
  height,
  /*
  scene: {
    preload,
    create,
    update,
  },
  */
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
game.scene.add("game", gameScene);

//set Phaser game starting scene
game.scene.start("game");
