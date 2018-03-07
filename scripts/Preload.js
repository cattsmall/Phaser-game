var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
        console.log("preload");
        // Preload font for the game
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //Preload start button
        this.load.spritesheet('startButton', 'assets/ui/button-start.png', {frameWidth: 256, frameHeight: 64});

        //Preload maps
        this.load.tilemapTiledJSON('map1', 'scripts/maps/map1.json');
        this.load.tilemapTiledJSON('map2', 'scripts/maps/map2.json');

        //Tileset
        this.load.image('tileset', 'assets/tiles.png');

        //Player
        this.load.spritesheet('player', 'assets/player.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('objects', 'assets/objects.png', {frameWidth: 32, frameHeight: 32});

        //Dialog background
        this.load.image('dialogWindow', 'assets/ui/dialog.png');

        //Sound
        this.load.audio('button', [ 'assets/audio/button.mp3', 'assets/audio/button.wav' ]);
        this.load.audio('pen', [ 'assets/audio/pen.mp3', 'assets/audio/pen.wav' ]);
        this.load.audio('meow', [ 'assets/audio/meow.mp3', 'assets/audio/meow.wav' ]);
        this.load.audio('dice', [ 'assets/audio/dice.mp3', 'assets/audio/dice.wav' ]);
    },

    create: function() {
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;
        // this.stage.smoothed = false;
        // this.scale.updateLayout(true);
        // this.scale.refresh();

        this.scene.start('MainMenu');
    },
    update: function() {
    }
});

myGame.scenes.push(preloadState);
