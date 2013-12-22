Falling.Obstacle = _.inherits(Falling.Drawable, {
	'segments': [],
	'constructor': function(spec, game) {
		this.state = _.extend( { }, this.state, _.pick(spec, ['y']), { vY: Falling.gameSpeed });

		this.height = spec.height;

		this.segments = [];
		if(spec.holePos < 80) {
			this.segments.push({
				'x': 80,
				'width': game.width - 80
			});
		} else if (spec.holePos > (game.width - 80)) {
			this.segments.push({
				'x': 0,
				'width': game.width - 80
			});
		} else {
			this.segments.push({
				'x': 0,
				'width': spec.holePos
			});
			this.segments.push({
				'x': spec.holePos + 80,
				'width': game.width - spec.holePos - 80
			});
		}
	},
	'draw': function(dT, game) {
		game.backbufferContext.beginPath();

		this.segments.forEach(function(seg) {
			game.backbufferContext.moveTo(seg.x, this.state.y);
			game.backbufferContext.lineTo(seg.x + seg.width, this.state.y);
			game.backbufferContext.lineTo(seg.x + seg.width, this.state.y + this.height);
			game.backbufferContext.lineTo(seg.x, this.state.y + this.height);
			game.backbufferContext.closePath();
		}, this);

		game.backbufferContext.fill();
	},
	'type': 'obstacle'
});
