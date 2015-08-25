var gulpconf = require('./gulp.conf');
var karma = require('karma').Server;
var es = require('event-stream');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rimraf = require('gulp-rimraf');
var mainBowerFiles = require('main-bower-files');
var spawn = require('child_process').spawn;
var templateCache = require('gulp-angular-templatecache');
var gulp = require('gulp-help')(require('gulp'));
var bower_files = mainBowerFiles();

gulp.task('default', 'DEFAULT TASK: dev.', ['dev']);

gulp.task('dev', 'Builds, runs the server and watches for changes to rebuild.', [
  'watch',
  'serve'
]);

gulp.task('serve', 'Runs the server with sync between browsers.', function() {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  });
});

gulp.task('build', 'Builds the application to the build directory.', ['clean'], function(cb) {

  es.merge(
    gulp.src(gulpconf.app.partials)
    .pipe(templateCache({
      module: 'hackerAssessor'
    }))
    .pipe(gulp.dest('build/js/')),

    gulp.src(bower_files)
    .pipe(filter('*.js'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js/')),

    gulp.src(gulpconf.app.js)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('build/js/')),

    gulp.src(gulpconf.app.index)
    .pipe(gulp.dest('build')),

    gulp.src(bower_files)
    .pipe(filter(['*sprite*']))
    .pipe(gulp.dest('build/icons/')),

    gulp.src(bower_files)
    .pipe(filter(['*.css', '!*sprite*']))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('build/css')),

    gulp.src(gulpconf.app.less)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css')),

    gulp.src(gulpconf.img)
    .pipe(gulp.dest('build/')),

    gulp.src('*', {
      read: false
    })
    .pipe(reload({
      stream: true
    }))
  ).on('end', cb);

});

gulp.task('clean', 'Cleans the build directory.', function(cb) {
  return gulp.src(['build/*', 'dist/*'])
    .pipe(rimraf());
});

gulp.task('dist', 'Builds the app and prepares it for deployment.', ['build'], function(cb) {
  es.merge(
    gulp.src('build/**')
    .pipe(gulp.dest('dist/')),

    gulp.src('build/js/app.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist/js')),

    gulp.src('build/css/style.css')
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist/css'))
  ).on('end', cb);

});

gulp.task('watch', 'Watches for changes on the source and runs the build task.', ['build'], function(done) {
  new karma({
    configFile: __dirname + '/karma.conf.js'
  }, function() {
    done();
  }).start();

  return gulp
    .watch('src/**', ['build']);
});

gulp.task('test', function(done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  }).start();
});
