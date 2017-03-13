var gulp = require( 'gulp' );
var sourcemaps = require( 'gulp-sourcemaps' );
var sass = require( 'gulp-sass' );
var csso = require( 'gulp-csso' );
var concat = require( 'gulp-concat' );
var notify = require( "gulp-notify" );
var connect = require( 'gulp-connect' );

var jsfileslib = [
	'node_modules/angular/angular.js',
	'node_modules/angular-route/angular-route.js'
];
var jsfilesapp = [
	'src/js/*.js'
];
var cssfiles = ['node_modules/font-awesome/css/font-awesome.min.css',
'node_modules/normalize.css/normalize.css',
'css/main.css'];

gulp.task( 'sass', function() {
	return gulp.src( 'src/sass/main.scss' )
	.pipe( sourcemaps.init() )
	.pipe( sass().on( 'error', sass.logError ) )
	.pipe( csso() )
	.pipe( sourcemaps.write( undefined, { sourceRoot: null } ) )
	.pipe( gulp.dest( 'css/' ) );
} );

gulp.task( 'cssconcat', ['sass'], function() {
	return gulp.src( cssfiles ).pipe( concat( 'css.min.css' ) )
	.pipe( csso( {
		restructure: false,
		sourceMap: true,
		debug: false
	} ) )
	.pipe( gulp.dest( 'css/' ) );
} );

gulp.task( 'jslibconcat', function() {
	return gulp.src( jsfileslib )
	.pipe( concat( 'jslib.js' ) )
	.pipe( gulp.dest( 'js/' ) );
} );

gulp.task( 'jsapp', function() {
	return gulp.src( jsfilesapp )
	.pipe( sourcemaps.init() )
	.pipe( concat( 'jsapp.js' ) )
	.pipe( sourcemaps.write( '.' ) )
	.pipe( gulp.dest( 'js/' ) );
} );

gulp.task( 'js', function() {
	return gulp.src( jsfiles )
	.pipe( concat( 'js.js' ) )
	.pipe( gulp.dest( 'js/' ) );
} );

gulp.task( 'connect', function() {
	connect.server( {
		port: 9001,
		livereload: true
	} );
} );

gulp.task( 'jonas_reload', function() {
	return gulp.src( ['index.html', '/*.html', 'css/css.min.css', 'js/jslib.js', 'js/jsapp.js'] )
	.pipe( connect.reload() );
} );

gulp.task( 'watch', function() {
	gulp.watch( 'src/sass/**/*.scss', ['cssconcat'] ).on( 'change', function() {
		notify( {
			message: 'CSS changed... running watch task.',
			title: 'JONAS_ Gulp'
		} ).write( '' );
	} );
	gulp.watch( jsfileslib, ['jslibconcat'] ).on( 'change', function() {
		notify( {
			message: 'JS Lib changed... running watch task.',
			title: 'JONAS Gulp'
		} ).write( '' );
	} );
	gulp.watch( jsfilesapp, ['jsapp'] ).on( 'change', function() {
		notify( {
			message: 'JS App changed... running watch task.',
			title: 'JONAS Gulp'
		} ).write( '' );
	} );
	gulp.watch( ['index.html', '/*.html', 'css/css.min.css', 'js/jslib.js', 'js/jsapp.js'], ['jonas_reload'] ).on( 'change', function() {
		notify( {
			message: 'Artifacts changed... reloading the app',
			title: 'JONAS reload'
		} ).write( '' );
	} );
} );

gulp.task( 'default', ['cssconcat', 'jslibconcat', 'jsapp', 'watch', 'connect'], function() {
	notify( {
		message: 'All tasks have been completed.',
		title: 'JONAS Gulp'
	} ).write( '' );
} );