var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var serve = require('gulp-serve');
var browserSync = require('browser-sync').create();


// var paths = require('gulp-path');
//var rename = require('gulp-rename');

// define tasks here
gulp.task('sass', function() {
    return gulp.src('app/styles/style.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('imgs', function() {
    return gulp.src('app/img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('files', function() {
   return gulp.src('app/files/**')
       .pipe(gulp.dest('dist/files'));
});

gulp.task('fonts', function() {
    return gulp.src('app/font/**')
        .pipe(gulp.dest('dist/font'));
});


gulp.task('watch', function() {
    gulp.watch('app/scripts/**/*.js', ['js', browserSync.reload ]);
    gulp.watch('app/styles/**/*.scss', ['sass', browserSync.reload ]);
    gulp.watch('app/*.html', ['html', browserSync.reload ] );
});


gulp.task('serve', ['build', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'        }
    });
});

gulp.task('default', function() {
    // run tasks here
    // set up watch handlers here
});

gulp.task('build', ['sass','html', 'js', 'imgs', 'files', 'fonts']);
