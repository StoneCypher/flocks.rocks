
var gulp = require('gulp'),
    aws  = require('gulp-awspublish'),

    dirs = require('./config/dirs.js');





var max_age = 300;





gulp.task('publish', function() {

  var headers = {'Cache-Control' : 'max-age=' + max_age.toString()},
      target  = aws.create({
        'key'    : process.env.FLOCKSROCKS_ACCESS_KEY_ID,
        'secret' : process.env.FLOCKSROCKS_SECRET_ACCESS_KEY,
        'bucket' : process.env.FLOCKSROCKS_BUCKET
      });

  return gulp.src(dirs.publish + '/**/*')
    .pipe(target.publish(headers))
    .pipe(aws.reporter());

});
