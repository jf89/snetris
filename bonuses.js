BONUSES = (function () {
	return [
		swapControls,
	];

	function swapControls() {
		swapControl('tetrisUp',       'snakeUp');
		swapControl('tetrisDown',     'snakeDown');
		swapControl('tetrisLeft',     'snakeLeft');
		swapControl('tetrisRight',    'snakeRight');
		swapControl('tetrisRotLeft',  'snakeRotLeft');
		swapControl('tetrisRotRight', 'snakeRotRight');
	}

	function swapControl(x, y) {
		var temp  = keymap[x];
		keymap[x] = keymap[y];
		keymap[y] = temp;
	}
}());
