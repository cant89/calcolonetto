'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', function () {

    gulp.watch('styles/src/**/*.scss', ['sass']);

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
