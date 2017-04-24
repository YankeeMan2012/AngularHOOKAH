var gulp         = require('gulp');
var minifyCss    = require('gulp-minify-css');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps   = require('gulp-sourcemaps');
var rename       = require("gulp-rename");
var uglifyJs     = require('gulp-uglify');
var concatJs     = require('gulp-concat');
var notify       = require("gulp-notify");

var libsJs = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/swiper/dist/js/swiper.jquery.js',
    './src/js/jquery-ui.min.js',
    './src/js/glide.min.js',
    './src/js/jquery.ui.touch-punch.min.js',
    // 'web/js/lib/maskedInput.js',
    // 'web/js/lib/detect.js',
];

gulp.task('global', function(){
    return gulp.src('src/scss/global/global.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('src'));
});

gulp.task('libsJs', function() {
    return gulp.src(libsJs)
        .pipe(concatJs('libsJs.js'))
        .pipe(uglifyJs().on('error', notify.onError()))
        .pipe(gulp.dest('src/assets/libs'));
});


gulp.task('watcher', function(){
   gulp.watch('src/scss/global/**/*.scss', ['global']);
});

gulp.task('default', [
    'watcher',
    'global',
    'libsJs'
]);


