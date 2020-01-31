const { src, dest, watch, series } = require('gulp')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade')

const style = function(){
	return src("app/scss/*.scss")
        .pipe(sass())
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

const tmp = function(){
	return src("jade/*.jade")
			.pipe(jade())
			.pipe(dest("app"))
}

const serve = function(){
	browserSync.init({
        server: "./app"
    });

	watch("jade/*.jade",series(tmp))
	watch("app/scss/*.scss", series(style));
	watch("app/*.html").on('change', browserSync.reload);
}

exports.default = serve

