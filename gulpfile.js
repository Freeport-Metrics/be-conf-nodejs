var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var static_resources = require('./config/static_resources')(__dirname);
var rev = require('gulp-rev');

function buildJS() {
  return gulp.src(static_resources.js)
      .pipe(uglify({mangle: false}))
      .pipe(concat('all.min.js'))
    //.pipe( rev() )
      .pipe(gulp.dest('./public/dist'))
}

function buildCSS() {
  return gulp.src(static_resources.css)
      .pipe(cssnano())
      .pipe(concat('all.min.css'))
    //.pipe( rev() )
      .pipe(gulp.dest('./public/dist'))
}

function buildFonts(){
  return gulp.src(
    './node_modules/font-awesome/fonts/fontawesome-webfont.*')
      .pipe(gulp.dest('./public/fonts/'));
}

gulp.task('js', buildJS);
gulp.task('css', buildCSS)
gulp.task('fonts', buildFonts)
gulp.task('default', ['js', 'css', 'fonts'], function () {
});

module.exports = function(){
  return {
    css: buildCSS,
    js: buildJS,
    fonts: buildFonts
  };
}