class Dice {
  constructor() {

  }
  roll(height){
    console.log("Rolling Dice!");
    var rollValue = Math.floor((Math.random() * height) + 1);
    document.querySelector("#dice-outcome").innerHTML = rollValue;
    return rollValue
  }
  getRandom(height){
    return Math.floor((Math.random() * height) + 1);
  }
  getRandomZero(height){
    return Math.floor((Math.random() * height));
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
