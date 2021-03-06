
var path       = require("path"),
    fs         = require("fs"),

    gulp       = require("gulp"),
    aws        = require("gulp-awspublish"),
    less       = require("gulp-less"),
    clean      = require("gulp-clean"),
    uglify     = require("gulp-uglify"),

    source     = require("vinyl-source-stream"),
    browserify = require("browserify"),
    react      = require("react"),
    reactify   = require("reactify"),
    jsx        = require("node-jsx").install({"extension" : ".jsx", "harmony" : true}),
    twemoji    = require("twemoji"),

    remarkable = require("remarkable"),
    hl_js      = require("highlight.js"),

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

  var start    = fs.readFileSync("./assets/html/index.html.start.frag",  "utf8"),
      middle   = fs.readFileSync("./assets/html/index.html.middle.frag", "utf8"),
      end      = fs.readFileSync("./assets/html/index.html.end.frag",    "utf8"),

      content  = {},

      hl       = function(str, lang) {
                   if (lang && hl_js.getLanguage(lang)) {
                     try         { return hl_js.highlight(lang, str).value; }
                     catch (err) {}
                   }

                   try         { return hl_js.highlightAuto(str).value; }
                   catch (err) {}

                   return ''; // use external default escaping
                 },

      md       = new remarkable({ 'highlight': hl, 'html': true }),

      makePage = function(Content, Script) {
                   var eContent = twemoji.parse(Content, {'size': '72x72'});
                   return start + Script + middle + eContent + end;
                 };

  targets.map(function(X) {
    X.map(function(Y) {
      if (Y.skip_build) { return; }
      var rawContent = fs.readFileSync("./assets/page_md/" + Y.url + ".md",  "utf8");
      content[Y.url] = md.render(rawContent);
    });
  });

  var flatten = function(tArray) {

    var result = [],
        self   = arguments.callee;

    tArray.forEach(function(item) {
      Array.prototype.push.apply(result, Array.isArray(item)? self(item) : [item]);
    });

    return result;

  };

  var flat_targets = flatten(targets);

  var get_target = function(flat_targets, page) {
    for (var i=0, iC=flat_targets.length; i<iC; ++i) {
      if (flat_targets[i].url === page) {
        prev = (i-1 < 0)?  false : flat_targets[i-1];
        next = (i+1 > iC)? false : flat_targets[i+1];
        return {prev:prev, current:flat_targets[i], next:next};
      }
    }
    return false;
  };

  var script;
  for (var page in content) {

    var json_content = JSON.stringify(content);
    var fix_closer   = new RegExp('<', 'g'); // because </script> in a string still terminates the script
    var safe_json    = json_content.replace(fix_closer, '\\x3c'); // so replace < with its unicode escape

    var tscript      = 'var sstate = {' +
                         '\'page\':\''  + page                    + '\',' +
                         '\'targets\':' + JSON.stringify(targets) +   ',' +
                         '\'content\':' + safe_json                       +
                       '};';

    var the_targets  = get_target(flat_targets, page);

    var page_cfg     = {page:page,targets:targets,content:content,target:the_targets};
    var jsx_content  = react.renderToString(react.createFactory(rr_jsx)(page_cfg));

    fs.writeFileSync("./build/publish/" + page, makePage(jsx_content, tscript), "utf8");

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





gulp.task("arrange-examples", ["prod-build"], function() {

  return gulp.src([
    dir("examples") + "**/*",
  ], {base: './assets/'}).pipe(gulp.dest( dir("publish") ));

});





gulp.task("arrange-docs", ["prod-build"], function() {

  return gulp.src([ dir("docs") + "**/*" ], {base: '../flocks.js/doc/'})
    .pipe(gulp.dest( dir("pub_docs") ));

});





gulp.task("arrange", ["arrange-examples", "arrange-docs", "prod-build"], function() {

  return gulp.src([

    dir("theme")       + "**/background*.png",
    dir("background")  + "**/bg*.jpg",
    dir("built_css")   + "**/*",
    dir("uglified_js") + "**/*",
    dir("images")      + "**/*"

  ]).pipe(gulp.dest( dir("publish") ));

});





gulp.task("publish", ["arrange"], function() {

  var headers = {"Cache-Control" : "max-age=" + max_age.toString()},
      target  = aws.create({
        "key"    : process.env.FLOCKSROCKS_ACCESS_KEY_ID,
        "secret" : process.env.FLOCKSROCKS_SECRET_ACCESS_KEY,
        "bucket" : process.env.FLOCKSROCKS_BUCKET
      });

  return gulp.src(dirs.publish + "/**/*")
    .pipe(target.publish(headers))
    .pipe(target.sync())
    .pipe(aws.reporter());

});





gulp.task("default", ["arrange"]);
