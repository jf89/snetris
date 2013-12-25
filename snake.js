function Snake(grid, body, facing) {
	this._grid = grid;
	this._facing = facing;
	this._nextFacing = facing;
	this._body = body;
	this._length = this._body.length;

	for (var i = 0; i < this._body.length; ++i)
		this._grid.setBlock(
			this._body[i].x, this._body[i].y, new Block(true, true, TILES.empty)
		);
	this.drawSnake();
}

Snake.prototype.move = function() {
	this._facing = this._nextFacing;
	var dx = 0, dy = 0;
	if      (this._facing == RIGHT) dx = 1;
	else if (this._facing == DOWN)  dy = 1;
	else if (this._facing == LEFT)  dx = -1;
	else                            dy = -1;

	var head = { x: this._body[0].x, y: this._body[0].y };

	if (this._grid.blockAt(head.x + dx, head.y + dy).canCollide) {
		var tail = this._body[this._body.length - 1];
		if (head.x + dx != tail.x || head.y + dy != tail.y) {
			state.gameOver();
			return;
		}
	}
	head.x += dx;
	head.y += dy;

	if (this._length <= this._body.length) {
		var tail = this._body.pop();
		this._grid.setBlock(tail.x, tail.y, new Block(false, false, TILES.empty));
	}

	this._body.unshift({ x: head.x, y: head.y });
	this._grid.setBlock(head.x, head.y, new Block(true, true, TILES.empty));

	state.clearLines();

	state.scorer.snakeLength(this._body.length);
	this.drawSnake();
}

Snake.prototype.faceRight = function() {
	if (this._facing != LEFT)
		this._nextFacing = RIGHT;
}

Snake.prototype.faceDown = function() {
	if (this._facing != UP)
		this._nextFacing = DOWN;
}

Snake.prototype.faceLeft = function() {
	if (this._facing != RIGHT)
		this._nextFacing = LEFT;
}

Snake.prototype.faceUp = function() {
	if (this._facing != DOWN)
		this._nextFacing = UP;
}

Snake.prototype.clearLine = function(j) {
	if (this._body.length == 0)
		return;
	if (j == this._body[0].y)
		state.gameOver();
	var i = 0;
	while (i < this._body.length && this._body[i].y != j) ++i;
	if (i < this._body.length) {
		var newBody = new Array(i);
		for (var k = 0; k < i; ++k)
			newBody[k] = this._body[k];
		this._length -= this._body.length - newBody.length;
		this._body = newBody;
	}
	for (var i = 0; i < this._body.length; ++i)
		if (this._body[i].y < j)
			this._body[i].y += 1;
}

Snake.prototype.drawSnake = function() {
	if (this._body.length == 0)
		return;
	if (this._body.length == 1) {
		var sprite;
		if      (this._facing == DOWN)  sprite = SNAKE_SPRITES.as;
		else if (this._facing == LEFT)  sprite = SNAKE_SPRITES.aw;
		else if (this._facing == RIGHT) sprite = SNAKE_SPRITES.ae;
		else                            sprite = SNAKE_SPRITES.an;
		this._grid.setSprite(this._body[0].x, this._body[0].y, sprite);
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

Snake.prototype.increaseLength = function() {
	this._length += 1;
}
