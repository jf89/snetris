function TapControl(controls, repeatDelay, action) {
	this._controls = controls;
	this._canRepeat = false;
	this._repeatDelay = repeatDelay;
	this._repeatAfter = 0;
	this._action = action;
}

TapControl.prototype.update = function() {
	var controlDown = false;
	for (var i = 0; i < this._controls.length; ++i)
		if (keymap[this._controls[i]].isDown)
			controlDown = true;

	if (!this._canRepeat) {
		if (!controlDown)
			this._canRepeat = true;
	} else if (controlDown) {
		if (game.time.now > this._repeatAfter) {
			this._repeatAfter = game.time.now + this._repeatDelay;
			this._canRepeat = false;
			this._action();
		}
	}
}
