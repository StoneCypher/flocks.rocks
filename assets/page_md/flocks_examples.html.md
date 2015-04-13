# Examples of `Flocks.js` use 🚀

It is often said that a library marches on its examples.  By nobody.  Ever.





## Simple flocks examples

* A [spinner control](/examples/spinner/), showing the sharing of a single piece of data
  across several controls, using the `Flocks mixin`, how to display it, and how to mutate
  it simply with two buttons.

* A simple [Conway's Life](/examples/simple_conways_life/) implementation, showing how to work with
  basic state centralization, how to attach click handlers to inappropriate things (table cells,)
  and how to use lots of the color blue.

* A working [Markdown Editor with Live Preview](/examples/markdown_word_processor/) which shows how
  to work with textareas, a foreign markdown library loaded from CDN, and simple regular expressions.

* A simple [tip calculator](/examples/tipcalc/) which shows how to work with text inputs, buttons,
  and basic CSS.  Also, presented being built piece by piece as part of the
  [Flocks Quick Start](http://www.flocks.rocks/flocks_quick_start.html) tutorial.

* A quick implementation of [automatic load and save with localStorage](/examples/save_load_state/)
  which shows how to wire localStorage up to be stored to on every state change, with no need to
  voluntarily save, and how to load initially with consulting that storage in mind.





## Simple react examples

* A simple [bar graph control](/examples/simple_bar_graph/) which accepts a range of configuration
  parameters and scales itself to fit its space.

* An animated, live-editable [animated bar graph control](/examples/animated_bar_graph/).





## Complex examples

* [The Flocks Rocks website](http://flocks.rocks/) ([git](https://github.com/StoneCypher/flocks.rocks)) shows
  a publishing system built in `git`, which pulls `markdown` from disk, converts it to static `HTML`, uses
  `React` to render isomorphic static content to disk, compiles `LESS`, `uglifies`, `browserifies`, and pushes
  that into `Amazon S3`, to be served from `Amazon Cloudfront CDN`.  And then one may write markdown, commit,
  and `gulp publish`.  😸