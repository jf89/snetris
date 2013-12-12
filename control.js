function Control(repeatDelay, repeatInterval, controls, callback) {
	this._repeatDelay = repeatDelay;
	this._repeatInterval = repeatInterval;
	this._repeatAt = 0;
	this._controls = controls;
	this._callback = callback;
	this._doneOnce = false;
}

Control.prototype.pollInput = function() {
	var keyDown = false;
	for (var i = 0; i < this._controls.length; ++i)
		keyDown |= keymap[this._controls[i]].isDown;
	if (keyDown) {
		if (!this._doneOnce) {
			var result = this._callback();
			if (result) {
				this._repeatAt = game.time.now + this._repeatDelay;
				this._doneOnce = true;
			}
		} else if (game.time.now > this._repeatAt) {
			var result = this._callback();
			if (result)
				this._repeatAt = game.time.now + this._repeatInterval;
		}
	} else
		this._doneOnce = false;
}
