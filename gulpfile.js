'use strict';

var fs = require('fs');
var connect = require('gulp-connect');
var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var rename = require('gulp-rename');
var es = require('event-stream');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var openBrowser = require('gulp-open');
var less = require('gulp-less');
var order = require('gulp-order');
var jscs = require('gulp-jscs');
var ngAnnotate = require('gulp-ng-annotate');

var config = {
  pkg : JSON.parse(fs.readFileSync('./package.json')),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n\n'
};

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(['./demo/*.html', '.src/*.html'])
    .pipe(connect.reload());
});

gulp.task('clean', function(cb) {
  del(['./dist/**/*.*'], {force: true}, cb);
});

gulp.task('scripts', function() {

  function buildTemplates() {
    return gulp.src('src/**/*.html')
      .pipe(minifyHtml({
             empty: true,
             spare: true,
             quotes: true
            }))
      .pipe(templateCache({module: 'mohsen1.json-schema-view'}));
  }

  function buildDistJS() {
    return gulp.src(['src/json-schema-view.js', 'src/recursion-helper.js'])
      .pipe(ngAnnotate())
      .pipe(concat('json-schema-view.js'))
      .pipe(plumber({
        errorHandler: handleError
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
  }

  es.merge(buildDistJS(), buildTemplates())
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(order([
      'json-schema-view.js',
      'template.js'
    ]))
    .pipe(concat('json-schema-view.js'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {

  return gulp.src('src/json-schema-view.less')
    .pipe(less())
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src('.')
    .pipe(jscs())
    .pipe(jshint());
});

gulp.task('watch', function() {
  gulp.watch(['./demo/**/*.html'], ['html']);
  gulp.watch(['**/*.less'], ['styles']);
  gulp.watch(['./src/**/*.js', './demo/**/*.js', './**/*.html'], ['scripts']);
  gulp.watch(['src/**/*', 'test/**/*'], ['karma']);
});

gulp.task('open', function() {
  gulp.src('./demo/demo.html')
  .pipe(openBrowser('', {url: 'http://localhost:8080/demo/demo.html'}));
});

gulp.task('karma', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('karma-single', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

function handleError(err) {
  /* jshint validthis: true */

  console.log(err.toString());
  this.emit('end');
}

gulp.task('build', ['clean', 'scripts', 'styles']);
gulp.task('serve', ['build', 'test', 'connect', 'watch', 'open']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['build', 'karma-single']);
