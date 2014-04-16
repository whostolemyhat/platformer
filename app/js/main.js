/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('star', '/img/star.png');
    game.load.image('background', '/img/bg.png');
    game.load.image('grasslands_bg', '/img/bg_grasslands.png');
    game.load.image('ground', '/img/grass.png');
    game.load.atlas('player', '/img/player/player.png', '/img/player/player.json');
    // game.load.spritesheet('player', '/img/player/p1_walk_inline.png', 72, 92, 11);
    // game.load.spritesheet('player', '/img/player/dude.png', 32, 48);
    // game.load.image('player', '/img/player/p1_stand.png');
}

var platforms;
var player;
var cursors;

function create() {
    // game.add.tileSprite(0, 0, 800, 600, 'background');
    var bg = game.add.sprite(0, 0, 'grasslands_bg');
    bg.scale.setTo(1, 1.1);

    
    platforms = game.add.group();
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    // TODO
    // ground.scale.setTo(800, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(0, 250, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(67, 92, 'player');
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 6;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('right', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.collide(player, platforms);

    player.body.velocity.x = 0;


    if(cursors.left.isDown) {
        player.anchor.setTo(.5, 1);
        // sprite.scale.x = 1;
        player.scale.x = -1;
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if(cursors.right.isDown) {
        player.scale.x = 1;
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    // jump
    if(cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}
