var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
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
var hitPoints = 5;
var hitPointsString = 'HP: ';
var hitPointsText;

// score
var score = 0;
var scoreString = 'Score: ';
var scoreText;

var introText;
var gameStarted;

function create() {
  game.add.sprite(0, 0, 'sky');

  player = game.add.sprite(32, game.world.height - 150, 'dude');
  player.animations.add('left', [0]);
  player.animations.add('down', [1]);
  player.animations.add('right', [2]);
  player.animations.add('up', [3]);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;
  
  // Keyboard input
  cursors = game.input.keyboard.createCursorKeys();
  
  //  The baddies! Reference a group
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  enemies.safe = false;

  createEnemies();
  
  scoreText = game.add.text(32, 24, scoreString + score);
  scoreText.visible = false;
  
  hitPointsText = game.add.text(32, 64, hitPointsString + hitPoints);
  hitPointsText.visible = false;
  
  introText = game.add.text(32, 24, "Click to start playing");
  
  game.input.onDown.add(startGame, this);
  
}

function createEnemies() {

  for (var x = 0; x < 10; x++) {
    var enemy = enemies.create((Math.random() * game.world.width), ((Math.random() * game.world.height) - 32), 'baddie');
    enemy.body.moves = false;

    if (enemy.x > (game.world.width - 32)) {
      enemy.x = game.world.width - 48;
    } else if (enemy.x < 32) {
      enemy.x = 48;
    }

    if (enemy.y > (game.world.height - 32)) {
      enemy.y = game.world.height - 48;
    } else if (enemy.y < 32) {
      enemy.y = 48;
    }
  }

  enemy.x = 100;
  enemy.y = 50;
  
  enemies.forEach(function(enemy) {
    enemy.animations.add('safe', [1]);
    enemy.animations.add('unsafe', [0]);
  });
}

function switchEnemyState() {
  if ( enemies.safe == false ) {
    enemies.safe = true;
  } else {
    enemies.safe = false;
  }
}

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
  enemy.destroy();
  
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

