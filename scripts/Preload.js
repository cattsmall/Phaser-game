// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay1: function(game) {},
  GamePlay2: function(game) {}
};

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    google: {
      families: ['Press+Start+2P']
    }

};

myGame.Preload.prototype = {
  preload: function() {
    // Preload font for the game
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  },

  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    
    this.state.start('MainMenu');
  },
  update: function() {
    // Update objects & variables
  }
}
