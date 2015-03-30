# Examples of `Flocks.js` use 🚀

It is often said that a library marches on its examples.  By nobody.  Ever.





## Simple examples

* A [spinner control](/examples/tiny/), showing the sharing of a single piece of data
  across several controls, using the `Flocks mixin`.

* A simple [Conway's Life](/examples/simple_conways_life/) implementation, showing how to work with
  basic state centralization.





## Intermediate examples

* A simple [Markdown Word Processor](/examples/markdown_word_processor/).

* A more involved [Conway's Life](/examples/conways_life/) implementation, showing grid size modification,
  custom rulesets, state save/load, and basic CSS animation.





## Complex examples

* [The Flocks Rocks website](http://flocks.rocks/) ([git](https://github.com/StoneCypher/flocks.rocks)) shows
  a publishing system built in `git`, which pulls `markdown` from disk, converts it to static `HTML`, uses
  `React` to render isomorphic static content to disk, compiles `LESS`, `uglifies`, `browserifies`, and pushes
  that into `Amazon S3`, to be served from `Amazon Cloudfront CDN`.  And then one may write markdown, commit,
  and `gulp publish`.  😸