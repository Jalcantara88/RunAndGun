// load titleScene
const titleSceneCreate = require("./create");
const titleScenePreload = require("./preload");
const titleSceneUpdate = require("./update");

var titleScene = new Phaser.Scene("title");

// add scene files to titleScene
titleScene.preload = titleScenePreload;
titleScene.create = titleSceneCreate;
titleScene.update = titleSceneUpdate;

export default titleScene;