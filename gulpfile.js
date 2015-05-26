'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  client: 'client',
  dist: 'dist',
  tmp: '.tmp',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  console.log(file);
  //if(file.toString() != 'proxy.js'){
    require('./gulp/' + file)(options);
  //}
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
