
/* eslint-env node,browser */

(function(Content) {

    "use strict";

    var React = require("react"),
        RR    = require("RR");

    function loadHandler() {
      React.render(React.createFactory(RR)({'content':Content, 'page':'index.html'}), document.getElementById('host'));
    }

    document.addEventListener("DOMContentLoaded", loadHandler, false);

}(content));
