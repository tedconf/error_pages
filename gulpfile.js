var csswring = require('csswring');
var del = require('del');
var frontMatter = require('gulp-front-matter');
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var inline = require('gulp-inline');
var markdown = require('gulp-markdown');
var merge = require('merge-stream');
var minimize = require('gulp-minify-html');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var tap = require('gulp-tap');

var statuses = [];
var cssProcessors = [csswring];
var hbOptions = {
  batch: ['src/templates/partials']
};
var inlineOptions = {
  base: 'src',
  css: function () { return postcss(cssProcessors); }
};

gulp.task('build', gulp.series(
  loadStatuses,
  buildStatusPages,
  buildOtherPages
));

gulp.task('default', gulp.series(
  clean,
  'build'
));

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
