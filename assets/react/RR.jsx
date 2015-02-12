
/** @jsx React.DOM */

"use strict";

var React = require("react"),
    RR    = React.createClass({

      render: function() {
        return (<div>

          <h1>Flocks Rocks!</h1>
            <p>This will be the promotional webpage for <a href="https://github.com/StoneCypher/flocks.js">Flocks.JS</a>.</p>
            <p>Flocks is an application layer for <a href="http://facebook.github.io/react/">React</a>; Flocks fulfills the same role and worldview as Flux, but with a radically different (and simpler) implementation strategy.</p>

          <h1>This site hasn't yet been made.</h1>

            <p>In the meantime, please enjoy these <a href="https://reactjsnews.com/making-react-make-sense/">tutorials</a> I'm writing.  They will also be hosted here momentarily.</p>
            <p>Coming <i>very</i> soon now.</p>

        </div>);
      }

    });

module.exports = RR;
