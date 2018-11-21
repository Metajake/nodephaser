var Client = {};
Client.socket = io.connect();
// console.log(io);

Client.askNewPlayer = function(){
  Client.socket.emit("newplayer");
}

Client.socket.on('newplayer', function(data){
  SceneA.addNewPlayer(data.id);
});

Client.socket.on('allplayers', function(data){
  for(var i = 0; i < data.length; i++){
    gameData.addNewPlayer(data[i].id);
  };
});

Client.socket.on('remove', function(id){
  gameData.removePlayer(id);
})
