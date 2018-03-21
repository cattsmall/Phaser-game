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
        game.scene.start('MainMenu');
    },
    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);