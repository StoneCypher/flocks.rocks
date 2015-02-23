
/* eslint-env node,browser */

(function(SState) {

    "use strict";

    var React = require("react"),
        RR    = require("RR");

    function loadHandler() {
      React.render(React.createFactory(RR)(SState), document.getElementById('host'));
    }

    document.addEventListener("DOMContentLoaded", loadHandler, false);

}(sstate));
