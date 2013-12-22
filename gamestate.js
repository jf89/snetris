function GameState() {
}

GameState.prototype.init = function() {
	this._grid = new Grid(WIDTH, HEIGHT);
	this._snake = new Snake(this._grid, WIDTH/2, HEIGHT - 1);
	this._tetrisStartDrop();

	controls = [
		new Control(500, 50, ['tetrisUp', 'tetrisRotRight'],
			function() { return state._activeBlock.rotateClockwise(); }),
		new Control(500, 50, ['tetrisRotLeft'],
			function() { return state._activeBlock.rotateCounterClockwise(); }),
		new Control(500, 50, ['tetrisLeft'],
			function() { return state._activeBlock.moveLeft(); }),
		new Control(500, 50, ['tetrisRight'],
			function() { return state._activeBlock.moveRight(); }),
		new Control(500, 50, ['tetrisDown'],
			function() { return state._tetrisDoMove(); }),
		new Control(500, 50, ['tetrisSlam'],
			function() { while(state._tetrisDoMove()); return true; }),

		//new TapControl(['snakeUp'],    0, snakeUp),
		//new TapControl(['snakeLeft'],  0, snakeLeft),
		//new TapControl(['snakeDown'],  0, snakeDown),
		//new TapControl(['snakeRight'], 0, snakeRight)
	];

	this._repeaters = {
		tetrisMove: new Repeater(500, function() { state._tetrisDoMove(); }),
		snakeMove:  new Repeater(400, function() { state._snake.move(); })
	};
}

GameState.prototype.update = function() {
	for (var repeater in this._repeaters)
		this._repeaters[repeater].update();
}

GameState.prototype.destroy = function() {
	this._grid.destroy();
}

GameState.prototype._tetrisStartDrop = function() {
	this._clearLines();
	var type = Math.floor(Math.random() * BLOCKS.length);
	var shape = new Shape(BLOCKS[type].shape);
	var spriteSource = BLOCKS[type].sprite;
	var x = Math.floor((10 - shape.size) / 2);
	var y = 0;
	if (shape.checkCollision(this._grid, x, y)) {
		// TODO: Game over
	} else
		this._activeBlock = new ActiveBlock(this._grid, x, y, shape);
}

GameState.prototype._tetrisDoMove = function() {
	if (this._activeBlock.fall())
		return true;
	this._tetrisStartDrop();
	return false;
}

GameState.prototype._clearLines = function() {
	var grid = this._grid;

	function lineFull(j) {
		for (var i = 0; i < 10; ++i)
			if (!grid.blockAt(i, j).canLine)
				return false;
		return true;
	}

	function deleteLine(j) {
		for (var i = 0; i < 10; ++i) {
			for (var k = j; k > 0; --k)
				grid.setBlock(i, k, grid.blockAt(i, k - 1));
			grid.setBlock(i, 0, new Block(false, false, 1));
		}
	}

	var j = 20;
	while (j) {
		if (lineFull(j - 1)) {
			deleteLine(j - 1);
			if (j - 1 > snake._y)
				snake.dropOne();
		}
		else
			--j;
	}
}
