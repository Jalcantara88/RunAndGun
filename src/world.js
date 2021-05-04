const world = {
  player: undefined,
  cpu: [],
  ground: undefined,
  worldScrollSpeed: 3,
  maxGroundHeight: 200,
  maxGroundWidth: 400,
  maxGroundGap: 300,
  lives: 3,
  score: 0,
  minGap: 200,
  maxGap: 500,
  nextGap: 0,
  frontPlatform: undefined,
  currentGap: 0,
  minHeight: 300,
  maxHeight: 500,
  minWidth: 200,
  maxWidth: 600,
  randomCalc: false,
};

module.exports = world;
