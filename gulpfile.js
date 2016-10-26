'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    lodash = require('lodash'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	babel = require('babelify'),
	gutil = require('gulp-util'),
	source = require('vinyl-source-stream');

gulp.task('watch', function () {

    gulp.watch('styles/src/**/*.scss', ['sass']);
    gulp.watch('scripts/src/**/*.js', ['js']);

});

gulp.task('sass', function () {

    var sass_options = {
            outputStyle: 'expanded'
        };

    var postcss_options = [
            autoprefixer({browsers: ['last 4 version']})
        ];

    return gulp.src('styles/src/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass(sass_options).on('error', sass.logError))
            .pipe(postcss(postcss_options))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('styles/dest/'));

});

gulp.task('js', function(){

	return compile(true);
});

function compile(watch) {
  var bundler = watchify(browserify('./scripts/src/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./scripts/dest/'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}
