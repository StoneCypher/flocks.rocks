
var path  = require("path"),
    fs    = require("fs"),

    gulp  = require("gulp"),
    aws   = require("gulp-awspublish"),
    less  = require("gulp-less"),
    clean = require("gulp-clean"),

    dirs  = require("./config/dirs.js");





var max_age = 300;





gulp.task("clean", function() {
  return gulp.src([dirs.build], {"read" : false}).pipe(clean());
});





gulp.task("make-directories", ["clean"], function() {
  for (var key in dirs) {
    try {
      fs.mkdirSync('.' + path.sep + path.normalize(dirs[key]));
    } catch(e) { }
  }
});





gulp.task("less", ["make-directories"], function() {
  return gulp.src(dirs.less + path.sep + "main.less")
    .pipe(less({"filename" : "main.less"}))
    .pipe(gulp.dest(dirs.built_css));
});





gulp.task("build", ["less"], function() {
  // whargarbl todo
});





gulp.task("arrange-publish", ["build"], function() {
  // whargarbl todo
});





gulp.task("publish", ["arrange-publish"], function() {

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
