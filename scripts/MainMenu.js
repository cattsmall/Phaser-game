myGame.MainMenu.prototype = {
  preload: function() {
    this.load.spritesheet('startButton', 'assets/ui/button-start.png', 256, 64);
  },

  create: function() {
    this.stage.backgroundColor = '#03826n';
    
    var titleText = this.add.text(this.world.centerX, game.world.centerY/2, 'Diversity');

    titleText.font = 'Press Start 2P';
    titleText.fill = '#ffffff';
    titleText.align = 'center';
    titleText.fontSize = 30;
    titleText.anchor.setTo(0.5);
    
    var startButton = this.add.button(this.world.centerX, game.world.centerY, 'startButton', this.startGame, game, 1, 0, 2);
    startButton.anchor.setTo(0.5);
    
  },

  update: function() {
    
  },
  startGame: function() {
    this.state.start('GamePlay1');
  }
}

