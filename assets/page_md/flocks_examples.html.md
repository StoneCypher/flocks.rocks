# Examples of `Flocks.js` use 🚀

It is often said that a library marches on its examples.  By nobody.  Ever.

## Simple examples

* A [spinner control](http://www.flocks.rocks/examples/tiny/), showing the sharing of a single piece of data
  across several controls, using the `Flocks mixin`.

* A [Conway's Life](http://www.flocks.rocks/examples/conways_life/) implementation, showing how to work with
  basic state centralization.

## Complex examples

* [The Flocks Rocks website](http://flocks.rocks/) ([git](https://github.com/StoneCypher/flocks.rocks)) shows
  a publishing system built in `git`, which pulls `markdown` from disk, converts it to static `HTML`, uses
  `React` to render isomorphic static content to disk, compiles `LESS`, `uglifies`, `browserifies`, and pushes
  that into `Amazon S3`, to be served from `Amazon Cloudfront CDN`.  And then one may write markdown, commit,
  and `gulp publish`.  😸