// /* --- GAME OBJECT --- */
// // Declare myGame, the object that contains our game's scenes
var myGame = {
  scenes: [],
  frameRate: 10
};

// /* --- GOOGLE WEBFONT OBJECT --- */
// //  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    google: {
      families: ['Press+Start+2P']
    }

};


// /* --- SETUP FUNCTIONS --- */

// // Title text on main menu, win & lose scenes
myGame.showTitleText = function(y, text, gameObject) {
  var titleText = gameObject.add.text(config.width/2, y, text, {fontSize: 48});

  titleText.font = 'Press Start 2P';
  titleText.fill = '#ffffff';
  titleText.align = 'center';
  titleText.wordWrap = true;
  titleText.lineSpacing = 5;
  titleText.wordWrapWidth = 600;
  titleText.x -= titleText.width/2;
}

// // Note text on main menu, win & lose scenes
// myGame.showNoteText = function(y, text) {
//   var noteText = game.add.text(game.world.centerX, y, text);

//   noteText.font = 'Press Start 2P';
//   noteText.fill = '#ffffff';
//   noteText.align = 'center';
//   noteText.fontSize = 18;
//   noteText.anchor.setTo(0.5);
//   noteText.wordWrap = true;
//   noteText.lineSpacing = 5;
//   noteText.wordWrapWidth = 500;
// }

// Set up each stage with the player and dialog windows
myGame.setupStage = function(gameObject) {
  myGame.sounds = {};
  myGame.sounds.button = gameObject.sound.add('button');
  myGame.sounds.pen = gameObject.sound.add('pen');
  myGame.sounds.meow = gameObject.sound.add('meow');
  myGame.sounds.dice = gameObject.sound.add('dice');

  //Player
  myGame.player = gameObject.add.sprite( 32, 256, 'player', 0);

  //Player Animations
  myGame.player.leftStandingAnim = gameObject.anims.create({
      key: 'player-standing-left',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 5, end: 5 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  myGame.player.rightStandingAnim = gameObject.anims.create({
      key: 'player-standing-right',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 0, end: 0 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  myGame.player.leftWalkingAnim = gameObject.anims.create({
      key: 'player-walk-left',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 5, end: 9 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  myGame.player.rightWalkingAnim = gameObject.anims.create({
      key: 'player-walk-right',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 1, end: 4 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  myGame.player.leftJumpingAnim = gameObject.anims.create({
      key: 'player-jump-left',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 10, end: 10 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  myGame.player.rightJumpingAnim = gameObject.anims.create({
      key: 'player-jump-right',
      frames: gameObject.anims.generateFrameNumbers('objects', { start: 11, end: 11 }),
      frameRate: myGame.frameRate,
      repeat: -1
  });

  //Player's physics
  // myGame.player.body.collideWorldBounds = true;

  // dialog window
  myGame.dialogWindow = gameObject.add.sprite( gameObject.cameras.main.x, config.height - 131, 'dialogWindow');
  myGame.dialogWindow.visible = false;

  //Dialogtext
  myGame.dialogText = gameObject.add.text(gameObject.cameras.main.x + 16, 362, '');
  myGame.dialogText.font = 'Press Start 2P';
  myGame.dialogText.fontSize = 12;
  myGame.dialogText.wordWrap = true;
  myGame.dialogText.wordWrapWidth = 620;
  myGame.dialogText.visible = false;
  myGame.dialogText.lineSpacing = 5;

  //Create cursor keys
  myGame.cursors = gameObject.input.keyboard.createCursorKeys();
  // myGame.cursors.up.onDown.add(myGame.playerJump, myGame.player);

  //Enter key
  myGame.enterKey = gameObject.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  // myGame.enterKey.onDown.add(myGame.hideDialog, game);

  //Spacebar key
  myGame.spaceKey = gameObject.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);

 //Camera follows player
  gameObject.cameras.main.startFollow(myGame.player);
}

// // Setup tiles
myGame.setupTiles = function() {
//   //Add tileset image to game
  var tiles = myGame.map.addTilesetImage('tileset');

//   //Tile map layers
  myGame.BG = myGame.map.createStaticLayer('BG', tiles, 0, 0);
  myGame.Floor = myGame.map.createStaticLayer('Floor', tiles, 0, 0);

//   //Resize tile map layers to screen
  // myGame.Floor.resizeWorld();

//   //Using more than one tile layer? You have to specify the one to collide with
  myGame.map.setCollisionBetween(0, 3, true, 'Floor');
  myGame.map.setCollision(26, false, 'BG');
}

// /* --- UPDATE FUNCTIONS --- */

// myGame.monitorCollision = function() {
//   game.physics.arcade.collide(myGame.player, myGame.Floor);
//   game.physics.arcade.collide(myGame.player, myGame.BG);
// }

// myGame.monitorMovement = function() {
//   myGame.player.body.velocity.x = 0;

//   // If movement is not being ignored
//   if (!myGame.ignoreMovement) {

//     // Left movement, right morement
//     if (myGame.cursors.left.isDown) {

//       // Speed left
//       myGame.player.body.velocity.x = -150;

//       if (myGame.player.body.onFloor()) {
//         // Walking animation
//         myGame.player.animations.play("walk-left", 10, true);
//       } else {
//         // Jumping animation
//         myGame.player.animations.play("jump-left", 1, true);
//       }

//     } else if (myGame.cursors.right.isDown) {

//       // Speed right
//       myGame.player.body.velocity.x = 150;

//       if (myGame.player.body.onFloor()) {

//         // Walking animation
//         myGame.player.animations.play("walk-right", 10, true);
//       } else {

//         // Jumping animation
//         myGame.player.animations.play("jump-right", 1, true);
//       }
//     }
//   }

//   // On up callback
//   game.input.keyboard.onUpCallback = function(event) {

//     //If player is on floor
//     if (myGame.player.body.onFloor()) {
//       if (event.keyCode == myGame.cursors.left.keyCode) {
//         //Play standing animation
//         myGame.player.animations.play("standing-left", 1, true);

//       } else if (event.keyCode == myGame.cursors.right.keyCode) {

//         //Play standing animation
//         myGame.player.animations.play("standing-right", 1, true);
//       }
//     }
//   };

//   // Turn off jumping animation when player is not jumping
//   if (myGame.player.leftJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0) {
//     myGame.player.animations.play("standing-left", 1, true);

//   } else if (myGame.player.rightJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0)  {
//     myGame.player.animations.play("standing-right", 1, true);
//   }
// }

// // Player jump
// myGame.playerJump = function() {
//   if (myGame.player.body.onFloor()) {
//       myGame.player.body.velocity.y = -300;

//       if (!myGame.jumpingTextShown) {
//         myGame.showDialog("Jumping is something I like to do a lot. Yay, yay, yay, yay, yay!");
//         myGame.jumpingTextShown = true;
//       }

//       if (myGame.player.leftStandingAnim.isPlaying || myGame.player.leftWalkingAnim.isPlaying) {
//         myGame.player.animations.play("jump-left", 1, true);
//       } else if (myGame.player.rightStandingAnim.isPlaying || myGame.player.rightWalkingAnim.isPlaying) {
//         myGame.player.animations.play("jump-right", 1, true);
//       }
//   }
// }

// // Check overlap
// myGame.checkOverlap = function(spriteA, spriteB) {

//     var boundsA = spriteA.getBounds();
//     var boundsB = spriteB.getBounds();

//     return Phaser.Rectangle.intersects(boundsA, boundsB);

// }


// /* --- DIALOGS --- */

// // Trigger dialog
// myGame.showDialog = function(text) {
//   myGame.ignoreMovement = true;

//   myGame.dialogWindow.x = game.camera.x;
//   myGame.dialogWindow.visible = true;

//   myGame.dialogText.x = game.camera.x + 16;
//   myGame.dialogText.setText(text);
//   myGame.dialogText.visible = true;
// }

// // Hide dialog
// myGame.hideDialog = function() {
//   myGame.ignoreMovement = false;

//   myGame.dialogWindow.visible = false;
//   myGame.dialogText.visible = false;
//   myGame.dialogText.setText('');
// }