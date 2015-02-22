
/* jshint node: true */
/* eslint-env node,browser */

"use strict";

module.exports = [

  [
    { url         : "index.html",
      link_text   : "<div id=\"ls-logo\"><span>FLOCKS</span><br/><small>ROCKS</small></div>",
      page_title  : "Flocks Rocks!",
      skip_footer : true
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
    { url        : "flocks_quick_start.html",
      link_text  : "<b>Quick start</b>",
      page_title : "Quick Start"
    },

    { url        : "flocks_examples.html",
      link_text  : "<b>Examples</b>",
      page_title : "Flocks Examples"
    }
  ],

  [
    { url        : "flocks_api_overview.html",
      link_text  : "<b>API Overview</b>",
      page_title : "Flocks Docs"
    },

    { url        : "flocks_docs.html",
      link_text  : "<b>Documentation</b>",
      page_title : "Flocks Docs"
    }
  ],

  [
    { url        : "react_tutorial.html",
      link_text  : "<b>React</b> Tutorial",
      page_title : "React Tutorial"
    },

    { url        : "flocks_tutorial.html",
      link_text  : "<b>Flocks</b> Tutorial",
      page_title : "Flocks Tutorial"
    },

    { url        : "flocks_full_stack_tutorial.html",
      link_text  : "Flocks <b>Full Stack</b> Tutorial",
      page_title : "Flocks Full Stack Tutorial"
    },

    { url        : "flocks_todo_mvc.html",
      link_text  : "Flocks <b>TodoMVC</b>",
      page_title : "Flocks TodoMVC"
    }

  ],

  [

    { url        : "https://github.com/StoneCypher/flocks.js",
      link_text  : "Flocks on <b>GitHub</b>",
      new_window : true,
      skip_build : true
    },

    { url        : "https://www.npmjs.com/package/flocks.js",
      link_text  : "Flocks on <b>NPM</b>",
      new_window : true,
      skip_build : true
    },

    { url        : "irc://irc.freenode.com/flocksjs",
      link_text  : "Flocks <b>IRC channel</b>",
      skip_build : true
    },

    { url        : "http://fullof.bs/",
      link_text  : "<b>John</b>'s Blog",
      new_window : true,
      skip_build : true
    },

    { url        : "mailto:stonecypher@gmail.com",
      link_text  : "Contact <b>John</b>",
      skip_build : true
    }

  ]

];
