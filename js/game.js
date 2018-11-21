var gameContainerWidthMultiplier = .79;
var gameContainerHeightMultiplier = .7;

var gameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth * gameContainerWidthMultiplier,
  height: window.innerHeight * gameContainerHeightMultiplier,
  autoResize: true,
  parent: "game-board",
  scene: {
    create: create,
    resize:resize
  }
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
    game.resize(window.innerWidth * gameContainerWidthMultiplier, window.innerHeight * gameContainerHeightMultiplier);
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
    this.peopleGraphics = this.add.graphics({fillStyle: {color: 0x2266aa}});
    this.influencedGraphics = this.add.graphics({fillStyle: {color: 0xff66aa}});
    this.points = {}
    this.updateInfluenced(people.peopleCount, people.underInfluence);
  }
  updateInfluenced(totalPeople, influenced){
    this.peopleGraphics.clear();
    this.influencedGraphics.clear();
    for(var i = 0; i < influenced; i++){
      this.points[i] = new Phaser.Geom.Point(dice.getRandomInt(100,game.renderer.width-100),dice.getRandomInt(100, game.renderer.height-100));
      this.influencedGraphics.fillPointShape(this.points[i], 4);
    }
    for(var i = 0; i < (totalPeople - influenced); i++){
      this.points[i] = new Phaser.Geom.Point(dice.getRandomInt(100,game.renderer.width-100),dice.getRandomInt(100, game.renderer.height-100));
      this.peopleGraphics.fillPointShape(this.points[i], 4);
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

var game = new Phaser.Game(gameConfig);
var gameData = new GameData();
var sceneA = new SceneA;
game.scene.add('sceneA', sceneA, true, {})
