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
    console.log(gameData);
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

var game = new Phaser.Game(gameConfig);
var gameData = new GameData();
game.scene.add('sceneA', SceneA, true, {})
