var utils = {
	getSpritesForSnake: function(body, sprites, facing) {
		var result = [];
		if (body.length === 0)
			return result;
		if (body.length === 1) {
			var sprite;
			if      (facing === DOWN)  sprite = sprites.as;
			else if (facing === LEFT)  sprite = sprites.aw;
			else if (facing === RIGHT) sprite = sprites.ae;
			else                             sprite = sprites.an;
			result.push(sprite);
		} else {
			// Draw head
			var head = body[0];
			var next = body[1];
			var dx = next.x - head.x;
			var dy = next.y - head.y;
			var sprite;
			if      (dx ===  1) sprite = sprites.hw;
			else if (dx === -1) sprite = sprites.he;
			else if (dy ===  1) sprite = sprites.hn;
			else                sprite = sprites.hs;
			result.push(sprite);

			// Draw body
			for (var i = 1; i < body.length - 1; ++i) {
				var prev = body[i - 1];
				var cur  = body[i];
				var next = body[i + 1];
				var dx1 = prev.x - cur.x;
				var dy1 = prev.y - cur.y;
				var dx2 = next.x - cur.x;
				var dy2 = next.y - cur.y;
				var n = dy1 === -1 || dy2 === -1;
				var s = dy1 ===  1 || dy2 ===  1;
				var e = dx1 ===  1 || dx2 ===  1;
				var w = dx1 === -1 || dx2 === -1;
				var sprite;
				if      (n && e) sprite = sprites.ne;
				else if (n && s) sprite = sprites.ns;
				else if (n && w) sprite = sprites.nw;
				else if (e && w) sprite = sprites.ew;
				else if (e && s) sprite = sprites.se;
				else             sprite = sprites.sw;
				result.push(sprite);
			}

			// Draw tail
			var tail = body[body.length - 1];
			var prev = body[body.length - 2];
			var dx = prev.x - tail.x;
			var dy = prev.y - tail.y;
			var sprite;
			if      (dx ===  1) sprite = sprites.tw;
			else if (dx === -1) sprite = sprites.te;
			else if (dy ===  1) sprite = sprites.ts;
			else                sprite = sprites.tn;
			result.push(sprite);
		}
		return result;
	},
};
