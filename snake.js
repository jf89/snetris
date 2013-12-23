function Snake(grid, x, y) {
	this._grid = grid;
	this._x = x;
	this._y = y;
	this._facing = 0;
	this._body = [
		{ x: x,     y: y },
		{ x: x - 1, y: y },
		{ x: x - 2, y: y },
		{ x: x - 3, y: y }
	];

	for (var i = 0; i < this._body.length; ++i)
		this._grid.setBlock(this._body[i].x, this._body[i].y, new Block(true, true, TILES.empty));
	this.drawSnake();
}

Snake.prototype.move = function() {
	var dx = 0, dy = 0;
	if      (this._facing == 0) dx = 1;
	else if (this._facing == 1) dy = 1;
	else if (this._facing == 2) dx = -1;
	else                        dy = -1;

	if (this._grid.blockAt(this._x + dx, this._y + dy).canCollide) {
		var tail = this._body[this._body.length - 1];
		if (this._x + dx != tail.x || this._y + dy != tail.y)
			return false;
	}
	this._x += dx;
	this._y += dy;

	var tail = this._body.pop();
	this._grid.setBlock(tail.x, tail.y, new Block(false, false, TILES.empty));

	this._body.unshift({ x: this._x, y: this._y });
	this._grid.setBlock(this._x, this._y, new Block(true, true, TILES.empty));

	this.drawSnake();
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

Snake.prototype.clearLine = function(j) {
	var i = 0;
	while (i < this._body.length && this._body[i].y != j) ++i;
	if (i < this._body.length) {
		var newBody = new Array(i);
		for (var k = 0; k < i; ++k)
			newBody[k] = this._body[k];
		this._body = newBody;
	}
	for (var i = 0; i < this._body.length; ++i)
		if (this._body[i].y < j)
			this._body[i].y += 1;
	this._x = this._body[0].x;
	this._y = this._body[0].y;
}

Snake.prototype.drawSnake = function() {
	if (this._body.length == 1) {
		// TODO : this
	} else {
		// Draw head
		var head = this._body[0];
		var next = this._body[1];
		var dx = next.x - head.x;
		var dy = next.y - head.y;
		var sprite;
		if      (dx ==  1) sprite = SNAKE_SPRITES.hw;
		else if (dx == -1) sprite = SNAKE_SPRITES.he;
		else if (dy ==  1) sprite = SNAKE_SPRITES.hn;
		else               sprite = SNAKE_SPRITES.hs;
		this._grid.setSprite(head.x, head.y, sprite);

		// Draw body
		for (var i = 1; i < this._body.length - 1; ++i) {
			var prev = this._body[i - 1];
			var cur  = this._body[i];
			var next = this._body[i + 1];
			var dx1 = prev.x - cur.x;
			var dy1 = prev.y - cur.y;
			var dx2 = next.x - cur.x;
			var dy2 = next.y - cur.y;
			var n = dy1 == -1 || dy2 == -1;
			var s = dy1 ==  1 || dy2 ==  1;
			var e = dx1 ==  1 || dx2 ==  1;
			var w = dx1 == -1 || dx2 == -1;
			var sprite;
			if      (n && e) sprite = SNAKE_SPRITES.ne;
			else if (n && s) sprite = SNAKE_SPRITES.ns;
			else if (n && w) sprite = SNAKE_SPRITES.nw;
			else if (e && w) sprite = SNAKE_SPRITES.ew;
			else if (e && s) sprite = SNAKE_SPRITES.se;
			else             sprite = SNAKE_SPRITES.sw;
			this._grid.setSprite(cur.x, cur.y, sprite);
		}

		// Draw tail
		var tail = this._body[this._body.length - 1];
		var prev = this._body[this._body.length - 2];
		var dx = prev.x - tail.x;
		var dy = prev.y - tail.y;
		var sprite;
		if      (dx ==  1) sprite = SNAKE_SPRITES.tw;
		else if (dx == -1) sprite = SNAKE_SPRITES.te;
		else if (dy ==  1) sprite = SNAKE_SPRITES.ts;
		else               sprite = SNAKE_SPRITES.tn;
		this._grid.setSprite(tail.x, tail.y, sprite);
	}
}
