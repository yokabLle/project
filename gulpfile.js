var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');


// ---------------------------Connect-----------------
gulp.task('connect', function() {
  connect.server({
    root: 'develop',
    port: 8888,
    livereload: true
  });
});


// --------------------------Tasks-------------------
gulp.task('html', function () {
  gulp.src('develop/*.html')
    .pipe(connect.reload());
});
 

// ---------------------------Watch------------------
gulp.task('watch', function () {
  gulp.watch(['develop/*.html'], ['html']);
});



// ------------------------Main Task-----------------
gulp.task('default', ['connect', 'watch']);