var elixir = require('laravel-elixir');
var combine = require('./commands/MergeFiles.js');
var MergeRequest = require('./commands/MergeRequest');

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

elixir.extend('scripts', function(scripts, outputDir, baseDir, scriptOptions) {
    outputDir = outputDir || elixir.config.jsOutput;

    return combine(mergeRequest(scripts, outputDir, baseDir, scriptOptions));
});

elixir.extend('scriptsIn', function(baseDir, outputDir, scriptOptions) {
    outputDir = outputDir || baseDir;

    return combine(mergeRequest('**/*.js', outputDir, baseDir, scriptOptions));
});

var mergeRequest = function(scripts, outputDir, baseDir, scriptOptions) {
    var request = new MergeRequest(scripts, baseDir, outputDir, 'js');

    request.taskName = 'scripts';
    request.minifier = require('gulp-uglify');
    request.scriptOptions = scriptOptions || {};

    return request;
};
