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

		this.rx = (1 + Math.abs(this.state.vX / this.maxSpeed) * .7) * 10;
		this.ry = (1 - Math.abs(this.state.vX / this.maxSpeed) * .2) * 10;

		this.constructor.__super__.update.call(this, dT, game);
	},
	checkCollision: function(obst) {
		if(obst.type == 'obstacle' && Math.abs(this.state.y - obst.state.y) <= (this.ry + 1)) {
			var segCollisions = obst.segments.map(function(seg) {
				return (this.state.x - this.rx) > seg.x && (this.state.x - this.rx) < (seg.x + seg.width) ||
					(this.state.x + this.rx) > seg.x && (this.state.x + this.rx) < (seg.x + seg.width)
			}, this);

			return segCollisions.some(function(c) { return c; });
		}

		if (obst.type == 'wall') {
			if (obst.state.direction == 'vertical' && Math.abs(this.state.x - obst.state.x) < this.rx) {
				return true;
			} else if (obst.state.direction == 'horizontal' && Math.abs(this.state.y - obst.state.y) < this.ry) {
				return true;
			}
		}

		return false;
	},
	handleCollision: function(obst, game) {
		if (obst.type == 'obstacle') {
			this.state.vY = obst.state.vY;
			this.state.y = obst.state.y - (this.ry + 1);
		} else if (obst.type == 'wall') {
			if (obst.state.direction == 'vertical') {
				this.state.vX = 0;
				this.state.x = Math.abs(obst.state.x - this.rx);
			} else if (obst.state.direction == 'horizontal') {
				if (obst.state.isTop) {
					game.stop = true;
				} else {
					this.state.vY = 0;
					this.state.y = Math.abs(obst.state.y - this.ry);
				}
			}
		}
	},
	draw: function(dT, game) {
		game.backbufferContext.save();
		game.backbufferContext.strokeStyle = "#47C600";

		game.backbufferContext.beginPath();
		game.backbufferContext.ellipse(this.state.x, this.state.y, this.rx, this.ry, 0, 0, 2 * Math.PI, false);

		game.backbufferContext.stroke();
		game.backbufferContext.restore();

		game.backbufferContext.restore();
	}
});

module.exports = Player;
