var gulp = require('gulp');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pixrem = require('pixrem');
var cssmin = require('gulp-cssmin');
var uglify = require("gulp-uglify");
var jshint = require('gulp-jshint');
var mochaPhantomJS = require("gulp-mocha-phantomjs");

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    pixrem()
  ];
  return gulp.src('./src/bokeh.css')
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/bokeh.js')
    .pipe(jshint({laxcomma:true}))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {
  return gulp.src('test/index.htm')
  .pipe(mochaPhantomJS());
});

gulp.task('default', ['css', 'js', 'test'])
