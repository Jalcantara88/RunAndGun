//load credits
const creditsSceneCreate = require("./create");
const creditsScenePreload = require("./preload");
const creditsSceneUpdate = require("./update");

var creditsScene = new Phaser.Scene("credits");

//add scene files to creditsScene
creditsScene.preload = creditsScenePreload;
creditsScene.create = creditsSceneCreate;
creditsScene.update = creditsSceneUpdate;

export default creditsScene;