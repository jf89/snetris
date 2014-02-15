function GameState() {
	this._isGameOver = false;
}

GameState.prototype.init = function() {
	this.scorer = new Scorer();
	this._grid = new Grid(WIDTH, HEIGHT);
	this._snake = new Snake(
		this._grid,
		[{ x: WIDTH / 2, y: HEIGHT - 1 }, { x: WIDTH / 2 - 1, y: HEIGHT - 1 }],
		RIGHT,
		this.scorer
	);
	this._tetrisStartDrop();
	this._blocks = [this._snake];
	this._level = 1;
	this._lines = 0;

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

		new TapControl(['tetrisSlam'], 0,
			function() { while(state._tetrisDoMove()); return true; }),

		new TapControl(['snakeUp'],    0, function() { state._snake.faceUp(); }),
		new TapControl(['snakeLeft'],  0, function() { state._snake.faceLeft(); }),
		new TapControl(['snakeDown'],  0, function() { state._snake.faceDown(); }),
		new TapControl(['snakeRight'], 0, function() { state._snake.faceRight(); })
	];

	this._repeaters = {
		tetrisMove: new Repeater(500, function() { state._tetrisDoMove(); }),
		snakeMove:  new Repeater(400, function() { state._snake.move(); })
	};
};

GameState.prototype.update = function() {
	if (!this._isGameOver) {
		for (var repeater in this._repeaters)
			this._repeaters[repeater].update();
		this.scorer.update();
	} else
		changeState(new GameState());
};

GameState.prototype.destroy = function() {
	this._grid.destroy();
	this.scorer.destroy();
};

GameState.prototype._tetrisStartDrop = function() {
	var lines = this.clearLines();
	if (lines) {
		this.scorer.startCombo();
	} else {
		this.scorer.endCombo();
	}
	var type = Math.floor(Math.random() * BLOCKS.length);
	var shape = new Shape(BLOCKS[type].shape);
	var spriteSource = BLOCKS[type].sprite;
	var x = Math.floor((10 - shape.size) / 2);
	var y = 0;
	if (shape.checkCollision(this._grid, x, y))
		this.gameOver();
	else
		this._activeBlock = new ActiveBlock(this._grid, x, y, shape, BLOCKS[type].sprite);
};

GameState.prototype._tetrisDoMove = function() {
	if (this._activeBlock.fall())
		return true;
	this._tetrisStartDrop();
	return false;
};

GameState.prototype.clearLines = function() {
	var grid = this._grid;

	function lineFull(j) {
		for (var i = 0; i < 10; ++i)
			if (!grid.blockAt(i, j).canLine)
				return false;
		return true;
	}

	function deleteLine(j) {
		// TODO: deprecate this in favour of blocks which delete lines
		for (var i = 0; i < 10; ++i) {
			for (var k = j; k > 0; --k)
				grid.setBlock(i, k, grid.blockAt(i, k - 1));
			grid.setBlock(i, 0, new Block(false, false, TILES.empty));
		}
	}

	var j = 20;
	var linesCleared = 0;
	while (j) {
		if (lineFull(j - 1)) {
			var newBlocks = [];
			deleteLine(j - 1);
			for (var i = 0; i < this._blocks.length; ++i) {
				var bs = this._blocks[i].clearLine(j - 1);
				newBlocks.push.apply(newBlocks, bs);
			}
			++linesCleared;
			this._blocks = newBlocks;
		}
		else
			--j;
	}

	this.scorer.lines(linesCleared);
	this._lines += linesCleared;
	var level = Math.floor(this._lines / 10);
	var levelUps = level - this._level;
	for (var i = 0; i < levelUps; ++i) {
		for (var key in this._repeaters) {
			this._repeaters[key].delay *= 0.8;
		}
		makeApple(grid);
	}
	this._level = level;
	return linesCleared;
};

GameState.prototype.gameOver = function() {
	this._isGameOver = true;
};
