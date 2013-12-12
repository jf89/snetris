function ActiveBlock(grid, x, y, shape) {
	this._grid = grid;
	this._x = x;
	this._y = y;
	this._shape = new Shape(shape);
}

ActiveBlock.prototype.fall = function() {
	this._removeFromGrid();
	this._y += 1;
	var collision = this._checkCollision();
	if (collision)
		this._y -= 1;
	this._addToGrid();
	return !collision;
}

ActiveBlock.prototype.rotateClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateClockwise();
	var collision = this._checkCollision();
	if (collision)
		this._shape.rotateCounterClockwise();
	this._addToGrid();
	return !collision;
}

ActiveBlock.prototype.rotateCounterClockwise = function() {
	this._removeFromGrid();
	this._shape.rotateCounterClockwise();
	var collision = this._checkCollision();
	if (collision)
		this._shape.rotateClockwise();
	this._addToGrid();
	return !collision;
}

ActiveBlock.prototype.moveLeft = function() {
	this._removeFromGrid();
	this._x -= 1;
	var collision = this._checkCollision();
	if (collision)
		this._x += 1;
	this._addToGrid();
	return !collision;
}

ActiveBlock.prototype.moveRight = function() {
	this._removeFromGrid();
	this._x += 1;
	var collision = this._checkCollision();
	if (collision)
		this._x -= 1;
	this._addToGrid();
	return !collision;
}

ActiveBlock.prototype._addToGrid = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape[i][j])
				this._grid[this._x + i][this._y + j] = true;
}

ActiveBlock.prototype._removeFromGrid = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape[i][j])
				this._grid[this._x + i][this._y + j] = false;
}

ActiveBlock.prototype._checkCollision = function() {
	for (var i = 0; i < this._shape.size; ++i)
		for (var j = 0; j < this._shape.size; ++j)
			if (this._shape[i][j] && this._grid[this._x + i][this._y + j])
				return true;
	return false;
}
