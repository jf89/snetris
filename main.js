var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var controls = {
	tetrisUp:       Phaser.Keyboard.E,
	tetrisDown:     Phaser.Keyboard.D,
	tetrisLeft:     Phaser.Keyboard.S,
	tetrisRight:    Phaser.Keyboard.F,
	tetrisRotLeft:  Phaser.Keyboard.W,
	tetrisRotRight: Phaser.Keyboard.R,

	snakeUp:        Phaser.Keyboard.I,
	snakeDown:      Phaser.Keyboard.K,
	snakeLeft:      Phaser.Keyboard.J,
	snakeRight:     Phaser.Keyboard.L,
	snakeRotLeft:   Phaser.Keyboard.U,
	snakeRotRight:  Phaser.Keyboard.O,

	tetrisSlam:     Phaser.Keyboard.SPACEBAR
}

var grid;
var spriteGrid;

// Tetris stuff
var BLOCKS = [
	{
		sprite: "block_r.png",
		shape: [
			[ 1, 1 ],
			[ 1, 1 ]
		]
	},
	{
		sprite: "block_g.png",
		shape: [
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[ 0, 0, 0 ]
		]
	},
	{
		sprite: "block_b.png",
		shape: [
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: "block_y.png",
		shape: [
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ]
		]
	},
	{
		sprite: "block_c.png",
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ]
		]
	},
	{
		sprite: "block_w.png",
		shape: [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 1 ]
		]
	},
	{
		sprite: "block_n.png",
		shape: [
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ]
		]
	}
];

var activeBlock;
var nextDropTime;

function preload() {
	game.load.atlas('snetris', 'snetris.png', 'snetris.json');
}

function create() {
	// Initialise controls
	for (var key in controls)
		controls[key] = game.input.keyboard.addKey(controls[key]);
	// Initialise grid
	grid = new Array(12);
	for (var i = 0; i < 12; ++i) {
		grid[i] = new Array(22);
		for (var j = 0; j < 22; ++j)
			grid[i][j] = i == 0 || j == 0 || i == 11 || j == 21;
	}
	// Initialise sprite grid
	spriteGrid = new Array(12);
	for (var i = 0; i < 10; ++i)
		spriteGrid[i] = new Array(20);
	// Initialise tetris sprites
	for (var i = 0; i < BLOCKS.length; ++i) {
		var spriteSource = game.add.group();
		spriteSource.createMultiple(200, 'snetris', BLOCKS[i].sprite);
		BLOCKS[i].sprite = spriteSource;
	}

	// Draw grid
//	var graphics = game.add.graphics(0, 0);
//	graphics.beginFill(0x00ff00);
//	graphics.lineStyle(1, 0x00ff00, 1);
//	for (var i = 0; i < 11; ++i) {
//		graphics.moveTo(16 + i * 16, 16);
//		graphics.lineTo(16 + i * 16, 336);
//	}
//	for (var i = 0; i < 21; ++i) {
//		graphics.moveTo(16, 16 + i * 16);
//		graphics.lineTo(176, 16 + i * 16);
//	}
//	graphics.endFill();

	// Start game
	tetrisStartDrop();
	nextDropTime = game.time.now + 500;
}

function update() {
	// Temp code for testing
	if (game.time.now > nextDropTime) {
		activeBlock.fall();
		nextDropTime = game.time.now + 500;
	}
}

function tetrisStartDrop() {
	var type = Math.floor(Math.random() * BLOCKS.length);
	var shape = new Shape(BLOCKS[type].shape);
	var spriteSource = BLOCKS[type].sprite;
	var x = Math.floor((10 - shape.size) / 2) + 1;
	var y = 1;
	if (shape.checkCollision(grid, x, y)) {
		// TODO: Game over
	} else {
		activeBlock = new ActiveBlock(grid, spriteGrid, spriteSource, x, y, shape);
	}
}
