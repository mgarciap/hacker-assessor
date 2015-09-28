var gulp = require('gulp'),
  del = require('del'),
  karma = require('gulp-karma'),
  jshint = require('gulp-jshint'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function(cb) {
  del([
    './public/js'
  ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// move images to public folder
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('move-images', function() {
  return gulp.src('./images/**')
    .pipe(gulp.dest('./public/images'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs karma tests
//
/////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', ['clean'], function() {
  var b = browserify({
    entries: './js/app.js',
    debug: true,
    paths: ['./js/templates', './js/config', './js/controllers', './js/services', './js/directives'],
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

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['clean', 'build-template-cache', 'jshint', 'build-js', 'move-images'], function() {
  return gulp.src('index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('public'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build']);
