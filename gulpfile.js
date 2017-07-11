const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const mainBowerFiles = require('main-bower-files');
const del = require('del');

const $ = gulpLoadPlugins();
const app = './app/';
const dist = './dist/';

let dev = true;

gulp.task('clean', del.bind(null, ['dist/*']));

gulp.task('clean:bower', del.bind(null, ['dist/plugins/*']));

gulp.task('bower', ['clean:bower'], () => {
  return gulp.src(mainBowerFiles())
    .pipe($.uglify())
    .pipe($.rename((path) => {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest(dist + 'plugins'));
});

gulp.task('jsonlint', () => {
  return gulp.src(app + '**/*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter())
    .pipe($.jsonlint.failAfterError());
});

gulp.task('json', ['jsonlint'], () => {
  return gulp.src(app + '**/*.json')
    .pipe($.if(!dev, $.jsonminify()))
    .pipe(gulp.dest(dist));
});

gulp.task('wxml', () => {
  return gulp.src(app + '**/*.wxml')
    .pipe($.if(!dev, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: { compress: { drop_console: true } },
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest(dist));
});

gulp.task('eslint', () => {
  return gulp.src([app + '**/*.js', '!' + app + 'plugins/*.js'])
    .pipe($.eslint({ fix: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('js', ['eslint'], () => {
  return gulp.src([app + '**/*.js', '!' + app + 'plugins/*.js'])
    .pipe($.babel())
    .pipe($.if(!dev, $.uglify()))
    .pipe(gulp.dest(dist));
});

gulp.task('wxss', () => {
  return gulp.src([app + '**/*.scss'])
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
    .pipe($.if(!dev, $.cssnano({
      autoprefixer: false,
      reduceIdents: false,
      discardUnused: false,
      reduceTransforms: false,
      zindex: false
    })))
    .pipe($.rename((path) => {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('assets', () => {
  return gulp.src(app + 'assets/**')
    .pipe(gulp.dest(dist + 'assets'));
});

gulp.task('imagemin', () => {
  return gulp.src('imagemin/assets/**')
    .pipe(gulp.dest(dist + 'assets'));
});

gulp.task('extra', () => {
  return gulp.src(app + 'plugins/**')
    .pipe(gulp.dest(dist + 'plugins'));
});

gulp.task('size', () => {
  return gulp.src(dist + '**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('build', ['bower', 'json', 'wxml', 'js', 'wxss', 'extra']);

gulp.task('dev', ['clean'], () => {
  runSequence('build', 'assets', () => {
    dev = true;

    gulp.watch(app + '**/*.json', ['json']);
    gulp.watch(app + '**/*.wxml', ['wxml']);
    gulp.watch(app + '**/*.js', ['js']);
    gulp.watch(app + '**/*.scss', ['wxss']);
    gulp.watch(app + 'assets/**', ['assets']);
    gulp.watch('./bower.json', ['bower']);
  });
});

gulp.task('default', ['clean'], () => {
  dev = false;
  return new Promise(resolve => {
    runSequence('build', 'imagemin', 'size');
  });
});
