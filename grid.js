function Grid(width, height) {
	this._width = width;
	this._height = height;
	this._grid = new Array(width + 2);
	for (var i = 0; i < width + 2; ++i) {
		this._grid[i] = new Array(height + 2);
		for (var j = 0; j < height + 2; ++j) {
			var canCollide = i == 0 || j == 0 || i == width + 1 || j == height + 1;
			this._grid[i][j] = new Block(canCollide, false, TILES.empty);
		}
	}
	this._tilemap           = this.createTilemap(width, height, 'tilemap');
	this._backgroundTilemap = this.createTilemap(width, height, 'backgroundTilemap');
	this._tileset = game.add.tileset('tileset');
	this._backgroundLayer = game.add.tilemapLayer(
		0, 0, 32 * width, 32 * height,
		this._tileset, this._backgroundTilemap, 0
	);
	this._foregroundLayer = game.add.tilemapLayer(
		0, 0, 32 * width, 32 * height,
		this._tileset, this._tilemap, 0
	);
	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j) {
			var isLight = (i < width / 2 && i % 3 == 2)
				|| (i >= width / 2 && (width - i) % 3 == 0);
			this._backgroundTilemap.putTile(
				isLight ? TILES.backgroundLight : TILES.backgroundDark,
				i, j
			);
		}
	this._backgroundLayer.scale = { x: 2, y: 2 };
	this._foregroundLayer.scale = { x: 2, y: 2 };
}

Grid.prototype.createTilemap = function(width, height, name) {
	var tilemap = new Phaser.Tilemap(game);
	tilemap.create(name, width, height);
	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j)
			tilemap.putTile(TILES.empty, i, j);
	return tilemap;
}

Grid.prototype.destroy = function() {
	this._tilemap.destroy();
	this._backgroundTilemap.destroy();
	//this._tileset.destroy();
	this._backgroundLayer.destroy();
	this._foregroundLayer.destroy();
}

Grid.prototype.blockAt = function(i, j) {
	return this._grid[i + 1][j + 1];
}

Grid.prototype.setBlock = function(i, j, block) {
	this._tilemap.putTile(block.sprite, i, j);
	this._grid[i + 1][j + 1] = block;
}

Grid.prototype.setSprite = function(i, j, sprite) {
	if (this._grid[i + 1][j + 1].sprite != sprite) {
		this._grid[i + 1][j + 1].sprite = sprite;
		this._tilemap.putTile(sprite, i, j);
	}
}
