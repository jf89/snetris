function Shape(shape) {
	this.size = shape.length;
	this.grid = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		this.grid[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j) {
			// We transpose these coordinates here so that a shape written as:
			// [ [0, 1, 0],
			//   [1, 1, 0],
			//   [0, 1, 0] ]
			// has values in x, y positions as it visually appears to as above.
			this.grid[i][j] = shape[j][i];
		}
	}
}

Shape.prototype.rotateClockwise = function() {
	var newGrid = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		newGrid[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j)
			newGrid[i][j] = grid[j][this.size - i - 1];
	}
	this.grid = newGrid;
}

Shape.prototype.rotateCounterClockwise = function() {
	var newGrid = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		newGrid[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j)
			newGrid[i][j] = grid[this.size - j - 1][i];
	}
	this.grid = newGrid;
}
