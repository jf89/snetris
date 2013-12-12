function Shape(shape) {
	this.size = shape.length;
	this.shape = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		this.shape[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j) {
			// We transpose these coordinates here so that a shape written as:
			// [ [0, 1, 0],
			//   [1, 1, 0],
			//   [0, 1, 0] ]
			// has values in x, y positions as it visually appears to as above.
			this.shape[i][j] = shape[j][i];
		}
	}
}

Shape.prototype.rotateClockwise = function() {
	var newShape = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		newShape[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j)
			newShape[i][j] = this.shape[j][this.size - i - 1];
	}
	this.shape = newShape;
}

Shape.prototype.rotateCounterClockwise = function() {
	var newShape = new Array(this.size);
	for (var i = 0; i < this.size; ++i) {
		newShape[i] = new Array(this.size);
		for (var j = 0; j < this.size; ++j)
			newShape[i][j] = this.shape[this.size - j - 1][i];
	}
	this.shape = newShape;
}

Shape.prototype.checkCollision = function(grid, x, y) {
	for (var i = 0; i < this.size; ++i)
		for (var j = 0; j < this.size; ++j)
			if (this.shape[i][j] && grid[x + i][y + j])
				return true;
	return false;
}
