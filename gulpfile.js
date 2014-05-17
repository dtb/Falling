var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

gulp.task('js', function() {
	var bundle = browserify('./Game.js').bundle({ standalone: 'Game' });

	bundle
		.pipe(source("Game.js"))
		.pipe(gulp.dest("bundle"));
});

gulp.task("watch", function() {
	gulp.watch("*.js", [ 'js' ]);
});

