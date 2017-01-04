var browserSync = require('browser-sync');
var csswring = require('csswring');
var del = require('del');
var frontMatter = require('gulp-front-matter');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var inline = require('gulp-inline');
var markdown = require('gulp-markdown');
var merge = require('merge-stream');
var minimize = require('gulp-minify-html');
var pixrem = require('pixrem');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var tap = require('gulp-tap');

var helpers = require('./src/templates/helpers');

var statuses = [];
var cssProcessors = [pixrem, csswring];
var hbOptions = {
  batch: ['src/templates/partials'],
  helpers: helpers
};
var inlineOptions = {
  base: 'src',
  css: function () { return postcss(cssProcessors); }
};

/**
Destroy old output.
*/
function clean() {
  return del(['dist']);
}

/**
Collect src/statuses/*.json into the statuses array.
*/
function loadStatuses() {
  statuses = [];
  return gulp.src('src/statuses/*.md')
    .pipe(frontMatter({
      property: 'yaml',
      remove: true
    }))
    .pipe(markdown())
    .pipe(tap(function (file) {
      var data = file.yaml;
      data.message = file.contents;
      statuses.push(data);
    }));
}

/**
Build HTML pages for each status.
*/
function buildStatusPages() {
  var tasks = statuses.map(function (status) {
    return gulp.src('src/templates/status.hbs')
      .pipe(handlebars(status, hbOptions))
      .pipe(rename(status.code + '.html'))
      .pipe(inline(inlineOptions))
      .pipe(minimize())
      .pipe(gulp.dest('dist'));
  });

  return merge(tasks);
}

/**
Build HTML pages for things that aren't errors.
*/
function buildOtherPages() {
  return gulp.src('src/templates/!(status).hbs')
    .pipe(handlebars({}, hbOptions))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(inline(inlineOptions))
    .pipe(minimize())
    .pipe(gulp.dest('dist'));
}

/**
Reload Browser Sync.
*/
function reload(done) {
  browserSync.reload();
  done();
}

/**
Produce a fresh build.
*/
var build = gulp.series(
  clean,
  loadStatuses,
  buildStatusPages,
  buildOtherPages,
  reload
);

/**
Serve the distribution directory and rebuild on source edit.
*/
function serve() {
  browserSync({
    server: { baseDir: 'dist', directory: true },
  });

  gulp.watch('src/**/*', build);
}

/**
Default Gulp task.
*/
gulp.task('default', gulp.series(
  build,
  serve
));
