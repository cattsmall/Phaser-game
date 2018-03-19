var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
        // Preload images for this state
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('baddie', 'assets/baddie.png', {frameWidth: 32, frameHeight: 32});
    },

    create: function() {
        console.log("Preload");
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 0 }),
            frameRate: myGame.frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 1 }),
            frameRate: myGame.frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 2 }),
            frameRate: myGame.frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 3 }),
            frameRate: myGame.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'safe',
            frames: this.anims.generateFrameNumbers('baddie', { start: 1, end: 1}),
            frameRate: myGame.frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'unsafe',
            frames: this.anims.generateFrameNumbers('baddie', { start: 0, end: 0}),
            frameRate: myGame.frameRate,
            repeat: -1
        });
        this.scene.start('GamePlay');
    },
    update: function() {
        // Update objects & variables
    }
});

myGame.scenes.push(preloadState);
