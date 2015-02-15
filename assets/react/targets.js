
/* jshint node: true */
/* eslint-env node,browser */

"use strict";

module.exports = [

  [
    { url        : "index.html",
      link_text  : "<div id=\"ls-logo\"><span>FLOCKS</span><br/><small>ROCKS</small></div>",
      page_title : "Flocks Rocks!"
    }
  ],

  [
    { url        : "what_is_flocks.html",
      link_text  : "What is <b>Flocks</b>?",
      page_title : "What is Flocks?"
    },

    { url        : "what_is_react.html",
      link_text  : "What is <b>React</b>?",
      page_title : "What is React?"
    }
  ],

  [
    { url        : "flocks_examples.html",
      link_text  : "<b>Examples</b>",
      page_title : "Flocks Examples"
    }
  ],

  [

    { url        : "https://github.com/StoneCypher/flocks.js",
      link_text  : "Flocks on <b>GitHub</b>",
      skip_build : true
    },

    { url        : "https://www.npmjs.com/package/flocks.js",
      link_text  : "Flocks on <b>NPM</b>",
      skip_build : true
    },

    { url        : "irc://irc.freenode.com/flocksjs",
      link_text  : "<b>IRC</b> channel",
      skip_build : true
    },

    { url        : "mailto:stonecypher@gmail.com",
      link_text  : "Contact <b>John</b>",
      skip_build : true
    }

  ]

/*
  <a href="#" className="section-end"><div id="ls-logo">FLOCKS<br/><small>ROCKS</small></div></a>

  <a href="#">What is <b>Flocks</b>?</a>
  <a href="#" className="section-end">What is <b>React</b>?</a>

  <a href="#"><b>Examples</b></a>
  <a href="#"><b>Quick Start</b></a>
  <a href="#" className="section-end"><b>Documentation</b></a>

  <a href="#"><b>Flocks</b> Tutorial</a>
  <a href="#">Flocks <b>TodoMVC</b></a>
  <a href="#"><b>React</b> Tutorial</a>
  <a href="#" className="section-end"><b>Full stack</b> Tutorial</a>

  <a href="https://github.com/StoneCypher/flocks.js" target="_blank">Flocks on <b>GitHub</b></a>
  <a href="https://www.npmjs.com/package/flocks.js" target="_blank">Flocks on <b>NPM</b></a>
  <a href="#" className="section-end">Contact <b>John</b></a>
*/

];
