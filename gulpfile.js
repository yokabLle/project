var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var includer = require('gulp-htmlincluder');


// ---------------------------Connect-----------------
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8888,
    livereload: true
  });
});


// --------------------------Tasks-------------------
gulp.task('htmlIncluder', function() {
    gulp.src('develop/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});
 

// ---------------------------Watch------------------
gulp.task('watch', function () {
  gulp.watch(['develop/**/*.html'], ['htmlIncluder']);
});



// ------------------------Main Task-----------------
gulp.task('default', ['htmlIncluder', 'connect', 'watch']);