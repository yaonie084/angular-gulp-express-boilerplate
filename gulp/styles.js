'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('styles', function () {
    var sassOptions = {
      style: 'expanded'
    };

    var injectFiles = gulp.src([
      options.client + '/app/**/*.scss',
      '!' + options.client + '/app/app.scss',
      '!' + options.client + '/app/vendor.scss',
      '!' + options.client + '/app/theme.scss'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.client + '/app/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter('app.scss');
    var vendorFilter = $.filter('vendor.scss');
    var themeFilter = $.filter('theme.scss');

    return gulp.src([
      options.client + '/app/app.scss',
      options.client + '/app/vendor.scss',
      options.client + '/app/theme.scss'
    ])
      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      .pipe(themeFilter)
      .pipe(themeFilter.restore())
      .pipe(vendorFilter)
      .pipe(wiredep(options.wiredep))
      .pipe(vendorFilter.restore())
      .pipe($.sourcemaps.init())
      .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.tmp + '/serve/app/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
