function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

let boardgame = new Boardgame();
let dice = new Dice();
let beings = new Beings();
let people = new People();

let monster = new Flyer(50, "monster", 20);
beings.allBeings[monster.name] = monster;

let warrior = new EarthlyBeing(60, "warrior", 40);
beings.allBeings[warrior.name] = warrior;

let shaman = new EarthlyBeing(40, "shaman", 10);
beings.allBeings[shaman.name] = shaman;

let bard = new EarthlyBeing(20, "bard", 5);
beings.allBeings[bard.name] = bard;

let cultist = new EarthlyBeing(20, "cultist", 5);
beings.allBeings[cultist.name] = cultist;

beings.createTargets();
boardgame.chooseFirstRandomPlayer();

var diceRoller = document.querySelector("#roll-dice");
diceRoller.addEventListener('click', function(){
  var outcome = dice.roll(document.querySelector("#roll-value").value);
})

var attackButtons = document.querySelectorAll(".attack")
attackButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var attackingTarget = element.parentNode.parentNode.querySelector(".attack-target").value;
    var attackingDiceValue = element.parentNode.parentNode.querySelector(".attack-roll").value;
    var attackingValue = dice.roll(attackingDiceValue);
    boardgame.firstPhase("Attacking", attackingTarget, attackingValue, "red");
  })
})

var defendButtons = document.querySelectorAll(".defend")
defendButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var defender = element.parentNode.parentNode.id;
    beings.allBeings[defender].defend();
    people.increaseInfluence(2)
  })
})

var shedButtons = document.querySelectorAll(".shed")
shedButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var shedder = element.parentNode.parentNode.id;
    beings.allBeings[shedder].shed();
    boardgame.firstPhase("Shedding", "", 0, "blue");
  })
})

var dreamButtons = document.querySelectorAll(".dream")
dreamButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var dreamer = element.parentNode.parentNode.id;
    beings.allBeings[dreamer].dream();
    boardgame.firstPhase("Dreaming", "", 0, "purple");
  })
})

var turnButton = document.querySelector("#take-turn");
turnButton.addEventListener("click", function(event){
  boardgame.takeTurn();
})

var concludeFirstPhaseButton = document.querySelector("#conclude-first-phase");
concludeFirstPhaseButton.addEventListener("click", function(event){
  boardgame.secondPhase();
})
