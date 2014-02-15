function Block(canCollide, canLine, sprite, edible) {
	if (typeof edible === 'undefined') edible = false;
	this.canCollide = canCollide;
	this.canLine = canLine;
	this.sprite = sprite;
	this.edible = edible;
}
