
var gulp  = require("gulp"),
    aws   = require("gulp-awspublish"),
    less  = require("gulp-less"),
    clean = require("gulp-clean"),

    dirs  = require("./config/dirs.js");





var max_age = 300;





gulp.task("clean", function() {
  // whargarbl todo
});





gulp.task("make directories", ["clean"], function() {
  // whargarbl todo
});





gulp.task("less", ["make directories"], function() {
  // whargarbl todo
});





gulp.task("build", ["less"], function() {
  // whargarbl todo
});





gulp.task("publish", ["build"], function() {

  var headers = {"Cache-Control" : "max-age=" + max_age.toString()},
      target  = aws.create({
        "key"    : process.env.FLOCKSROCKS_ACCESS_KEY_ID,
        "secret" : process.env.FLOCKSROCKS_SECRET_ACCESS_KEY,
        "bucket" : process.env.FLOCKSROCKS_BUCKET
      });

  return gulp.src(dirs.publish + "/**/*")
    .pipe(target.publish(headers))
    .pipe(aws.reporter());

});
