var gulp = require('gulp');
var useLivereload = false;
var livereloadPort = 35729;


gulp.task('dev-server', function(){
  var express = require('express');
  var app = express();

  app
    app.use(require('connect-livereload')({
      port: livereloadPort
    }))
    .use(express.static(__dirname))
    app.listen(8000);
});


gulp.task('livereload', ['dev-server'], function(){
  var tinyLr = require('tiny-lr')();
  
  tinyLr.listen(livereloadPort);

  gulp.watch('./js/*', function(e){
    var fileName = require('path').relative(__dirname, e.path);

    console.log('livereload: ' + fileName + ' changed');

    tinyLr.changed({
      body: {
        files: [fileName]
      }
    });
  });

});


gulp.task('default', ['livereload']);