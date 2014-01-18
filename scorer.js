function Scorer() {
	this._rawScore = 0;
	this._bonusMultiplier = 1;
	//TODO: make this based on the snake!
	this._longestSnake = 2;
	this._inCombo = false;
	this._highestCombo = 0;
	this._comboScore = 0;
	this._lines = 0;
	this._level = 1;

	var font = { font: 'bold 30px Arial', fill: '#fff' };
	this._display = {
		rawScore:        game.add.text(340, 0,   '', font),
		bonusMultiplier: game.add.text(340, 50,  '', font),
		score:           game.add.text(340, 100, '', font),
		highestCombo:    game.add.text(340, 200, '', font),
		combo:           game.add.text(340, 250, '', font),
		longestSnake:    game.add.text(340, 350, '', font),
		lines:           game.add.text(340, 450, '', font),
		level:           game.add.text(340, 550, '', font)
	};
}

Scorer.prototype.lines = function(n) {
	if (Math.floor(this._lines / 10) < Math.floor((this._lines + n) / 10))
		this._level += 1;
	this._lines += n;
	if (n) {
		this._comboScore += n * this._level;
		if (this._inCombo)
			this._comboScore *= n === 4 ? 4 : 2;
		this._inCombo = true;
	} else {
		this._rawScore += this._comboScore;
		if (this._comboScore > this._highestCombo)
			this._highestCombo = this._comboScore;
		this._inCombo = false;
		this._comboScore = 0;
	}
}

Scorer.prototype.bonus = function() {
	this._bonusMultiplier *= 2;
}

Scorer.prototype.snakeLength = function(n) {
	if (n > this._longestSnake)
		this._longestSnake = n;
}

Scorer.prototype.destroy = function() {
	for (var text in this._display)
		this._display[text].destroy();
}

Scorer.prototype.score = function() {
	return (this._rawScore + this._comboScore) * this._bonusMultiplier;
}

Scorer.prototype.update = function() {
	this._display.rawScore.setText('Raw Score: ' + (this._rawScore + this._comboScore));
	this._display.bonusMultiplier.setText('Bonus Multiplier: ' + this._bonusMultiplier);
	this._display.score.setText('Score: ' + this.score());
	this._display.combo.setText('Current Combo: ' + this._comboScore);
	this._display.highestCombo.setText('Highest Combo: ' + this._highestCombo);
	this._display.lines.setText('Lines: ' + this._lines);
	this._display.longestSnake.setText('Longest Snake: ' + this._longestSnake);
	this._display.level.setText('Level: ' + this._level);
}
