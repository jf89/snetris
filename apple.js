function makeApple(grid) {
	var acceptableTiles = [];
	for (var i = 0; i < grid.width; ++i) {
		for (var j = 0; j < grid.height; ++j) {
			var block = grid.blockAt(i, j);
			if (!block.canCollide && isPositionAllowed(i, j)) {
				acceptableTiles.push({ x: i, y: j });
			}
		}
	}
	var acceptableTile = acceptableTiles[Math.floor(Math.random() * acceptableTiles.length)];
	var apple = new Block(true, false, TILES.apple, true);
	apple.eat = BONUSES[Math.floor(Math.random() * BONUSES.length)];
	grid.setBlock(acceptableTile.x, acceptableTile.y, apple);

	function isPositionAllowed(x, y) {
		for (var i = 0; i < BLACKLISTED_POSITIONS.length; ++i) {
			if (x === BLACKLISTED_POSITIONS[i].x && y === BLACKLISTED_POSITIONS[i].y) {
				return false;
			}
		}
		return true;
	}
}
