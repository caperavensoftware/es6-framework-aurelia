/*jshint strict: false */

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import * as paths from './paths';
import gulpsync from 'gulp-sync';
import compilerOptions from './babel-options';
import jsonminify from 'gulp-jsonminify';

const assign = Object.assign || require('object.assign');

const sync = gulpsync(gulp).sync;

gulp.task('copy-app-html', function() {
    return gulp.src(paths.sourceTemplates)
    .pipe(gulp.dest(paths.destPath));
});

gulp.task('copy-app-json', function() {
    return gulp.src(paths.sourceJson)
    .pipe(jsonminify())
    .pipe(gulp.dest(paths.destPath));
});

gulp.task('build-js', sync(['clean-app', 'copy-app-html', 'copy-app-json']), function() {       
    return gulp.src(paths.sourceFiles)
     .pipe(sourcemaps.init())
     .pipe(babel(assign({}, compilerOptions.system())))
     .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
     .pipe(gulp.dest(paths.destPath));
});

