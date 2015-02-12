
/* eslint-env node,browser */

(function() {

    "use strict";

    var React = require("react"),
        Main  = require("main");

    function loadHandler() {
        React.render(React.createFactory(Main)(null), document.body);
    }

    document.addEventListener("DOMContentLoaded", loadHandler, false);

}());
