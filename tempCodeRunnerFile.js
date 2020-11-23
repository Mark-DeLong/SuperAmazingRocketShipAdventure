create({
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