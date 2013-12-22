function ActiveBlock(grid, x, y, shape, sprite) {
	this._grid = grid;
	this._x = x;
	this._y = y;
	this._shape = shape;
	this._sprite = sprite;
	this._addToGrid(false);
}

ActiveBlock.prototype.fall = function() {
	this._removeFromGrid();
	this._y += 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._y -= 1;
		this._addToGrid(true);
		return false;
	}
	this._addToGrid(false);
	return true;
}

ActiveBlock.prototype.rotateClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateClockwise();
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._shape.rotateCounterClockwise();
		this._addToGrid(false);
		return false;
	}
	this._addToGrid(false);
	return true;
}

ActiveBlock.prototype.rotateCounterClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateCounterClockwise();
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._shape.rotateClockwise();
		this._addToGrid(false);
		return false;
	}
	this._addToGrid(false);
	return true;
}

ActiveBlock.prototype.moveLeft = function() {
	this._removeFromGrid();
	this._x -= 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._x += 1;
		this._addToGrid(false);
		return false;
	}
	this._addToGrid(false);
	return true;
}

ActiveBlock.prototype.moveRight = function() {
	this._removeFromGrid();
	this._x += 1;
	if (this._shape.checkCollision(this._grid, this._x, this._y)) {
		this._x -= 1;
		this._addToGrid(false);
		return false;
	}
	this._addToGrid(false);
	return true;
}

ActiveBlock.prototype._addToGrid = function(canLine) {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j])
				this._grid.setBlock(
					this._x + i, this._y + j,
					new Block(true, canLine, this._sprite)
				);
}

ActiveBlock.prototype._removeFromGrid = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape.shape[i][j])
				this._grid.setBlock(
					this._x + i, this._y + j,
					new Block(false, false, TILES.empty)
				);
}
