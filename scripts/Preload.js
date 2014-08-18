myGame.Preload.prototype = {
  preload: function() {
    // Preload font for the game
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //Preload start button
    this.load.spritesheet('startButton', 'assets/ui/button-start.png', 256, 64);
    
    //Preload maps
    this.load.tilemap('map1', 'scripts/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map2', 'scripts/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    
    //Tileset
    this.load.image('tileset', 'assets/tiles.png', 32, 32);
    
    //Player
    this.load.spritesheet('player', 'assets/player.png', 32, 64);
    this.load.spritesheet('objects', 'assets/objects.png', 32, 32);
    
    //Dialog background
    this.load.image('dialogWindow', 'assets/ui/dialog.png');
  },

  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.stage.smoothed = false;
    
    this.state.start('MainMenu');
  },
  update: function() {}
}
