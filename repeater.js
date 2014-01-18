function Repeater(delay, action) {
	this.delay = delay;
	this._action = action;
	this._repeatAfter = game.time.now + delay;
}

Repeater.prototype.update = function() {
	if (game.time.now > this._repeatAfter) {
		this._action();
		this._repeatAfter = game.time.now + this.delay;
	}
};
