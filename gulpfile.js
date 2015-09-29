var gulp = require('gulp'),
  del = require('del'),
  karma = require('gulp-karma'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('clean', function(cb) {
  del([
    './public/js'
  ], cb);
});

gulp.task('move-images', function() {
  return gulp.src('./images/**')
    .pipe(gulp.dest('./public/images'));
});

gulp.task('build-template-cache', ['clean'], function() {

  var ngHtml2Js = require("gulp-ng-html2js"),
    concat = require("gulp-concat");

  return gulp.src("./templates/*.html")
    .pipe(ngHtml2Js({
      moduleName: "hackerAssessor",
      prefix: "/templates/"
    }))
    .pipe(concat("app.templates.js"))
    .pipe(gulp.dest("./js/templates"));
});

gulp.task('test', ['build-js'], function() {
  var testFiles = [
    './tests/frontend/unit/*.js'
  ];

  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.log('karma tests failed: ' + err);
      throw err;
    });
});

gulp.task('build-js', ['clean'], function() {
  var b = browserify({
    entries: './js/app.js',
    debug: true,
    paths: ['./js/templates', './js/config', './js/run', './js/controllers', './js/services', './js/directives'],
    transform: [ngAnnotate]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(cachebust.resources())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build', ['clean', 'build-template-cache', 'build-js', 'move-images'], function() {
  return gulp.src('index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['build']);
