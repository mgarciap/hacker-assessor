var gulp = require('gulp'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files');

gulp.task('default', function() {

  var options = {
    paths: {
      bowerDirectory: 'public/vendor',
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    }
  }

  gulp.src('./public/index.html')
  .pipe(inject(gulp.src(mainBowerFiles(options), {read: false}), {name: 'bower', relative: true}))
  .pipe(gulp.dest('./public'));
});
