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
  game.load.spritesheet('baddie', 'assets/baddie.png', 128 , 32);
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
  
  //  The baddies!
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;

  createEnemies();
  
}

function createEnemies () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var enemy = enemies.create(x * 48, y * 50, 'baddie');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.moves = false;
        }
    }

    enemy.x = 100;
    enemy.y = 50;
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

}
