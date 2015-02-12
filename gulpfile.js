
var path       = require("path"),
    fs         = require("fs"),

    gulp       = require("gulp"),
    aws        = require("gulp-awspublish"),
    less       = require("gulp-less"),
    clean      = require("gulp-clean"),

    source     = require("vinyl-source-stream"),
    browserify = require("browserify"),
    reactify   = require("reactify"),

    dirs       = require("./config/dirs.js");





var max_age      = 300,

    production   = (process.env.NODE_ENV === "production"),

    errorHandler = function(err) {
      console.log(err.toString());
      this.emit("end");
    };





function dir(For) {
  return dirs[For] + path.sep;
}





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
  return gulp.src(dir("less") + "main.less")
    .pipe(less({"filename" : "main.less"}))
    .pipe(gulp.dest(dirs.built_css));
});





gulp.task("react", function() {

  var browserifyConfig = {
    "entries"    : dir("react") + "main.js",
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : !production })
    .transform({ "es6" : true }, reactify)
    .require("react")
    .require(dir("react") + "main.jsx", { "expose" : "main" })
    .bundle()
    .on("error", errorHandler)
    .pipe(source("react-bundle.js"))
    .pipe(gulp.dest(dirs.built_js));

});





gulp.task("build", ["less"]);





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
