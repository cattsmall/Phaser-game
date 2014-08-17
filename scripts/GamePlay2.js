myGame.GamePlay1.prototype = {
  preload: function() {
    this.load.tilemap('map', 'scripts/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/tiles.png', 32, 32);
    this.load.spritesheet('player', 'assets/player.png', 32, 64);
    this.load.image('dialogWindow', 'assets/ui/dialog.png');
  },

  create: function() {
    this.stage.backgroundColor = "#c2eafe";
    this.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 800;
    
    //Add tile map to game
    myGame.map = this.add.tilemap('map');
    
    //Add tileset image to game
    myGame.map.addTilesetImage('tileset');
    
    //Using more than one tile layer? You have to specify the one to collide with
    myGame.map.setCollisionBetween(0, 3, true, 'Floor');
    myGame.map.setCollision(26, false, 'BG');
    
    //Tile map layers
    myGame.BG = myGame.map.createLayer('BG');
    myGame.Floor = myGame.map.createLayer('Floor');
    
    //Run function when tile collides
    myGame.map.setTileIndexCallback(26, this.completeStage, this, myGame.BG);
    
    //Resize layers to screen
    myGame.BG.resizeWorld();
    myGame.Floor.resizeWorld();
        
    //Player
    myGame.player = this.add.sprite( 32, 255, 'player');
    
    //Player Animations
    myGame.player.leftStandingAnim = myGame.player.animations.add("standing-left", [5]);
    myGame.player.rightStandingAnim = myGame.player.animations.add("standing-right", [0]);
    myGame.player.leftWalkingAnim = myGame.player.animations.add("walk-left", [6,7,6,5,8,9,8,5]);
    myGame.player.rightWalkingAnim = myGame.player.animations.add("walk-right", [1,2,1,0,3,4,3,0]);
    myGame.player.leftJumpingAnim = myGame.player.animations.add("jump-left", [10]);
    myGame.player.rightJumpingAnim = myGame.player.animations.add("jump-right", [11]);
    myGame.player.animations.play("standing-right", 1, true);
    
    //Player's physics
    this.physics.enable(myGame.player, Phaser.Physics.ARCADE);
    myGame.player.body.collideWorldBounds = true;
    
    // dialog window
    myGame.dialogWindow = this.add.sprite( this.camera.x, this.world.height - 131, 'dialogWindow');
    myGame.dialogWindow.visible = false;
    myGame.dialogText = this.add.text(this.camera.x + 16, 362, '');
    myGame.dialogText.visible = false;

    myGame.dialogText.font = 'Press Start 2P';
    myGame.dialogText.fontSize = 12;
    myGame.dialogText.wordWrap = true;
    myGame.dialogText.wordWrapWidth = 620;
    
    //Create cursor keys
    myGame.cursors = this.input.keyboard.createCursorKeys();
    // myGame.cursors.up.onDown.add(this.playerJump, myGame.player);
    
    //Enter key
    myGame.EnterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    myGame.EnterKey.onDown.add(myGame.hideDialog, this);
    
   //Camera follows player
    this.camera.follow(myGame.player);
  },

  update: function() {
    this.physics.arcade.collide(myGame.player, myGame.Floor);
    this.physics.arcade.collide(myGame.player, myGame.BG);
    
    myGame.player.body.velocity.x = 0;
    
    // If movement is not being ignored
    if (!myGame.ignoreMovement) {
      
      // Left movement, right morement
      if (myGame.cursors.left.isDown) {
        
        // Speed left
        myGame.player.body.velocity.x = -150;
        
        if (myGame.player.body.onFloor()) {
          // Walking animation
          myGame.player.animations.play("walk-left", 10, true);
        } else {
          // Jumping animation
          myGame.player.animations.play("jump-left", 1, true);
        }
      
      } else if (myGame.cursors.right.isDown) {
        
        // Speed right
        myGame.player.body.velocity.x = 150;
      
        if (myGame.player.body.onFloor()) {
          
          // Walking animation
          myGame.player.animations.play("walk-right", 10, true);
        } else {
          
          // Jumping animation
          myGame.player.animations.play("jump-right", 1, true);
        }
      }
    }
    
    // On up callback
    this.input.keyboard.onUpCallback = function(event) {
      
      //If player is on floor
      if (myGame.player.body.onFloor()) {        
        if (event.keyCode == myGame.cursors.left.keyCode) {
          //Play standing animation
          myGame.player.animations.play("standing-left", 1, true);
          
        } else if (event.keyCode == myGame.cursors.right.keyCode) {
          
          //Play standing animation
          myGame.player.animations.play("standing-right", 1, true);
        }
      }
    };
  
    // Turn off jumping animation when player is not jumping
    if (myGame.player.leftJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0) {
      myGame.player.animations.play("standing-left", 1, true);
    
    } else if (myGame.player.rightJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0)  {
      myGame.player.animations.play("standing-right", 1, true);
    }
  },
  completeStage: function() {
    if (myGame.cursors.up.isDown) {
      game.state.start('GamePlay2');  
    }  
  }
}

myGame.showDialog = function(text) {
  myGame.ignoreMovement = true;
  
  myGame.dialogWindow.x = game.camera.x;
  myGame.dialogWindow.visible = true;
  
  myGame.dialogText.x = game.camera.x + 16;
  myGame.dialogText.setText(text);
  myGame.dialogText.visible = true;
}

myGame.hideDialog = function() {
  myGame.ignoreMovement = false;

  myGame.dialogWindow.visible = false;
  myGame.dialogText.visible = false;
  myGame.dialogText.setText('');
}
