function Tail(grid, body) {
	this._grid = grid;
	this._body = body;
	for (var i = 0; i < this._body.length; ++i)
		this._grid.setBlock(
			this._body[i].x, this._body[i].y, new Block(true, true, TILES.empty)
		);
	this.draw();
}

Tail.prototype.clearLine = function(line) {
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

	var result = [];
	for (var i = 0; i < bodies.length; ++i) {
		for (var j = 0; j < bodies[i].length; ++j) {
			if (bodies[i][j].y < line) bodies[i][j].y += 1;
		}
		result.push(new Tail(this._grid, bodies[i]));
	}

	return result;
};

Tail.prototype.draw = function() {
	var sprites = utils.getSpritesForSnake(this._body, TAIL_SPRITES, this._facing);
	for (var i = 0; i < sprites.length; ++i) {
		this._grid.setSprite(this._body[i].x, this._body[i].y, sprites[i]);
	}
};
