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
	if      (this._facing === RIGHT) dx = 1;
	else if (this._facing === DOWN)  dy = 1;
	else if (this._facing === LEFT)  dx = -1;
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
};

Snake.prototype.faceRight = function() {
	if (this._facing != LEFT)
		this._nextFacing = RIGHT;
};

Snake.prototype.faceDown = function() {
	if (this._facing != UP)
		this._nextFacing = DOWN;
};

Snake.prototype.faceLeft = function() {
	if (this._facing != RIGHT)
		this._nextFacing = LEFT;
};

Snake.prototype.faceUp = function() {
	if (this._facing != DOWN)
		this._nextFacing = UP;
};

Snake.prototype.clearLine = function(line) {
	if (this._body.length === 0) return;
	if (line === this._body[0].y) state.gameOver();
	var bodies = [];
	var i = 0;

	var curBody = [];
	for (var i = 0; i < this._body.length; ++i) {
		if (this._body[i].y !== line) {
			curBody.push({ x: this._body[i].x, y: this._body[i].y });
		} else if (curBody.length !== 0) {
			bodies.push(curBody);
			curBody = [];
		}
	}
	if (curBody.length !== 0) bodies.push(curBody);

	for (var i = 0; i < bodies.length; ++i) {
		for (var j = 0; j < bodies[i].length; ++j) {
			if (bodies[i][j].y < line) bodies[i][j].y += 1;
		}
	}

	var newBody = (this._body[0].y === line) ? [] : bodies.shift();
	this._length -= this._body.length - newBody.length;
	this._body = newBody;
	this.increaseLength();

	var result = [this];
	for (var i = 0; i < bodies.length; ++i) {
		result.push(new Tail(this._grid, bodies[i]));
	}
	return result;
};

Snake.prototype.drawSnake = function() {
	var sprites = utils.getSpritesForSnake(this._body, SNAKE_SPRITES, this._facing);
	for (var i = 0; i < sprites.length; ++i) {
		this._grid.setSprite(this._body[i].x, this._body[i].y, sprites[i]);
	}
};

Snake.prototype.increaseLength = function() {
	this._length += 1;
};
