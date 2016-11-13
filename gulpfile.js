var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var includer = require('gulp-htmlincluder');
var less = require('gulp-less');


// ---------------------------Connect-----------------
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8888,
    livereload: true
  });
});


// --------------------------Tasks-------------------
// -----html
gulp.task('htmlIncluder', function() {
    gulp.src('develop/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});
// -----Less
gulp.task('less', function () {
  gulp.src('develop/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});


// ---------------------------Watch------------------
gulp.task('watch', function () {
  gulp.watch(['develop/**/*.html'], ['htmlIncluder']);
  gulp.watch(['develop/less/**/*.less'], ['less']);
});


// ------------------------Main Task-----------------
gulp.task('default', ['htmlIncluder', 'less', 'connect', 'watch']);