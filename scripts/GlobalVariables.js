// Declare myGame, the object that contains our game's scenes
var myGame = {
//Define our game scenes
scenes: [],

// Define framerate
frameRate: 10
};

var player;

var enemies = [];
var enemiesToSpawn = 10;
var enemiesLeft = enemiesToSpawn;
var enemiesAreSafe =  true;

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
var finishedGame;

// Timer
var timedEvent;

function createEnemies(game) {

    // Create enemies
    enemies = game.physics.add.staticGroup({
        key: 'baddie',
        repeat: enemiesToSpawn
    });

    // Go thru each child and make sure it's on screen
    enemies.children.iterate(function (enemy) {
        enemy.setX(Phaser.Math.FloatBetween(32, config.width-32));
        enemy.setY(Phaser.Math.FloatBetween(32, config.height-32));
        if (enemy.x > (config.width - 32)) {
            enemy.setX(config.width - 48);
        } else if (enemy.x < 32) {
            enemy.setX(48);
        }

        if (enemy.y > (config.height - 32)) {
            enemy.setY(config.height - 48);
        } else if (enemy.y < 32) {
            enemy.setY(48);
        }
    });

    enemies.refresh();
}

function switchEnemyState() {
    if (gameStarted && !finishedGame) {
        if ( enemiesAreSafe == false ) {
            enemiesAreSafe = true;
            enemies.children.iterate(function (enemy) {
                enemy.anims.play('safe');
                // Set to safe
            });
        } else {
            enemiesAreSafe = false;
            enemies.children.iterate(function (enemy) {
                enemy.anims.play('unsafe');
                // Set to unsafe
            });
        }
    }
}

function collideWithEnemy(player, enemy) {
    if ( enemiesAreSafe == false ) {
        // unsafe hit
        hitPoints--;
    } else {
        // safe hit
        score++;
    }

    enemy.disableBody(true, true);
    enemiesLeft--;

    // End game when necessary
    if ( hitPoints == 0) {
        loseState();
    } else if ( hitPoints > 0 && enemiesLeft == 0 ) {
        console.log(hitPoints, enemiesLeft);
        winState();
    }
}

function startGame() {
    introText.visible = false;
    scoreText.visible = true;
    hitPointsText.visible = true;
    gameStarted = true;
    finishedGame = false;
}

function loseState() {
    killGame();
    introText.setText('Game Over! Reload to play again.');
}

function winState() {
    killGame();
    introText.setText('Great Job! Reload to play again.');
}

function killGame(){
    finishedGame = true;
    player.setVelocity(0, 0);
    introText.visible = true;

    scoreText.visible = false;
    hitPointsText.visible = false;
}