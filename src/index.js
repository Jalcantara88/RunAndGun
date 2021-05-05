const Phaser = require("phaser");
// load gameScene
const gameSceneCreate = require("./scenes/gameScene/create");
const gameScenePreload = require("./scenes/gameScene/preload");
const gameSceneUpdate = require("./scenes/gameScene/update");

// load titleScene
const titleSceneCreate = require("./scenes/titleScene/create");
const titleScenePreload = require("./scenes/titleScene/preload");
const titleSceneUpdate = require("./scenes/titleScene/update");

// load gameOver
const gameOverSceneCreate = require("./scenes/gameOverScene/create");
const gameOverScenePreload = require("./scenes/gameOverScene/preload");
const gameOverSceneUpdate = require("./scenes/gameOverScene/update");

// factories
require("./objects/Ball.js");
require("./objects/Bullet.js");
require("./objects/Ground.js");
require("./objects/Lava.js");
require("./objects/Player.js");
require("./objects/EnemyBullet.js");

// constants
const { width, height } = require("./constants");

//create scenes
var gameScene = new Phaser.Scene("game");
var titleScene = new Phaser.Scene("title");
var gameOverScene = new Phaser.Scene("gameOver");

// add scene files to gameScene
gameScene.preload = gameScenePreload;
gameScene.create = gameSceneCreate;
gameScene.update = gameSceneUpdate;

// add scene files to titleScene
titleScene.preload = titleScenePreload;
titleScene.create = titleSceneCreate;
titleScene.update = titleSceneUpdate;

// add scene files to titleScene
gameOverScene.preload = gameOverScenePreload;
gameOverScene.create = gameOverSceneCreate;
gameOverScene.update = gameOverSceneUpdate;


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
game.scene.add("title", titleScene);
game.scene.add("game", gameScene);
game.scene.add("gameOver", gameOverScene);


//set Phaser game starting scene
game.scene.start("title");
