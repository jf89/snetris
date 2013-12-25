var game = new Phaser.Game(
	640, 640, Phaser.CANVAS, 'snetris',
	{ preload: preload, create: create, update: update }
);

var state;

function preload() {
	game.load.tileset('tileset', 'snetris.png', 16, 16, -1, 0, 0);
}

function create() {
	//game.stage.backgroundColor = '#888';
	Phaser.Canvas.setSmoothingEnabled(game.context, false);
	input.create();
	state = new GameState();
	state.init();
}

function update() {
	input.update();
	state.update();
}

function changeState(newState) {
	state.destroy();
	newState.init();
	state = newState;
}
