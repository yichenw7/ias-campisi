const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const shell = require('shelljs');

gulp.task('build', function () {
  shell.echo('------ build echarts');
  shell.exec('npm run build:echarts');
  shell.echo('------ build echarts done');
  return gulp.src([
    'dist/**/*',
  ]).pipe(tar('ss-web.tar', {'prefix': '/', 'mode': 0755}))
    .pipe(gzip())
    .pipe(gulp.dest('build/'));
});

