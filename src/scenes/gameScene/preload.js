const { Game } = require("phaser");
import bg from '../../assets/bg.png';
import sky from '../../assets/bg/sky.png';
import clouds from '../../assets/bg/clouds.png';
import mountains from '../../assets/bg/mountains.png';
import trees from '../../assets/bg/trees.png';
import rocks from '../../assets/bg/rocks.png';
import dude from '../../assets/dude.png';
import water from '../../assets/water/water.png';
import bgMusic from '../../assets/music/gameplay.mp3';


module.exports = function preload() {

    // preload background image to game
    this.load.image("background", bg);

    this.load.image("sky", sky);

    this.load.image("clouds", clouds);

    this.load.image("mountains", mountains);

    this.load.image("trees", trees);

    this.load.image("rocks", rocks);

    this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48});

    this.load.spritesheet("water", water, { frameWidth: 800, frameHeight: 200});

    this.load.audio("bgMusic", bgMusic);

    
};
