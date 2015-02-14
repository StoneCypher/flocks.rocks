
/** @jsx React.DOM */

"use strict";

var React       = require("react"),

    LeftSidebar = React.createClass({

      render: function() {

        return (

          <div id="left-sidebar">

            <a href="#" className="section-end"><div id="ls-logo">FLOCKS<br/><small>ROCKS</small></div></a>

            <a href="#"><b>Examples</b></a>
            <a href="#"><b>Quick Start</b></a>
            <a href="#" className="section-end"><b>Documentation</b></a>

            <a href="#">What is <b>Flocks</b>?</a>
            <a href="#" className="section-end">What is <b>React</b>?</a>

            <a href="#"><b>Flocks</b> Tutorial</a>
            <a href="#">Flocks <b>TodoMVC</b></a>
            <a href="#"><b>React</b> Tutorial</a>
            <a href="#" className="section-end"><b>Full stack</b> Tutorial</a>

            <a href="https://github.com/StoneCypher/flocks.js" target="_blank">Flocks on <b>GitHub</b></a>
            <a href="https://www.npmjs.com/package/flocks.js" target="_blank">Flocks on <b>NPM</b></a>
            <a href="#" className="section-end">Contact <b>John</b></a>

          </div>

        );

      }

    });

module.exports = LeftSidebar;
