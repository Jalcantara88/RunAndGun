// load gameOver
const gameOverSceneCreate = require("./create");
const gameOverScenePreload = require("./preload");
const gameOverSceneUpdate = require("./update");

var gameOverScene = new Phaser.Scene("gameOver");

// add scene files to gameOverScene
gameOverScene.preload = gameOverScenePreload;
gameOverScene.create = gameOverSceneCreate;
gameOverScene.update = gameOverSceneUpdate;

export default gameOverScene;