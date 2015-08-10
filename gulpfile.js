'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var server = require('./server/server');
var app = server.app;

var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

gulp.task('build', function() {
  gulp.src('client/index.html')
    .pipe(inject(
      gulp.src(['client/app/**/*.js']).pipe(angularFilesort()),
      { relative: true, addRootSlash: true }
    ))
    .pipe(gulp.dest('./client'));
});

gulp.task('lint', function() {
  return gulp.src(['server/*.js', 'server/*/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  gulp.src('client/assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/assets/css/'))
    .pipe(livereload());
});

gulp.task('livereload', function() {
  livereload.reload('client/index.html');
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch([
   'client/assets/sass/*.scss',
   'client/assets/sass/**/*.scss'], ['sass', 'livereload']);

  gulp.watch([
   'client/index.html',
   'client/**/*.html',
   'client/**/**/*.html',
   'client/**/**/**/*.html',
   ], ['livereload']);

});

gulp.task('serve', function(cb) {
  app.listen(8081, function(){
    console.log('Server running on 8081');
  });
});