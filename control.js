function Control(repeatDelay, repeatInterval, control, callback) {
	this._repeatDelay = repeatDelay;
	this._repeatInterval = repeatInterval;
	this._repeatAt = 0;
	this._control = control;
	this._callback = callback;
	this._keyDown = false;
}

Control.prototype.pollInput = function() {
	var keyDown = controls[this._control];
	if (keyDown) {
		if (!this._keyDown) {
			var result = this._callback();
			if (result)
				this._repeatAt = game.time.now + this._repeatDelay;
			else
				this._repeatAt = 0;
		} else if (game.time.now > this._repeatAt) {
			var result = this._callback();
			if (result)
				this._repeatAt = game.time.now + this._repeatInterval;
			else
				this._repeatAt = 0;
		}
	}
	this._keyDown = keyDown;
}
