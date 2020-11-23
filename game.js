// import GameWin from "./gameWin";


var config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 600,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 }, //The gravity is set so the gas will fall
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  //These two make the pixels a bit harsher so its more pixelArtesque
  pixelArt: true,
  roundPixels: true,
};

var game = new Phaser.Game(config);

var player; //Added player
var cursors; //Movement
var trash; // Added trash cans
var gas; // Gas cans
var scoreText = 0; //Score
var map;
var sx = 0;
var mapWidth = 51;
var mapHeight = 37;
var distance = 0;
var tiles = [7, 7, 7, 6, 6, 6, 0, 0, 0, 1, 1, 2, 3, 4, 5];
var gameOver = false;

function preload() {
  this.load.image("tiles", "./images/rocketlaunch.png"); //Player/Rocketship
  this.load.image("gas", "./images/gasStandIn.png");
  this.load.image("trash", "./images/smallgem.png"); //Trash
  this.load.spritesheet("explosion", "./images/explosion.png,", 32, 48, 28); //Explosion
  this.load.spritesheet("dude", "./images/player.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  //Map//
  this.add.image(400, 300, "tiles");

  //Player//
  player = this.physics.add.sprite(700, 550, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  //Gas Cans//
  gas = this.physics.add.group({
      key: "gas",
      repeat: 20,
      setXY: { x: 30, y: 0, stepX: 70 },
    });
  this.physics.add.collider(player, gas, trash);
  //this.physics.add.overlap(player, gas, collectStar, null, this);

  //trash Cans//
  //This makes copies
  trash = this.physics.add.group({
    key: "trash",
    repeat: 20,
    setXY: { x: 12, y: 100, stepX: 70 }, //trash is offset from gas so playe has to weave through it
  });

  // this.physics.add.collider(trash, player); // can be modified to collect gas
  this.physics.add.collider(player, trash, hitTrash, null, this);

  //Audio//

  window.addEventListener("keydown", (event) => {
    const audio = document.querySelector("audio");
    audio.volume = 0.02;
    audio.loop = true;
    audio.play();
  });

  //Score//
  scoreText = this.add.text(16, 16, "score: " + scoreText, {
    fontSize: "32px",
    fill: "#000",
  });

  //Animation//
  //player//
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //Explosion animation//
  this.anims.create({
    key: "explode",
    frames: this.anims.generateFrameNumbers("explosion"),
    frameRate: 20,
    repeat: 0,
    hideOnComplete: true,
  });

  //this.dude.setInteractive();
  //this.input.on("gameobjectdown", this.hitTrash, this);
  //Movement//
  cursors = this.input.keyboard.createCursorKeys();

  // var mapData = [];

  // for (var y = 0; y < mapHeight; y++) {
  //   var row = [];

  //   for (var x = 0; x < mapWidth; x++) {
  //     //  Scatter the tiles so we get more stars
  //     var tileIndex = Phaser.Math.RND.weightedPick(tiles);

  //     row.push(tileIndex);
  //   }

  //   mapData.push(row);
  // }

  // map = this.make.tilemap({ data: mapData, tileWidth: 950, tileHeight: 550 });

  // var tileset = map.addTilesetImage("tiles");
  //var layer = map.createDynamicLayer(0, tileset, 0, 0);
  //this.physics.add.collider(player, platforms);
}

function update() {
  if (gameOver) {
    //This is placed here so nothing else will run until game is started over
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-100);
  }
}

//trash//
function hitTrash(player, trash) {
  

  // trash.setTexture("explosion");
  // trash.play("explode");
  //explosion = this.game.add.sprite(player.body.x, player.body.y, "explosion");
  // explosion.anchor.setTo(0.5, 0.5);
  //explosion.animation.play("explosion");
  player.setTint(0xff0000);
  scoreText -= 10
  if (scoreText < 0) {
    this.physics.pause();
    gameOver = true;
  }
}

//Gas Cans Collection//
function collectGas(player, gas) {
  gas.destroy();
  gas.disableBody(true, true);
  //  Add and update the score
  scoreText += 10;
  scoreText = this.add.text("Score: " + scoreText);
}

//Any speed as long as 16 evenly divides by it
// sx += 4;
// distance += sx;
// if (sx === 16) {
//   //  Reset and create new strip
//   var tile;
//   var prev;
//   for (var y = 0; y < mapHeight; y++) {
//     for (var x = 1; x < mapWidth; x++) {
//       tile = map.getTileAt(x, y);
//       prev = map.getTileAt(x - 1, y);
//       prev.index = tile.index;
//       if (x === mapWidth - 1) {
//         tile.index = Phaser.Math.RND.weightedPick(tiles);
//       }
//     }
//   }
//   sx = 1;
// }
// this.cameras.main.scrollY = sx;
// }

//To do next,
//-- Collect gas
// -- make meter that can fill
//--This makes score go up
//-- Collide with trash
//--
//collision- explosion (struggling to get the animation to work)
