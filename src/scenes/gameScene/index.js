// load gameScene
const gameSceneCreate = require("./create");
const gameScenePreload = require("./preload");
const gameSceneUpdate = require("./update");

//create scenes
var gameScene = new Phaser.Scene("game");

// add scene files to gameScene
gameScene.preload = gameScenePreload;
gameScene.create = gameSceneCreate;
gameScene.update = gameSceneUpdate;

export default gameScene;