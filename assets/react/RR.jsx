
/** @jsx React.DOM */

"use strict";

var React = require("react"),
    LSide = require("./LeftSidebar"),

    RR    = React.createClass({

      render: function() {
        return (
          <div id="page" className="s1"><div id="overlay">

            <div id="content">

              <LSide/>

              <h1>Flocks Rocks!</h1>
                <p>This will be the promotional webpage for <a href="https://github.com/StoneCypher/flocks.js">Flocks.JS</a>.</p>
                <p>Flocks is an application layer for <a href="http://facebook.github.io/react/">React</a>; Flocks fulfills the same role and worldview as Flux, but with a radically different (and simpler) implementation strategy.</p>

              <h1>This site has not yet been made.</h1>

                <p>Tutorials coming <i>very</i> soon now.</p>

            </div>

          </div></div>
        );
      }

    });

module.exports = RR;
