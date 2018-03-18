// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  scenes: [],

  // Define framerate
  frameRate: 10
};

var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
    // Preload images for this state
    },

    create: function() {
        console.log("Preload");
        this.state.start('MainMenu');
    },
    update: function() {
        // Update objects & variables
    }
});

myGame.scenes.push(preloadState);
