var util = require('./util.js'),
	Drawable = require('./Drawable.js'),
	_ = require('underscore')._;

var Wall = util.inherits(Drawable, {
	constructor: function(spec) {
		this.state = _.extend({ },
			this.state,
			spec
		);
	},
	draw: function(dT, game) { },
	type: 'wall'
});

module.exports = Wall;
