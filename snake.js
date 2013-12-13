function Snake(grid, spriteGrid, spriteSource, x, y) {
	this._grid = grid;
	this._spriteGrid = spriteGrid;
	this._spriteSource = spriteSource;
	this._x = x;
	this._y = y;
	this._facing = 0;
	this._body = [x, y, x - 1, y];

	grid[x][y] = true;
	var sprite = spriteSource.hn.getFirstExists(false);
	sprite.reset(x * 16 - 16, y * 16 - 16);
	spriteGrid[x - 1][y - 1] = sprite;

	grid[x - 1][y] = true;
	var sprite = spriteSource.hn.getFirstExists(false);
	sprite.reset(x * 16 - 16, y * 16 - 16);
	spriteGrid[x - 2][y - 1] = sprite;
}

Snake.prototype.move = function() {
	var dx = 0, dy = 0;
	if (this._facing == 0)
		dx = 1;
	else if (this._facing == 1)
		dy = 1;
	else if (this._facing == 2)
		dx = -1;
	else
		dy = -1;
	if (grid[this._x + dx][this._y + dy])
		return false;

	this._x += dx;
	this._y += dy;
	this._body.unshift(this._x, this._y);

	var y = this._body.pop(), x = this._body.pop();
	this._spriteGrid[x - 1][y - 1].kill();
	this._grid[x][y] = false;

	var sprite = this._spriteSource.hn.getFirstExists(false);
	sprite.reset(this._x * 16 - 16, this._y * 16 - 16);
	this._spriteGrid[this._x - 1][this._y - 1] = sprite;
	this._grid[this._x][this._y] = true;
}

Snake.prototype.faceRight = function() {
	this._facing = 0;
}

Snake.prototype.faceDown = function() {
	this._facing = 1;
}

Snake.prototype.faceLeft = function() {
	this._facing = 2;
}

Snake.prototype.faceUp = function() {
	this._facing = 3;
}

Snake.prototype.dropOne = function() {
	var newBody = new Array(this._body.length);
	for (var i = 0; i < this._body.length / 2; ++i) {
		newBody[i * 2]     = this._body[i * 2];
		newBody[i * 2 + 1] = this._body[i * 2 + 1] + 1;
	}
	console.log(this._body.toString());
	console.log(newBody.toString());
	this._body = newBody;
	this._y += 1;
}
