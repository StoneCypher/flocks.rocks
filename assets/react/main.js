
/* eslint-env node,browser */

(function() {

    "use strict";

    var React = require("react"),
        RR    = require("RR");

    function loadHandler() {
        React.render(React.createFactory(RR)({'a':'b'}), document.getElementById('page'));
    }

    document.addEventListener("DOMContentLoaded", loadHandler, false);

}());
