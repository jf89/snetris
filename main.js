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
var nextTetrisRotate = 0;
var nextTetrisHori = 0;
var tetrisMoveInterval = 1000;
var tetrisControlInterval = 150;


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
	grid = new Array(12);
	for (var i = 0; i < 12; ++i) {
		grid[i] = new Array(22);
		for (var j = 0; j < 22; ++j)
			grid[i][j] = i == 0 || j == 0 || i == 11 || j == 21;
	}

	// Draw grid
	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0x00ff00);
	graphics.lineStyle(1, 0x00ff00, 1);
	for (var i = 0; i < 11; ++i) {
		graphics.moveTo(16 + i * 16, 16);
		graphics.lineTo(16 + i * 16, 336);
	}
	for (var i = 0; i < 21; ++i) {
		graphics.moveTo(16, 16 + i * 16);
		graphics.lineTo(176, 16 + i * 16);
	}
	graphics.endFill();

	// Start game
	tetrisStartDrop();
	nextTetrisMove = game.time.now + tetrisMoveInterval;
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
	var rot = controls['tetrisRotLeft'].isDown ||
		controls['tetrisRotRight'].isDown ||
		controls['tetrisUp'].isDown;
	if (rot && game.time.now > nextTetrisRotate) {
		tetrisDoRot();
	}
	var leftRight = controls['tetrisLeft'].isDown ||
		controls['tetrisRight'].isDown;
	if (leftRight && game.time.now > nextTetrisHori) {
		tetrisDoLeftRight();
	}
}

function tetrisStartDrop() {
	// TODO: check for collision
	var type = Math.floor(Math.random() * BLOCKS.length);
	var rotation = 0;
	var shape = BLOCKS[type]['shape'][rotation];
	var x = Math.ceil((10 - shape.length) / 2) + 1;
	var y = 1;
	fallingBlock['type'] = type;
	fallingBlock['rotation'] = 0;
	fallingBlock['x'] = x;
	fallingBlock['y'] = y;
	addBlockToGrid(type, x, y, shape);
	addShape(x, y, shape);
}

function addBlockToGrid(type, x, y, shape) {
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
	var x = fallingBlock['x'];
	var y = fallingBlock['y'];
	var shape = BLOCKS[fallingBlock['type']]['shape'][fallingBlock['rotation']];
	removeShape(x, y, shape);
	if (checkCollision(x, y + 1, shape)) {
		addShape(x, y, shape);
		tetrisStartDrop();
	} else {
		fallingBlock['y'] = y + 1;
		var sprites = fallingBlock['sprites'];
		for (var i = 0; i < sprites.length; ++i)
			sprites[i].y += 16;
		addShape(x, y + 1, shape);
	}
}

function checkCollision(x, y, shape) {
	for (var i = 0; i < shape.length; ++i)
		for (var j = 0; j < shape.length; ++j)
			if (shape[i][j] && grid[x + i][y + j])
				return true;
	return false;
}

function addShape(x, y, shape) {
	for (var i = 0; i < shape.length; ++i)
		for (var j = 0; j < shape.length; ++j)
			if (shape[i][j])
				grid[x + i][y + j] = true;
}

function removeShape(x, y, shape) {
	for (var i = 0; i < shape.length; ++i)
		for (var j = 0; j < shape.length; ++j)
			if (shape[i][j])
				grid[x + i][y + j] = false;
}

function tetrisDoRot() {
	var left = controls['tetrisRotRight'].isDown;
	var direction = left ? 1 : 3;
	var x = fallingBlock['x'];
	var y = fallingBlock['y'];
	var type = fallingBlock['type'];
	var rot = fallingBlock['rotation'];
	var newRot = (rot + direction) % 4;
	removeShape(x, y, BLOCKS[type]['shape'][rot]);
	if (checkCollision(x, y, BLOCKS[type]['shape'][newRot]))
		addShape(x, y, BLOCKS[type]['shape'][rot]);
	else {
		fallingBlock['rotation'] = newRot;
		addShape(x, y, BLOCKS[type]['shape'][newRot]);
		var sprites = fallingBlock['sprites'];
		for (var i = 0; i < sprites.length; ++i)
			sprites[i].kill();
		addBlockToGrid(type, x, y, BLOCKS[type]['shape'][newRot]);
		nextTetrisRotate = game.time.now + tetrisControlInterval;
	}
}

function tetrisDoLeftRight() {
	left = controls['tetrisLeft'].isDown;
	var dx = left ? -1 : 1;
	var x = fallingBlock['x'];
	var y = fallingBlock['y'];
	var shape = BLOCKS[fallingBlock['type']]['shape'][fallingBlock['rotation']];
	removeShape(x, y, shape);
	if (checkCollision(x + dx, y, shape))
		addShape(x, y, shape);
	else {
		fallingBlock['x'] += dx;
		addShape(x + dx, y, shape);
		var sprites = fallingBlock['sprites'];
		for (var i = 0; i < sprites.length; ++i)
			sprites[i].x += 16 * dx;
		nextTetrisHori = game.time.now + tetrisControlInterval;
	}
}
