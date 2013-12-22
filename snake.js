function Snake(grid, x, y) {
	this._grid = grid;
	this._x = x;
	this._y = y;
	this._facing = 0;
	this._body = [
		{ x: x,     y: y },
		{ x: x - 1, y: y }
	];

	this._grid.setBlock(x,     y, new Block(true, true, 14));
	this._grid.setBlock(x - 1, y, new Block(true, true, 14));
}

Snake.prototype.move = function() {
	var dx = 0, dy = 0;
	if      (this._facing == 0) dx = 1;
	else if (this._facing == 1) dy = 1;
	else if (this._facing == 2) dx = -1;
	else                        dy = -1;

	if (this._grid.blockAt(this._x + dx, this._y + dy).canCollide)
		return false;
	this._x += dx;
	this._y += dy;

	this._body.unshift({ x: this._x, y: this._y });
	this._grid.setBlock(this._x, this._y, new Block(true, true, 14));

	var tail = this._body.pop();
	this._grid.setBlock(tail.x, tail.y, new Block(false, false, TILES.empty));
	return true;
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

//Snake.prototype.dropOne = function() {
//	for (var i = 0; i < this._body.length; ++i)
//		this._body[i].y += 1;
//}

Snake.prototype.clearLine = function(j) {
}

Snake.prototype.drawSnake = function() {
	if (this._body.length == 1) {
		// TODO : this
	} else {
		// Draw head
		//var prev = this._body[0];
		//var next = this._body[1];
		for (var i = 1; i < this._body.length - 1; ++i) {
			var prev = this._body[i - 1];
			var cur  = this._body[i];
			var next = this._body[i + 1];
			var dx1 = cur.x - prev.x;
			var dy1 = cur.y - prev.y;
			var dx2 = next.x - cur.x;
			var dy2 = next.y - cur.y;
		}
	}
}
