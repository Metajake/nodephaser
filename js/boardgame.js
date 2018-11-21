class Boardgame {
  constructor(){
    this.round = 1;
    this.day = 10;
    this.turnPosition = 0;
    this.numberOfPlayers = 0;
    this.currentPlayer = {};
    this.roundContainer = document.querySelector("#turn-count");
    this.turnStatusContainer = document.querySelector("#round-status");
    this.dayContainer = document.querySelector("#day-container");
    this.dayContainer.innerHTML = this.day;

    this.characterDefending = false;
    this.roundTarget = "";
    this.roundDamage = 0;
  }
  takeTurn(){
    if((this.turnPosition+1) % this.numberOfPlayers == 0 ){
      this.turnPosition = 0;
    }else{
      this.turnPosition ++;
    };
    this.currentPlayer = this.choosePlayer(this.turnPosition);
    this.round ++
    this.updateDay()
    this.updateRoundStatus(1)
  }
  updateDay(){
    if((this.round-1) % this.numberOfPlayers == 0 ){
      this.day --
      this.dayContainer.innerHTML = this.day;
      if(this.day ==0){console.log("Bard Wins")}
    }
  }
  chooseFirstRandomPlayer(){
    this.updateRoundStatus(1)
    for(var key in beings.allBeings){this.numberOfPlayers ++;}
    this.turnPosition = dice.getRandomZero(this.numberOfPlayers)
    this.choosePlayer(this.turnPosition)
  }
  choosePlayer(position){
    this.currentPlayer = beings.allBeings[Object.keys(beings.allBeings)[position]];
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.add("disabled");
    }
    this.currentPlayer.container.classList.remove("disabled");
    return this.currentPlayer;
  }
  firstPhase(action, attackingTarget, attackingValue, color){
    this.roundTarget = attackingTarget;
    this.roundDamage = attackingValue;
    this.enableAllCharacters();
    turnButton.classList.add("disabled");
    this.updateRoundStatus(2)
    this.currentPlayer.updateStatus(action + " " + this.roundTarget, color);

    this.checkActionInfluence(action)
  }
  secondPhase(){
    this.checkDamageDefendingCharacter()

    if(!this.characterDefending && this.roundTarget.length){
      if(this.currentPlayer.name == this.roundTarget){
        this.roundDamage = beings.allBeings[this.roundTarget].hp;
      };
      beings.allBeings[this.roundTarget].damage(this.roundDamage);
    }
    this.enableOnlyCurrentPlayer();
    this.finalPhase();
  }
  finalPhase(){
    this.updateRoundStatus(3)
    people.increaseInfluence(people.getRoundInfluenceCount())
    this.checkWin()
    this.resetRoundVariables();
  }
  enableAllCharacters(){
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.remove("disabled");
    }
  }
  enableOnlyCurrentPlayer(){
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.add("disabled");
    }
    this.currentPlayer.container.classList.remove("disabled");
  }
  resetRoundVariables(){
    for(var key in beings.allBeings){
      beings.allBeings[key].defending = false;
      beings.allBeings[key].updateStatus("","");
    }
    this.characterDefending = false;
    this.roundTarget = {};
    this.roundDamage = 0;
    turnButton.classList.remove("disabled");
  }
  checkDamageDefendingCharacter(){
    for(var key in beings.allBeings){
      if(beings.allBeings[key].defending){
        beings.allBeings[key].damage(this.roundDamage)
        this.characterDefending = true;
      }
    }
  }
  checkActionInfluence(action){
    if (this.currentPlayer.isInstalled){
      if(action == 'Attacking'){
        people.increaseInfluence(5)
      }else if(action == "Dreaming" || action == "Shedding"){
        people.increaseInfluence(3)
      }
    }
  }
  checkWin(){
    if(people.underInfluence >= people.peopleCount){
      console.log("Monster Wins");
      return
    }
    if (beings.allBeings['monster'].hp <= 0){
      console.log("Knight Wins")
    }
    if (beings.allBeings['shaman'].hp <= 0 && beings.allBeings['monster'].hp <= 0){
      console.log("Shaman Wins!")
    }
  }
  updateRoundStatus(phase){
    this.turnStatusContainer.innerHTML = "Round "+ this.round + ", Phase " + phase;
  }
}
