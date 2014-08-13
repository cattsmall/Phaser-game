myGame.MainMenu.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    console.log("MainMenu");
    this.state.start('GamePlay');
  },

  update: function() {
    // Update objects & variables
  }
}
