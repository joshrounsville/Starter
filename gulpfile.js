'use strict';

// call the plugins and set variables
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pngcrush = require('imagemin-pngcrush');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 9',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src( './scripts/main.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});


// Minify JavaScript
gulp.task('minifyJS', function() {
  return gulp.src([
      './scripts/plugins.js',
      './scripts/main.js',
      '!./scripts/vendor/*.js',
      '!./scripts/*.min.js'
    ])
    .pipe($.concat('scripts.js'))
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./scripts/'));
});


// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  return gulp.src('./scss/components.scss')
    .pipe($.changed('styles', {extension: '.scss'}))
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.if('*.css', $.csso()))
    .pipe($.rename({
      basename: 'styles',
      suffix: '.min'
    }))
    .pipe(gulp.dest('styles'));
});


// Optimize Images
gulp.task('images', function () {
  return gulp.src(['./img/**/*', '! ./img/**/*.svg'])
    .pipe($.cache($.imagemin({
      optimizationLevel: 4,
      progressive: true,
      interlaced: true,
      use: [pngcrush()]
    })))
    .pipe(gulp.dest('img'))
    .pipe($.size({title: 'images'}));
});


// Clear some folders
gulp.task('clean', del.bind(null, ['.tmp', './styles/*.scss']));


// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['./*.html'], reload);
  gulp.watch(['./scss/**/*.scss'], ['styles']);
  gulp.watch(['./styles/**/*.css'], reload);
  gulp.watch(['./scripts/**/*.js', '! ./scripts/**/*.min.js'], ['jshint', 'minifyJS']);
  gulp.watch(['./scripts/**/*.min.js'], reload);
  gulp.watch(['./img/**/*'], ['images']);
});


// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'minifyJS', 'images'], cb);
});

