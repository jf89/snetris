function ActiveBlock(grid, spriteGrid, spriteSource, x, y, shape) {
	this._grid = grid;
	this._spriteGrid = spriteGrid;
	this._spriteSource = spriteSource;
	this._x = x;
	this._y = y;
	this._shape = shape;
	this._addSprites();
}

ActiveBlock.prototype.fall = function() {
	this._removeFromGrid();
	this._y += 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._y -= 1;
		this._addToGrid();
		return false;
	}
	this._y -= 1;
	this._removeSprites();
	this._y += 1;
	this._addSprites();
	this._addToGrid();
	return true;
}

ActiveBlock.prototype.rotateClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateClockwise();
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._shape.rotateCounterClockwise();
		return false;
	}
	this._shape.rotateCounterClockwise();
	this._removeSprites();
	this._shape.rotateClockwise();
	this._addSprites();
	this._addToGrid();
	return true;
}

ActiveBlock.prototype.rotateCounterClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateCounterClockwise();
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._shape.rotateClockwise();
		return false;
	}
	this._shape.rotateClockwise();
	this._removeSprites();
	this._shape.rotateCounterClockwise();
	this._addSprites();
	this._addToGrid();
	return true;
}

ActiveBlock.prototype.moveLeft = function() {
	this._removeFromGrid();
	this._x -= 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._x += 1;
		return false;
	}
	this._x += 1;
	this._removeSprites();
	this._x -= 1;
	this._addSprites();
	this._addToGrid();
	return true;
}

ActiveBlock.prototype.moveRight = function() {
	this._removeFromGrid();
	this._x += 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._x -= 1;
		return false;
	}
	this._x -= 1;
	this._removeSprites();
	this._x += 1;
	this._addSprites();
	this._addToGrid();
	return true;
}

ActiveBlock.prototype._addToGrid = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j])
				this._grid[this._x + i][this._y + j] = true;
}

ActiveBlock.prototype._removeFromGrid = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j])
				this._grid[this._x + i][this._y + j] = false;
}

ActiveBlock.prototype._removeSprites = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j])
				this._spriteGrid[this._x + i - 1][this._y + j - 1].kill();
}

ActiveBlock.prototype._addSprites = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j]) {
				var sprite = this._spriteSource.getFirstExists(false);
				var x = this._x + i - 1;
				var y = this._y + j - 1;
				sprite.reset(x * 16, y * 16);
				this._spriteGrid[x][y] = sprite;
			}
}
