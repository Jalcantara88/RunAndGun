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
import platform from '../../assets/platform.png';
import enemy from '../../assets/enemy.png';

const world = require("../../world");

module.exports = function preload() {



  /************************************************ 
  ******************* IMAGES **********************
  ************************************************/



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

    this.load.image("platform", platform);



  /************************************************ 
  ***************** SPRITeSHEETS ******************
  ************************************************/



    // preload dude image to game
    this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48});

    // preload enemy image to game
    this.load.spritesheet("enemy", enemy, { frameWidth: 32, frameHeight: 48})

    // preload water image to game
    this.load.spritesheet("water", water, { frameWidth: 800, frameHeight: 200});

    // preload water image to game
    this.load.audio("bgMusic", bgMusic);



  /************************************************ 
  ******************* AUDIO ***********************
  ************************************************/



    // preload die audio
    this.load.audio("die", die);

    // preload jump audio
    this.load.audio("jump", jump);

    // preload kill audio
    this.load.audio("kill", kill);

    // preload shoot audio
    this.load.audio("shoot", shoot);

    // create enemy bullets group
    world.enemyBullets = this.physics.add.group({immovable: false, allowGravity: true});


    
};
