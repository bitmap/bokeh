var gulp = require('gulp');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pixrem = require('gulp-pixrem');
var jshint = require('gulp-jshint');
var uglify = require("gulp-uglify");


gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('./src/bokeh.css')
    .pipe(postcss(processors))
    .pipe(pixrem())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint({laxcomma:true}))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./dist'));
});

// gulp.task('min', function() {
//   return gulp.src('/dist/bokeh.js')
//   .pipe(uglify())
//   .pipe(rename('/bokeh.min.js'))
// })
