/*jshint strict: false */

import gulp from 'gulp';
import sass from 'gulp-sass';
import paths from './paths';
import gulpsync from 'gulp-sync';

const sync = gulpsync(gulp).sync;

gulp.task('build-sass', sync(['clean-styles', 'build-app-sass', 'build-styles-sass']));

gulp.task('build-app-sass', ['copy-fonts'], function() {
  return gulp.src(paths.sourceSass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.destPath));
});

gulp.task('build-styles-sass', function() {
  return gulp.src(paths.sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.stylesPath));
});
 
gulp.task('sass:watch', function() {
    gulp.watch(paths.sassFiles, ['build-sass']);
});

gulp.task('copy-fonts', function() {
  gulp.src(paths.fontFiles)
  .pipe(gulp.dest(paths.styleFontsPath));
});