'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['markups', 'inject'], function () {

    gulp.watch([options.client + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([
      options.client + '/app/**/*.css',
      options.client + '/app/**/*.scss'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.client + '/app/**/*.js', function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.client + '/app/**/*.jade', ['markups']);

    gulp.watch(options.client + '/app/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });
};
