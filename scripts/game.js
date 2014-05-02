var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

function preload() {

  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32 , 32);
}

var player;

var enemies;
var livingEnemies = [];

// HP
var hitPoints;

var score = 0;
// IF we have time, we'll print the score
var scoreText;
var scoreString = '';

function create() {

  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  
  // Hitpoints
  hitPoints = 5;
  
  // Keyboard input
  cursors = game.input.keyboard.createCursorKeys();
  
  //  The baddies! Reference a group
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  enemies.safe = false;

  createEnemies();
  enemies.forEach(function(enemy) {
    enemy.animations.add('safe', [0]);
    enemy.animations.add('unsafe', [1]);
  });
  
  var enemyTimer = window.setInterval(switchEnemyState, 1000);
  
}

function createEnemies () {

  for (var x = 0; x < 10; x++) {
    var enemy = enemies.create((Math.random() * game.world.width), ((Math.random() * game.world.height) - 32), 'baddie');
    enemy.body.moves = false;

    if (enemy.x > (game.world.width - 32)) {
      enemy.x = game.world.width + 32;
    } else if (enemy.x < 32) {
      enemy.x = 32;
    }

    if (enemy.y > (game.world.height - 32)) {
      enemy.y = game.world.height + 32;
    } else if (enemy.y < 32) {
      enemy.y = 32;
    }
  }

  enemy.x = 100;
  enemy.y = 50;
}

function switchEnemyState () {
  if ( enemies.safe == false ) {
    enemies.safe = true;
  } else {
    enemies.safe = false;
  }
}

function update() {
   
      //  Reset the player, then check for movement keys
          player.body.velocity.setTo(0, 0);

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

          player.animations.play('right');
      }
      
      else if (cursors.down.isDown)
      {
          //  Move to the right
          player.body.velocity.y = 150;

          player.animations.play('right');
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

}
