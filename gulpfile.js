'use strict';

const gulp  = require('gulp'),
      $ = require("gulp-load-plugins")(),
      browserify = require("browserify"),
      babelify = require("babelify"),
      watchify = require("watchify"),
      assign = require('lodash.assign'),
      source = require("vinyl-source-stream");

let javascriptBuild = (entry) => {
  let customOpts = {
    entries: [entry],
    transform: [babelify.configure({presets: ["es2015"]})],
    debug: true
  };

  let opts = assign({}, watchify.args, customOpts);
  let b = watchify(browserify(opts));

  let bundle = () => {
      return b.bundle()
        .pipe($.plumber())
        .pipe(source("app.js"))
        .pipe(gulp.dest("./dist"));
  };

  return {
    obj: b,
    bundle: bundle
  };
};

gulp.task('browserify', () => {
  let watcher = javascriptBuild('./src/app.js');
  watcher.bundle();
  watcher.obj.on('update', watcher.bundle);
  watcher.obj.on('log', $.util.log);
});

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
