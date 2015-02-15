
var path       = require("path"),
    fs         = require("fs"),

    gulp       = require("gulp"),
    aws        = require("gulp-awspublish"),
    less       = require("gulp-less"),
    clean      = require("gulp-clean"),
    uglify     = require("gulp-uglify"),

    source     = require("vinyl-source-stream"),
    browserify = require("browserify"),
    reactify   = require("reactify"),
    remarkable = require("remarkable"),
    jsx        = require("node-jsx").install({"extension" : ".jsx", "harmony" : true}),

    dirs       = require("./config/dirs.js"),

    targets    = require(dirs.assets + "react/targets.js"),
    rr_jsx     = require(dirs.react  + "RR.jsx");





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





gulp.task("build-less", ["make-directories"], function() {

  return gulp.src(dir("less") + "main.less")
    .pipe(less({"filename" : "main.less"}))
    .pipe(gulp.dest(dirs.built_css));

});





gulp.task("react", ["make-directories"], function() {

  var browserifyConfig = {
    "entries"    : dir("react") + "main.js",
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : !production })
    .transform({ "es6" : true }, reactify)
    .require(dir("react") + "RR.jsx", { "expose" : "RR" })
    .bundle()
    .on("error", errorHandler)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(dirs.built_js));

});





gulp.task("build-html", ["make-directories"], function() {

  console.log("Should build targets: " + JSON.stringify(targets));

  var start    = fs.readFileSync("./assets/html/index.html.start.frag",  "utf8"),
      middle   = fs.readFileSync("./assets/html/index.html.middle.frag", "utf8"),
      end      = fs.readFileSync("./assets/html/index.html.end.frag",    "utf8"),

      content  = {},

      md       = new remarkable(),

      makePage = function(Content, Script) {
        return start + Script + middle + Content + end;
      };

  targets.map(function(X) {
    X.map(function(Y) {
      var rawContent = fs.readFileSync("./assets/page_md/" + Y.url + ".md",  "utf8");
      console.log("\n\nrawcontent:\n" + rawContent);
      content[Y.url] = md.render(rawContent);
      console.log("\n\nrendercontent:\n" + content[Y.url]);
    });
  });

  var script;
  for (var page in content) {

    var json_content = JSON.stringify(content);
    console.log("\n\njsoncontent:\n" + json_content);

    var fix_closer   = new RegExp('<', 'g'); // because </script> in a string still terminates the script
    var safe_json    = json_content.replace(fix_closer, '\\x3c'); // so replace < with its unicode escape

    var json_content = JSON.stringify(content);
    console.log("\n\nsafejsoncontent:\n" + safe_json);

    var tscript = 'var content = ' + safe_json + ';';

    fs.writeFileSync("./build/publish/" + page, makePage(content[page], tscript), "utf8");

  }

});





gulp.task("uglify-js", ["build-js"], function() {
  return gulp.src(dir("built_js") + "bundle.js")
    .pipe(uglify())
    .pipe(gulp.dest(dir("uglified_js")));
});

gulp.task("skip-uglify-js", ["build-js"], function() {
  return gulp.src(dir("built_js") + "bundle.js")
    .pipe(gulp.dest(dir("uglified_js")));
});





gulp.task("build-js",   ["react"]);

gulp.task("dev-build",  ["build-html", "build-less", "skip-uglify-js"]);
gulp.task("prod-build", ["build-html", "build-less", "uglify-js"]);

gulp.task("build",      [production? "prod-build" : "dev-build"]);





gulp.task("arrange-publish", ["prod-build"], function() {

  return gulp.src([

    dir("theme")       + "**/background*.png",
    dir("background")  + "**/bg*.jpg",
    dir("built_css")   + "**/*",
    dir("uglified_js") + "**/*"

  ]).pipe(gulp.dest( dir("publish") ));

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
