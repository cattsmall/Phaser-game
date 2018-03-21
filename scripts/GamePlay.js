var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        this.add.sprite(config.width/2, config.height/2, 'sky');

        player = this.physics.add.sprite(32, config.height - 150, 'dude');

        player.setCollideWorldBounds(true);

        // Keyboard input
        cursors = this.input.keyboard.createCursorKeys();

        // Generate enemies
        createEnemies(this);
        enemiesAreSafe = false;

        // Generate text for score
        scoreText = this.add.text(32, 24, scoreString + score);
        scoreText.visible = false;

        // Generate text for HP
        hitPointsText = this.add.text(32, 64, hitPointsString + hitPoints);
        hitPointsText.visible = false;

        // Generate intro text
        introText = this.add.text(32, 24, "Click to start playing");

        // Add game start click event
        this.input.on('pointerdown', function (){
            if(!gameStarted) {
                startGame();
            }
        });

        // Generate timer
        timedEvent = this.time.addEvent({delay: 1000, callback: switchEnemyState, callbackScope: this, loop: true});

        // On overlap, run function
        this.physics.add.overlap(player, enemies, collideWithEnemy, null, this);
    },

    update: function() {
        // Update objects & variables
        player.setVelocity(0, 0);
        if (gameStarted && !finishedGame) {
            if (cursors.left.isDown) {
                //  Move to the left
                player.setVelocityX(-150);

                player.anims.play('left');
            }

            else if (cursors.right.isDown) {
                //  Move to the right
                player.setVelocityX(150);

                player.anims.play('right');
            }

            if (cursors.up.isDown) {
                //  Move to the right
                player.setVelocityY(-150);

                player.anims.play('up');
            }

            else if (cursors.down.isDown) {
                //  Move to the right
                player.setVelocityY(150);

                player.anims.play('down');
            }

            // Update score
            scoreText.setText(scoreString + score);
            hitPointsText.setText(hitPointsString + hitPoints);
        }
    }
});

myGame.scenes.push(gamePlayState);