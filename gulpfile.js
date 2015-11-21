'use strict';
var gulp = require('gulp');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rjs = require('gulp-requirejs');

gulp.task('test:build', function() {
  rjs({
    baseUrl: 'test/build',
    name: 'main',
    paths: {
      '_': '../../src/main',
      'bower_components': '../../bower_components'
    },
    out: 'main-built.js',
  }).pipe(gulp.dest('./.tmp/')); // pipe it to the output DIR
});

gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('develop', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('default', function() {
  // place code for your default task here
});
