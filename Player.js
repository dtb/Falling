var util = require('./util'),
	Drawable = require('./Drawable.js');


var Player = util.inherits(Drawable, {
	acceleration: .009,
	maxSpeed:.8,
	hasGravity: true,
	update: function(dT, game) {
		if(game.inputManager.keyDown(game.inputManager.Keys.LEFT)) {
			this.state.vX -= this.acceleration * dT;
		} else if(game.inputManager.keyDown(game.inputManager.Keys.RIGHT)) {
			this.state.vX += this.acceleration * dT;
		} else if(Math.abs(this.state.vX) > 2 * this.acceleration * dT) {
			this.state.vX -= util.sign(this.state.vX)  * 2 * this.acceleration * dT;
		} else {
			this.state.vX = 0;
		}
		
		if(Math.abs(this.state.vX) > this.maxSpeed) {
			this.state.vX = util.sign(this.state.vX) * this.maxSpeed;
		}

		this.constructor.__super__.update.call(this, dT, game);
	},
	checkCollision: function(obst) {
		if(obst.type == 'obstacle' && Math.abs(this.state.y - obst.state.y) <= 11) {
			var segCollisions = obst.segments.map(function(seg) {
				return (this.state.x - 10) > seg.x && (this.state.x - 10) < (seg.x + seg.width) ||
					(this.state.x + 10) > seg.x && (this.state.x + 10) < (seg.x + seg.width)
			}, this);

			return segCollisions.some(function(c) { return c; });
		}

		if (obst.type == 'wall') {
			if (obst.state.direction == 'vertical' && Math.abs(this.state.x - obst.state.x) < 10) {
				return true;
			} else if (obst.state.direction == 'horizontal' && Math.abs(this.state.y - obst.state.y) < 10) {
				return true;
			}
		}

		return false;
	},
	handleCollision: function(obst, game) {
		if (obst.type == 'obstacle') {
			this.state.vY = obst.state.vY;
			this.state.y = obst.state.y - 11;
		} else if (obst.type == 'wall') {
			if (obst.state.direction == 'vertical') {
				this.state.vX = 0;
				this.state.x = Math.abs(obst.state.x - 10);
			} else if (obst.state.direction == 'horizontal') {
				if (obst.state.isTop) {
					game.stop = true;
				} else {
					this.state.vY = 0;
					this.state.y = Math.abs(obst.state.y - 10);
				}
			}
		}
	},
	draw: function(dT, game) {
		game.backbufferContext.save();
		game.backbufferContext.strokeStyle = "#47C600";

		game.backbufferContext.beginPath(this.state.x, this.state.y);
		game.backbufferContext.arc(this.state.x, this.state.y, 10, 0,  2 * Math.PI);

		game.backbufferContext.stroke();
		game.backbufferContext.restore();

		game.backbufferContext.restore();
	}
});

module.exports = Player;
