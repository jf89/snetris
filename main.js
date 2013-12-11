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

// Tetris stuff
var BLOCKS = [
	{
		"sprite": "block_r.png",
		"shape": [
			[ 1, 1 ],
			[ 1, 1 ]
		]
	},
	{
		"sprite": "block_g.png",
		"shape": [
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[ 0, 0, 0 ]
		]
	},
	{
		"sprite": "block_b.png",
		"shape": [
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 0, 1, 0 ]
		]
	},
	{
		"sprite": "block_y.png",
		"shape": [
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ]
		]
	},
	{
		"sprite": "block_c.png",
		"shape": [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ]
		]
	},
	{
		"sprite": "block_w.png",
		"shape": [
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 1 ]
		]
	},
	{
		"sprite": "block_n.png",
		"shape": [
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 1, 0, 0 ]
		]
	}
];

var fallingBlock = {};
var nextTetrisMove = 0;
var tetrisMoveInterval = 1000;


function preload() {
	game.load.atlas('snetris', 'snetris.png', 'snetris.json');
}

function create() {
	// Initialise controls
	for (var key in controls)
		controls[key] = game.input.keyboard.addKey(controls[key]);
	// Initialise blocks
	for (var i = 0; i < BLOCKS.length; ++i) {
		BLOCKS[i]['shape'] = computeRotations(BLOCKS[i]['shape']);
		var spriteGroup = game.add.group();
		spriteGroup.createMultiple(200, 'snetris', BLOCKS[i]['sprite']);
		BLOCKS[i]['sprite'] = spriteGroup;
	}
	grid = new Array(10);
	for (var i = 0; i < 10; ++i)
		grid[i] = new Array(20);

	// Draw grid
	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0x00ff00);
	graphics.lineStyle(1, 0x00ff00, 1);
	for (var i = 0; i < 11; ++i) {
		graphics.moveTo(i * 16, 0);
		graphics.lineTo(i * 16, 320);
	}
	for (var i = 0; i < 21; ++i) {
		graphics.moveTo(0, i * 16);
		graphics.lineTo(160, i * 16);
	}
	graphics.endFill();

	// Start game
	tetrisStartDrop();
}

function computeRotations(block) {
	var dim = block.length;
	var a = new Array(dim);
	var b = new Array(dim);
	var c = new Array(dim);
	var d = new Array(dim);
	for (var i = 0; i < dim; ++i) {
		a[i] = new Array(dim);
		b[i] = new Array(dim);
		c[i] = new Array(dim);
		d[i] = new Array(dim);
	}
	for (var i = 0; i < dim; ++i)
		for (var j = 0; j < dim; ++j) {
			a[i]          [j]           = block[j][i];
			b[dim - j - 1][i]           = block[j][i];
			c[dim - i - 1][dim - j - 1] = block[j][i];
			d[j]          [dim - i - 1] = block[j][i];
		}
	return [a, b, c, d];
}

function update() {
	if (game.time.now > nextTetrisMove) {
		nextTetrisMove += tetrisMoveInterval;
		tetrisDoMove();
	}
}

function tetrisStartDrop() {
	var type = Math.floor(Math.random() * BLOCKS.length);
	var rotation = 0;
	var shape = BLOCKS[type]['shape'][rotation];
	var x = Math.floor((10 - shape.length) / 2);
	var y = 0;
	fallingBlock['type'] = type;
	fallingBlock['rotation'] = 0;
	fallingBlock['x'] = x;
	fallingBlock['y'] = y;
	var sprites = [];
	for (var i = 0; i < shape.length; ++i)
		for (var j = 0; j < shape.length; ++j)
			if (shape[i][j]) {
				var sprite = BLOCKS[type]['sprite'].getFirstExists(false);
				sprite.reset((x + i) * 16, (y + j) * 16);
				sprites.push(sprite);
			}
	fallingBlock['sprites'] = sprites;
}

function tetrisDoMove() {
	sprites = fallingBlock['sprites'];
	for (var i = 0; i < sprites.length; ++i)
		sprites[i].y += 16;
}
