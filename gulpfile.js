var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var fileinclude = require('gulp-file-include');


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

// -----html include
gulp.task('htmlIncluder', function() {
  gulp.src(['develop/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

// -----Sass
gulp.task('sass', function () {
  gulp.src('develop/stylesheets/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

// -----Sprite
gulp.task('sprite', function () {
  var spriteData = 
    gulp.src('develop/images/*.png')
      .pipe(spritesmith({
        imgName: 'images/sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        padding: 10
      }))
  spriteData.img.pipe(gulp.dest('./build/'));
  spriteData.css.pipe(gulp.dest('./develop/stylesheets/abstracts/'));
});


// -----------------------------------
// Watch
// -----------------------------------

gulp.task('watch', function () {
  gulp.watch(['develop/**/*.html'], ['htmlIncluder']);
  gulp.watch(['develop/stylesheets/**/*.scss'], ['sass']);
});


// -----------------------------------
// Main Task
// -----------------------------------

gulp.task('default', ['htmlIncluder', 'sass', 'connect', 'watch']);