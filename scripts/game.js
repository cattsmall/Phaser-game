require([
  'frozen/GameCore',
  './scripts/_Player.js',
  'dojo/keys'
], function(GameCore, keys, Player){

  //setup a GameCore instance
  var game = new GameCore({
    canvasId: 'canvas',
    width:640,
    height:480,
    draw: function(context){
      context.clearRect(0, 0, this.width, this.height);
      context.fillRect(0, 0, this.width, this.height);
      context.fillStyle = "#ff9900";
      context.fillRect(player.x, player.y, player.size, player.size);
    },
    initInput: function(){
      //tells the input manager to listen for key events
      this.inputManager.addKeyAction(keys.LEFT_ARROW);
      this.inputManager.addKeyAction(keys.RIGHT_ARROW);
      this.inputManager.addKeyAction(keys.UP_ARROW);
      this.inputManager.addKeyAction(keys.DOWN_ARROW);
    },
    update: function(millis){

      //just an example showing how to check for presses, could be done more effeciently

      if(this.inputManager.keyActions[keys.LEFT_ARROW].isPressed() && player.x >= 0 ){
        player.x-= player.speed;
      }

      if(this.inputManager.keyActions[keys.RIGHT_ARROW].isPressed() && player.x <= (this.width - player.size) ){
        player.x+= player.speed;
      }

      if(this.inputManager.keyActions[keys.UP_ARROW].isPressed() && player.y >= 0 ) {
        player.y-= player.speed;
      }

      if(this.inputManager.keyActions[keys.DOWN_ARROW].isPressed() && player.y <= (this.height - player.size) ){
        player.y+= player.speed;
      }
    }
  });

  //launch the game!
  game.run();
});