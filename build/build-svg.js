import gulp from 'gulp';
import * as paths from './paths';
import svgConcat from './svg-json';
import svgMin from 'gulp-svgmin';
 
gulp.task('build-icons', function() {
    gulp.src(paths.iconFiles)
    .pipe(svgMin())
    .pipe(svgConcat('icons.json'))
    .pipe(gulp.dest('./app/controls/icons/'));
});