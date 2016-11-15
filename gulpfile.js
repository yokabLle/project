var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var includer = require('gulp-htmlincluder');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');


// -----------------------------------
// Connect
// -----------------------------------
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8888,
    livereload: true
  });
});

// -----------------------------------
// Tasks
// -----------------------------------

// -----html
gulp.task('htmlIncluder', function() {
    gulp.src('develop/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

// -----Less
gulp.task('sass', function () {
  return gulp.src('develop/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

// -----------------------------------
// Watch
// -----------------------------------

gulp.task('watch', function () {
  gulp.watch(['develop/**/*.html'], ['htmlIncluder']);
  gulp.watch(['develop/sass/**/*.scss'], ['sass']);
});


// -----------------------------------
// Main Task
// -----------------------------------

gulp.task('default', ['htmlIncluder', 'sass', 'connect', 'watch']);