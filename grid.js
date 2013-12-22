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
	this._tilemap = this.createTilemap(width, height);
	this._tileset = game.add.tileset('tileset');
	this._layer = game.add.tilemapLayer(
		0, 0, 16 * width, 16 * height,
		this._tileset, this._tilemap, 0
	);
}

Grid.prototype.createTilemap = function(width, height) {
	var tilemap = new Phaser.Tilemap(game);
	tilemap.create('tilemap', width, height);
	for (var i = 0; i < width; ++i)
		for (var j = 0; j < height; ++j)
			tilemap.putTile(TILES.empty, i, j);
	return tilemap;
}

Grid.prototype.destroy = function() {
	this._tilemap.destroy();
	this._tileset.destroy();
	this._layer.destroy();
}

Grid.prototype.blockAt = function(i, j) {
	return this._grid[i + 1][j + 1];
}

Grid.prototype.setBlock = function(i, j, block) {
	this._tilemap.putTile(block.sprite, i, j);
	this._grid[i + 1][j + 1] = block;
}
