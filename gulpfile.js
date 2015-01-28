var es = require('event-stream');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var filter = require('gulp-filter');
var config = require('./gulp.conf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rimraf = require('gulp-rimraf');
var mainBowerFiles = require('main-bower-files');
var spawn = require('child_process').spawn;
var templateCache = require('gulp-angular-templatecache');
var karma = require('gulp-karma');

var gulp = require('gulp-help')(require('gulp'));

var bower_files = mainBowerFiles();

var testFiles = bower_files.concat([
    'node_modules/angular-mocks/angular-mocks.js',

    "src/app/**/!(app|module)*.js",
    "src/app/config.js",
    "src/app/**/module.js",
    "src/app/app.js",

    'build/js/templates.js',
    'src/app/**/*.spec.js'
]);

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

gulp.task('watch', 'Watches for changes on the source and runs the build task.', ['build'], function() {
    gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));

    return gulp
        .watch('src/**', ['build']);
});


gulp.task('build', 'Builds the application on the build directory.', ['clean'], function(cb) {

    es.merge(
        gulp.src(config.app.partials)
        .pipe(templateCache({
            module: 'hackerAssessor'
        }))
        .pipe(gulp.dest('build/js/')),

        gulp.src(bower_files)
        .pipe(filter('*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js/')),

        gulp.src(config.app.js)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
        .pipe(concat.footer('\n})(window, document);\n'))
        .pipe(gulp.dest('build/js/')),

        gulp.src(config.app.index)
        .pipe(gulp.dest('build')),

        gulp.src('api/**')
        .pipe(gulp.dest('build/api')),

        gulp.src(bower_files)
        .pipe(filter('*.css'))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('build/css')),

        gulp.src(config.app.less)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css')),

        gulp.src(config.img)
        .pipe(gulp.dest('build/')),

        gulp.src('api/**')
        .pipe(gulp.dest('build/api')),

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


gulp.task('test', function() {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});
