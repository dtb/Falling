var Drawable = require('./Drawable.js');
var util = require('./util.js');
var _ = require('underscore')._;

var Background = util.inherits(Drawable, {
	'image': null,
	'ready': false,
	'constructor': function(initialState) {
		this.constructor.__super__.constructor.call(this, initialState);

		this.image = new Image();
		this.image.onload = _.bind(function() {
			this.ready = true;
		}, this);
		this.image.src = 'game-bg.jpg';
	},
	'draw': function(dT, game) {
		if(!this.ready) return;
		if(this.state.y <= 0) 
			this.state.y = game.height;

		var topSegment = this.image.naturalHeight - this.state.y;

		game.backbufferContext.drawImage(this.image, 0, topSegment, this.image.naturalWidth, this.state.y, 0, 0, game.width, this.state.y);
		game.backbufferContext.drawImage(this.image, 
			/* sx */0, /* sy */ 0, 
			/* sw */ this.image.naturalWidth, /* sh */ topSegment, 
			/* dx */ 0,  /* dy */ this.state.y,
			/* dw */ game.width, /* dh */ topSegment
		);
	}
});


module.exports = Background;
