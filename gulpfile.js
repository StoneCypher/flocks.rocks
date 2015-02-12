
var aws  = require('gulp-awspublish'),

    dirs = require('./support/dirs.js');





var max_age = 300;





gulp.task('aws-push', function() {

  var headers = {'Cache-Control' : 'max-age=' + max_age.toString()},
      target  = aws.create({
        'key'    : process.env.FLOCKSROCKS_ACCESS_KEY_ID,
        'secret' : process.env.FLOCKSROCKS_SECRET_ACCESS_KEY,
        'bucket' : process.env.FLOCKSROCKS_BUCKET
      });

  return gulp.src(dirs.publish_root + '/**/*')
    .pipe(target.publish(headers))
    .pipe(aws.reporter());

});
