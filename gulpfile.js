/*
  Based on Nathan Searles Day One Gulp Starter Kit - https://github.com/nathansearles/Day-One-Gulp-Starter-Kit
*/

/* ====================================
 * Define paths
 * ==================================== */
var source = '_source';
var build = 'build';


/* ====================================
 * Load required plug-ins
 * ==================================== */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var del = require('del');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var gulpif = require('gulp-if');

var plumberConfig = {errorHandler: $.notify.onError("Error: <%= error.message %>")};

var minify = false;


/* ====================================
 * Web server
 * ==================================== */
gulp.task('serve', ['watch'], function(){
  browserSync({
    server: {
      baseDir: build
    },
    notify: false,
    ghostMode: false
  });
});


/* ====================================
 * Styles
 * ==================================== */
gulp.task('styles', function () {
  return gulp.src(source + '/scss/**/components.scss')
    .pipe($.plumber(plumberConfig))
    .pipe($.sass())
    .pipe($.concat('styles.css'))
    .pipe($.autoprefixer((["last 2 version", "> 1%", "ie 10"], { cascade: true })))
    .pipe(gulpif(minify, $.cssnano()))
    .pipe(gulp.dest(build + '/css'));
});


/* ====================================
 * Scripts
 * ==================================== */
gulp.task('jshint', function() {
  return gulp.src(source + '/js/scripts.js')
    .pipe($.plumber(plumberConfig))
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('scripts', function () {
  return gulp.src([source + '/js/plugins.js', source + '/js/scripts.js'])
    .pipe($.plumber(plumberConfig))
    .pipe($.concat('app.js'))
    .pipe(gulpif(minify, $.uglify()))
    .pipe(gulp.dest(build + '/js'));
});


/* ====================================
 * Images
 * ==================================== */
gulp.task('images', function() {
  return gulp.src([ source + '/img/**/*'])
    .pipe($.plumber(plumberConfig))
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: false }
      ],
    })))
    .pipe(gulp.dest(build + '/img'));
});


/* ====================================
 * HTML
 * ==================================== */
gulp.task('html', function() {
  return gulp.src([
      source + '/htdocs/**/*.html',
      '!' + source + '/htdocs/_templates{,/**}'
    ])
    .pipe($.plumber(plumberConfig))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '_source/'
    }))
    .pipe(gulpif(minify, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(build));
});


/* ====================================
 * Clear the image cache
 * ==================================== */
gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});


/* ====================================
 * Clean up
 * ==================================== */
gulp.task('clean', del.bind(null, [build + '/*'], {dot: true}));


/* ====================================
 * Copy files
 * ==================================== */
gulp.task('copyfiles', function() {
  return gulp.src([source + '/**/*.{ttf,woff,woff2,eot,svg,ico,xml,txt}', source + '/.htaccess'])
    .pipe($.plumber(plumberConfig))
    .pipe(gulp.dest(build));
});


/* ====================================
 * Gulp tasks
 * ==================================== */

// For local development
gulp.task('default', ['clean'], function(){
  runSequence(
    ['html', 'styles', 'scripts', 'images', 'copyfiles'],
    ['serve']
  );
});

// For staging/production deployment
gulp.task('build', ['clean'], function(){
  minify = true,

  runSequence(
    ['html', 'styles', 'scripts', 'images', 'copyfiles']
  );
});


/* ====================================
 * Watch
 * ==================================== */
gulp.task('watch', function() {
  gulp.watch(source + '/scss/**/*.scss', ['styles', reload]);

  gulp.watch(source + '/js/**/*.js', ['jshint', 'scripts', reload]);

  gulp.watch(source + '/img/**/*', ['images', reload]);

  gulp.watch(source + '/htdocs/**/*', ['html', reload]);
});