const gulp = require('gulp');
// https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a
// https://github.com/hoppinger/project-norway-dotnet/blob/master/ProjectNorway/gulpfile.js

// Plugins for CSS compiling
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const rename       = require('gulp-rename');
const gcmq         = require('gulp-group-css-media-queries');

// Watcher
function watch() {
  gulp.watch('./assets/stylesheets/**/*.scss', gulp.series('css'));
}

// CSS task
function css() {
  return gulp
    .src("./assets/stylesheets/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq({log: false}))
    .pipe(autoprefixer({ browsers: ['> 2%', 'last 2 versions'], cascade: false }))
    .pipe(gulp.dest("./wwwroot/css"))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./wwwroot/css"))
}

exports.css = css;
exports.default = css;
exports.watch = watch;
