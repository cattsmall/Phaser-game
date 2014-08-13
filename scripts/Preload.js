// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay: function(game) {}
};

myGame.Preload.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    this.state.start('MainMenu');
  },
  update: function() {
    // Update objects & variables
  }
}
