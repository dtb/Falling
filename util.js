_.mixin({
	'randBetween': function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	'round': function(numbah, digitz) {
		var scalesies = Math.pow(10, digitz);
		return Math.floor(numbah * scalesies) / scalesies;
	},
	'isPrimitive': function(val) {
		return _.isString(val) || _.isNumber(val);
	},
	'sign': function(x) {
		return Math.abs(x) / x;
	},
	'repeatStr': function(str, times) {
		return new Array(times + 1).join(str);
	},
	'inherits': function(parent, protoProps, staticProps) {
		var child;

		var ctor = function(){};
		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && protoProps.hasOwnProperty('constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ parent.apply(this, arguments); };
		}

		// Inherit class (static) properties from parent.
		_.extend(child, parent);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();

		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) _.extend(child.prototype, protoProps);

		// Add static properties to the constructor function, if supplied.
		if (staticProps) _.extend(child, staticProps);

		// Correctly set child's `prototype.constructor`.
		child.prototype.constructor = child;

		// Set a convenience property in case the parent's prototype is needed later.
		child.__super__ = parent.prototype;

		return child;
	}
});
