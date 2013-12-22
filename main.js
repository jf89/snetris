var game = new Phaser.Game(160, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var state;

function preload() {
	game.load.tileset('tileset', 'snetris.png', 16, 16, -1, 0, 0);
}

function create() {
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
