// New game + 
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

// global variables
var player;

var enemies;
var livingEnemies = [];

// HP
var hitPoints = 5;
var hitPointsString = 'HP: ';
var hitPointsText;

// score
var score = 0;
var scoreString = 'Score: ';
var scoreText;

var introText;
var gameStarted;


// Preload images
function preload() {

  game.load.image('sky', 'assets/sky.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32 , 32);
}

// create the game game (draw)
function create() {
  game.add.sprite(0, 0, 'sky');

  player = game.add.sprite(32, game.world.height - 150, 'dude');
  player.animations.add('left', [0]);
  player.animations.add('down', [1]);
  player.animations.add('right', [2]);
  player.animations.add('up', [3]);
  
  // Give player the ability to move and collide with objects
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;
  
  // Keyboard input
  cursors = game.input.keyboard.createCursorKeys();
  
  //  The enemies group
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  
  // Safe variable
  enemies.safe = false;
  
  // Function to create enemies
  createEnemies();
  
  // Text -- score
  scoreText = game.add.text(32, 24, scoreString + score);
  scoreText.visible = false;
  
  // Text -- HP
  hitPointsText = game.add.text(32, 64, hitPointsString + hitPoints);
  hitPointsText.visible = false;
  
  // Text -- intro text
  introText = game.add.text(game.world.centerX/4, 200, "Collect the Piggies when they're weak! \n Click to start the game", { align: "center" } );
  introText.align = 'center';
  
  // When right mouse button is clicked, start the game
  game.input.onDown.add(startGame, this);
  
}

// Create 10 enemies
function createEnemies() {
  // Do this 10 times
  for (var i = 0; i < 10; i++) {
    var enemy = enemies.create((Math.random() * game.world.width), ((Math.random() * game.world.height) - 32), 'baddie');
    
    // Enemy doesn't move
    enemy.body.moves = false;
    
    // If enemy spawns out of x bounds, move it in
    if (enemy.x > (game.world.width - 32)) {
      enemy.x = game.world.width - 48;
    } else if (enemy.x < 32) {
      enemy.x = 48;
    }

    // If enemy spawns out of y bounds, move it in
    if (enemy.y > (game.world.height - 32)) {
      enemy.y = game.world.height - 48;
    } else if (enemy.y < 32) {
      enemy.y = 48;
    }
  }
  
  // Add safe & unsafe animations to each enemy
  enemies.forEach(function(enemy) {
    enemy.animations.add('safe', [1]);
    enemy.animations.add('unsafe', [0]);
  });
}

// Function to toggle safe vs dangerous
function switchEnemyState() {
  if ( enemies.safe == false ) {
    enemies.safe = true;
  } else {
    enemies.safe = false;
  }
}

// Update game so it can be redrawn
function update() {
      player.body.velocity.setTo(0, 0);
      if (gameStarted) {
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
  
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
  
        if (cursors.up.isDown)
        {
            //  Move to the right
            player.body.velocity.y = -150;

            player.animations.play('up');
        }
  
        else if (cursors.down.isDown)
        {
            //  Move to the right
            player.body.velocity.y = 150;

            player.animations.play('down');
        }
      }
      
      
      if (enemies.safe)
      {
          enemies.forEach(function(enemy) {
            enemy.animations.play('safe');
          });
      } else {
        enemies.forEach(function(enemy) {
          enemy.animations.play('unsafe');
        });
      }
      
      game.physics.arcade.collide(player, enemies, collideWithEnemy);
      
  
      scoreText.setText(scoreString + score);
      hitPointsText.setText(hitPointsString + hitPoints);

}

function collideWithEnemy(player, enemy) {
  if ( enemies.safe == false ) {
    hitPoints--;
  } else {
    score++;
  }
  enemy.kill();
  
  if ( hitPoints == 0 && enemies.length > 0 ) {
      loseState();
  } else if ( hitPoints > 0 && enemies.length == 0 ) {
      winState();
  }
}

function startGame() {
  introText.visible = false;
  scoreText.visible = true;
  hitPointsText.visible = true;
  game.time.events.loop(1000, switchEnemyState, this);
  gameStarted = true;
}

function loseState() {

    player.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;
    
    scoreText.visible = false;
    hitPointsText.visible = false;

}

function winState() {

    player.body.velocity.setTo(0, 0);
    
    introText.text = 'Great Job!';
    introText.visible = true;
    
    
    scoreText.visible = false;
    hitPointsText.visible = false;

}

