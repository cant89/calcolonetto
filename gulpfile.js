'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass')
    ,
    lodash = require('lodash'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	gutil = require('gulp-util'),
	source = require('vinyl-source-stream');

gulp.task('watch', function () {

    gulp.watch('styles/src/**/*.scss', ['sass'], ['js']);

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
	
	var opts = {
		entries: ['./scripts/main.js'],
		debug: true
	};
	

	var b =	watchify(browserify(opts));
			
	return b.bundle()
	    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	    .pipe(source('bundle.js'))
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./dist'));
});