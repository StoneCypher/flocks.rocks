
/* eslint-env node,browser */

(function(Content, Page) {

    "use strict";

    var React = require("react"),
        RR    = require("RR");

    function loadHandler() {
      React.render(React.createFactory(RR)({'content':Content, 'page':Page}), document.getElementById('host'));
    }

    document.addEventListener("DOMContentLoaded", loadHandler, false);

}(sstate.content, sstate.page));
