var game = new Phaser.Game(160, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update });

keymap = {
	tetrisUp:       Phaser.Keyboard.E,
	tetrisDown:     Phaser.Keyboard.D,
	tetrisLeft:     Phaser.Keyboard.S,
	tetrisRight:    Phaser.Keyboard.F,
	tetrisRotLeft:  Phaser.Keyboard.W,
	tetrisRotRight: Phaser.Keyboard.R,
	tetrisSlam:     Phaser.Keyboard.SPACEBAR,

	snakeUp:        Phaser.Keyboard.I,
	snakeDown:      Phaser.Keyboard.K,
	snakeLeft:      Phaser.Keyboard.J,
	snakeRight:     Phaser.Keyboard.L,
	snakeRotLeft:   Phaser.Keyboard.U,
	snakeRotRight:  Phaser.Keyboard.O
};

var controls = [
	new Control(500, 50, ['tetrisUp', 'tetrisRotRight'], tetrisRotateClockwise),
	new Control(500, 50, ['tetrisRotLeft'],              tetrisRotateCounterClockwise),
	new Control(500, 50, ['tetrisLeft'],                 tetrisMoveLeft),
	new Control(500, 50, ['tetrisRight'],                tetrisMoveRight),
	new Control(500, 50, ['tetrisDown'],                 tetrisMoveDown),
	new Control(500, 50, ['tetrisSlam'],                 tetrisSlam)
];

var grid;
var spriteGrid;

// Tetris stuff
var BLOCKS = [
	{
		sprite: 'block_r.png',
		shape: [
			[ 1, 1 ],
			[ 1, 1 ]
		]
	},
	{
		sprite: 'block_g.png',
		shape: [
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[ 0, 0, 0 ]
		]
	},
	{
		sprite: 'block_b.png',
		shape: [
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: 'block_y.png',
		shape: [
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: 'block_c.png',
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ]
		]
	},
	{
		sprite: 'block_w.png',
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 1 ]
		]
	},
	{
		sprite: 'block_n.png',
		shape: [
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ]
		]
	}
];
var SNAKE_SPRITES = {
	hn: 'hn.png', he: 'he.png', hs: 'hs.png', hw: 'hw.png',
	tn: 'tn.png', te: 'te.png', ts: 'ts.png', tw: 'tw.png',
	ne: 'ne.png', ns: 'ns.png', nw: 'nw.png',
	se: 'se.png', sw: 'sw.png',
	ew: 'ew.png'
};

var activeBlock;
var nextDropTime;

var snake;
var nextSnakeMove;

function preload() {
	game.load.atlas('snetris', 'snetris.png', 'snetris.json');
}

function create() {
	// Initialise keymap
	for (var key in keymap)
		keymap[key] = game.input.keyboard.addKey(keymap[key]);
	// Initialise grid
	grid = new Array(12);
	for (var i = 0; i < 12; ++i) {
		grid[i] = new Array(22);
		for (var j = 0; j < 22; ++j)
			grid[i][j] = i == 0 || i == 11 || j == 21;
	}
	// Initialise sprite grid
	spriteGrid = new Array(10);
	for (var i = 0; i < 10; ++i)
		spriteGrid[i] = new Array(20);
	// Initialise tetris sprites
	for (var i = 0; i < BLOCKS.length; ++i) {
		var spriteSource = game.add.group();
		spriteSource.createMultiple(200, 'snetris', BLOCKS[i].sprite);
		BLOCKS[i].sprite = spriteSource;
	}
	// Initialise snake sprites
	for (var key in SNAKE_SPRITES) {
		var spriteSource = game.add.group();
		spriteSource.createMultiple(200, 'snetris', SNAKE_SPRITES[key]);
		SNAKE_SPRITES[key] = spriteSource;
	}

	// Start game
	tetrisStartDrop();
	nextDropTime = game.time.now + 500;

	snake = new Snake(grid, spriteGrid, SNAKE_SPRITES, 1, 20);
	nextSnakeMove = game.time.now + 500;
}

function update() {
	// Regular interval stuff
	if (game.time.now > nextDropTime) {
		tetrisDoMove();
		nextDropTime = game.time.now + 500;
	}
	if (game.time.now > nextSnakeMove) {
		snakeDoMove();
		nextSnakeMove = game.time.now + 500;
	}
	// Poll input
	for (var i = 0; i < controls.length; ++i)
		controls[i].pollInput();
}

function tetrisStartDrop() {
	clearLines();
	var type = Math.floor(Math.random() * BLOCKS.length);
	var shape = new Shape(BLOCKS[type].shape);
	var spriteSource = BLOCKS[type].sprite;
	var x = Math.floor((10 - shape.size) / 2) + 1;
	var y = 1;
	if (shape.checkCollision(grid, x, y)) {
		// TODO: Game over
	} else {
		activeBlock = new ActiveBlock(grid, spriteGrid, spriteSource, x, y, shape);
		nextDropTime = game.time.now + 500;
	}
}

function tetrisDoMove() {
	if (!activeBlock.fall())
		tetrisStartDrop();
}

function tetrisRotateClockwise() {
	return activeBlock.rotateClockwise();
}

function tetrisRotateCounterClockwise() {
	return activeBlock.rotateCounterClockwise();
}

function tetrisMoveLeft() {
	return activeBlock.moveLeft();
}

function tetrisMoveRight() {
	return activeBlock.moveRight();
}

function tetrisMoveDown() {
	tetrisDoMove();
	return true;
}

function tetrisSlam() {
	while (activeBlock.fall()) ;
	tetrisStartDrop();
	return true;
}

function snakeDoMove() {
	snake.move();
}

function clearLines() {
	function lineFull(j) {
		for (var i = 0; i < 10; ++i)
			if (!grid[i + 1][j + 1])
				return false;
		return true;
	}
	function deleteLine(j) {
		for (var i = 0; i < 10; ++i) {
			spriteGrid[i][j].kill();
			for (var k = j; k > 0; --k) {
				grid[i + 1][k + 1] = grid[i + 1][k];
				var sprite = spriteGrid[i][k - 1];
				spriteGrid[i][k] = sprite;
				if (grid[i + 1][k + 1])
					sprite.y += 16;
			}
			grid[i + 1][1] = false;
			spriteGrid[i][0] = undefined;
		}
	}
	var j = 20;
	while (j) {
		if (lineFull(j - 1))
			deleteLine(j - 1);
		else
			--j;
	}
}
