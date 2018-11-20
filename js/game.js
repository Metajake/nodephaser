var gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:200},
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
}
var game = new Phaser.Game(gameConfig);
function preload(){
  this.load.image('red', 'assets/red.png');
}
function create(){
  var particles = this.add.particles('red');
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0},
    blendMode: "ADD"
  });
  emitter.start();
}
game.scene.add("Game", Game);
game.scene.start("Game");
var Game = {}
Game.init = function(){
  // game.stage.disableVisibilityChange = true;
}
