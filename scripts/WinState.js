myGame.scenes.WinScene.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    this.stage.backgroundColor = "#666666";

    myGame.showTitleText(game.world.centerY/2, 'Thanks for understanding me.');
    myGame.showNoteText(400, 'Press enter to return to the Main Menu');

  },

  update: function() {
    this.completeStage();
  },
  completeStage: function() {
    if (myGame.enterKey.isDown) {
      this.scene.start('MainMenu');
    }
  }
}