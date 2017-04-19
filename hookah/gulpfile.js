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

    // 'web/js/lib/jquery-2.1.4.min.js',
    // 'web/js/lib/jquery-ui.min.js',
    // 'web/js/lib/glide.min.js',
    // 'web/js/lib/jquery.ui.touch-punch.min.js',
    // 'web/js/lib/swiper.jquery.min.js',
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

gulp.task('choiceTable', function(){
    return gulp.src('src/scss/choiceTable.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('choice-table.component.css'))
        .pipe(gulp.dest('src/app/common/choice-table'));
});

gulp.task('home', function(){
    return gulp.src('src/scss/home.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('home.component.css'))
        .pipe(gulp.dest('src/app/common/home'));
});

gulp.task('callReason', function(){
    return gulp.src('src/scss/callReason.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('call-reason.component.css'))
        .pipe(gulp.dest('src/app/common/call-reason'));
});

gulp.task('recall', function(){
    return gulp.src('src/scss/recall.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('recall.component.css'))
        .pipe(gulp.dest('src/app/common/recall'));
});

gulp.task('article', function(){
    return gulp.src('src/scss/article.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('article.component.css'))
        .pipe(gulp.dest('src/app/common/article'));
});

gulp.task('choiceTaste', function(){
    return gulp.src('src/scss/choiceTaste.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('choice-taste.component.css'))
        .pipe(gulp.dest('src/app/tobacco/choice-taste'));
});

gulp.task('priceCategory', function(){
    return gulp.src('src/scss/priceCategory.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('price-category.component.css'))
        .pipe(gulp.dest('src/app/tobacco/price-category'));
});

gulp.task('filterTobacco', function(){
    return gulp.src('src/scss/filterTobacco.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('filter-tobacco.component.css'))
        .pipe(gulp.dest('src/app/tobacco/filter-tobacco'));
});

gulp.task('tobaccoList', function(){
    return gulp.src('src/scss/tobaccoList_&_Mix.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(minifyCss())
        .pipe(rename('tobacco-list.component.css'))
        .pipe(gulp.dest('src/app/tobacco/tobacco-list'));
});




gulp.task('libsJs', function() {
    return gulp.src(libsJs)
        .pipe(concatJs('libsJs.js'))
        .pipe(uglifyJs().on('error', notify.onError()))
        .pipe(gulp.dest('src/assets/libs'));
});


gulp.task('watcher', function(){
   gulp.watch('src/scss/global/**/*.scss', ['global']);

   gulp.watch('src/scss/choiceTable.scss', ['choiceTable']);
   gulp.watch('src/scss/home.scss', ['home']);
   gulp.watch('src/scss/callReason.scss', ['callReason']);
   gulp.watch('src/scss/recall.scss', ['recall']);
   gulp.watch('src/scss/article.scss', ['article']);
   gulp.watch('src/scss/choiceTaste.scss', ['choiceTaste']);
   gulp.watch('src/scss/priceCategory.scss', ['priceCategory']);
   gulp.watch('src/scss/filterTobacco.scss', ['filterTobacco']);
   gulp.watch('src/scss/tobaccoList_&_Mix.scss', ['tobaccoList']);
});

gulp.task('default', [
    'watcher',
    'global',
    'choiceTable',
    'home',
    'callReason',
    'recall',
    'article',
    'choiceTaste',
    'priceCategory',
    'filterTobacco',
    'tobaccoList',


    'libsJs'
]);


