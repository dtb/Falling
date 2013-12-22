Falling.Wall = _.inherits(Falling.Drawable, {
	'constructor': function(spec) {
		this.state = _.extend({ },
			this.state,
			spec
		);
	},
	'draw': function(dT, game) { },
	'type': 'wall'
});
