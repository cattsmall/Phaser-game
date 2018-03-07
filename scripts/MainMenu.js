var mainMenuState = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function MainMenu(){
    Phaser.Scene.call(this, {key: 'MainMenu'});
  },
  preload: function() {
    console.log("main menu")
    // Objects have been preloaded at beginning of game in 'Preload' scene
  },

  create: function() {
    // this.stage.backgroundColor = '#03826n';

    myGame.showTitleText(config.height/4, 'A Little About Me', this);

    myGame.startButton = this.add.image(config.width/2, 300, 'startButton');
    myGame.startButton.on('pointerdown', function(pointer) {
      console.log("clicked");
      this.scene.start('GamePlay1')
  });

    // myGame.showNoteText(250, '*Instructions* \n\n Arrow keys to move & jump \n Enter to interact with objects');

  },

  update: function() {

  }
});

myGame.scenes.push(mainMenuState);