var keymap = {
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

var controls = [];

input = {
	create: function() {
		for (var key in keymap)
			keymap[key] = game.input.keyboard.addKey(keymap[key]);
	},
	update: function() {
		for (var i = 0; i < controls.length; ++i)
			controls[i].update();
	}
}