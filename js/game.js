var gameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  parent: "game",
  scene: {create: create,resize:resize}
}

function create(){
  this.events.on('resize', resize, this);

  Client.askNewPlayer();
}

function resize (width, height){
    if (width === undefined) { width = this.sys.game.config.width; }
    if (height === undefined) { height = this.sys.game.config.height; }
    this.cameras.resize(width, height);
}

window.addEventListener('resize', function (event) {
    game.resize(window.innerWidth, window.innerHeight);
}, false);

class SceneA extends Phaser.Scene{
  constructor(config){
    super(config);
  }
  initialize (){
    Phaser.Scene.call(this, { key: 'sceneA' });
  }
  preload(){
  }
  create(data){
    var peopleGraphics = this.add.graphics({fillStyle: {color: 0x2266aa}});
    var influencedGraphics = this.add.graphics({fillStyle: {color: 0xff66aa}});
    var points = {}
    var influenced = 500;
    // var point = new Phaser.Geom.Point(dice.getRandom(game.renderer.width),dice.getRandom(game.renderer.height));
    // graphics.fillPointShape(point, 5);
    for(var i = 0; i < influenced; i++){
      points[i] = new Phaser.Geom.Point(dice.getRandomInt(100,game.renderer.width-100),dice.getRandomInt(100, game.renderer.height-100));
      influencedGraphics.fillPointShape(points[i], 4);
    }
    for(var i = 0; i < (1000-influenced); i++){
      points[i] = new Phaser.Geom.Point(dice.getRandomInt(100,game.renderer.width-100),dice.getRandomInt(100, game.renderer.height-100));
      peopleGraphics.fillPointShape(points[i], 4);
    }
  }
};

class GameData{
  constructor(){
    this.playerMap = {};
  }
  addNewPlayer(id){
    this.playerMap[id] = id;
  }
  removePlayer(id){
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  }
};

var dice = new Dice();
var game = new Phaser.Game(gameConfig);
var gameData = new GameData();
game.scene.add('sceneA', SceneA, true, {})
