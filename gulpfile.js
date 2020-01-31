const { src, dest, watch, series } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const jade = require('gulp-jade')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const tmp = function(){
	return src("jade/*.jade")
			.pipe(jade())
			.pipe(dest("app"))
}

const style = function(){
	return src("app/scss/*.scss")
        .pipe(sass())
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

const scripts = function(){
	return src("dist/*.js")
		.pipe(uglify())
		.pipe(concat('bundle.js'))
		.pipe(dest("app/js"))
}

const serve = function(){
	browserSync.init({
        server: "./app"
    });

	watch("jade/*.jade",series(tmp))
	watch("app/scss/*.scss", series(style))
	watch("dist/*.js",series(scripts))
	watch("app/*.html").on('change', browserSync.reload)
}

exports.default = serve

