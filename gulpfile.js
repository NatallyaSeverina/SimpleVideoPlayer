'use strict';

var gulp = require('gulp'),
	babelify = require('babelify'),
	es2015 = require('babel-preset-es2015'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	buffer = require('vinyl-buffer'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
	var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: 'build/js/'
               
    },
    src: { //Пути откуда брать исходники
        js: 'src/js/app.js'//В скриптах нам понадобятся только app файлы
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'src/js/**/*.js'
    },
    clean: './build'
};
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
//Собираем javascript
gulp.task('js:build', function () {
     return browserify({
        entries: [path.src.js]
        })
        .transform(babelify.configure({
            presets : ['es2015']
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

//Чтобы не лазить все время в консоль давайте попросим gulp каждый раз при изменении какого то файла запускать нужную задачу.
gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
 });
 //Что бы насладиться чудом livereload — нам необходимо создать себе локальный веб-сервер
 gulp.task('webserver', function () {
    browserSync(config);
});
//Очистка
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
//мы определим дефолтный таск, который будет запускать всю нашу сборку
gulp.task('default', ['js:build', 'webserver', 'watch']);