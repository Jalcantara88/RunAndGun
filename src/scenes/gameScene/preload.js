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
import die from '../../assets/music/die.wav';
import jump from '../../assets/music/die.wav';
import kill from '../../assets/music/kill.wav';
import shoot from '../../assets/music/shoot.wav';


module.exports = function preload() {



    // preload background image to game
    this.load.image("background", bg);

    // preload background image to game
    this.load.image("sky", sky);

    // preload clouds image to game
    this.load.image("clouds", clouds);

    // preload mountains image to game
    this.load.image("mountains", mountains);

    // preload trees image to game
    this.load.image("trees", trees);

    // preload rocks image to game
    this.load.image("rocks", rocks);

    // preload dude image to game
    this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48});

    // preload water image to game
    this.load.spritesheet("water", water, { frameWidth: 800, frameHeight: 200});

    // preload water image to game
    this.load.audio("bgMusic", bgMusic);

    this.load.audio("die", die);

    this.load.audio("jump", jump);

    this.load.audio("kill", kill);

    this.load.audio("shoot", shoot);



    
};
