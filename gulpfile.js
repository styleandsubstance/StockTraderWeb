/**
 * Created by sdoshi on 5/30/2016.
 */
var gulp = require('gulp'),
    path = require('path'),
    Builder = require('systemjs-builder'),
    ts = require('gulp-typescript'),
    sourcemaps  = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

var appDev = 'app'; // where your ts files are, whatever the folder structure in this folder, it will be recreated in the below 'dist/app' folder
var appProd = 'dist/app';

/** first transpile your ts files */
gulp.task('ts', () => {
    return gulp.src(
        ['typings/**/*.ts', appDev + '/**/*.ts'])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appProd));
});

/** then bundle */
gulp.task('bundle', function() {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('', 'systemjs.config.js');

    /*
     the parameters of the below buildStatic() method are:
     - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
     - the output (file into which it would output the bundled code)
     - options {}
     */
    return builder
        .buildStatic(appProd + '/boot.js', appProd + '/bundle.js', { minify: true, sourceMaps: true})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

/** this runs the above in order. uses gulp4 */
gulp.task('build', gulp.series(['ts', 'bundle']));