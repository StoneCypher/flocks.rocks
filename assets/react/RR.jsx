
/** @jsx React.DOM */

"use strict";

var React  = require("react"),
    LSide  = require("./LeftSidebar"),
    ForkMe = require("./ForkMe"),

    RR     = React.createClass({

      render: function() {
        return (
          <div id="page" className="s1"><div id="overlay">

            <div id="content">

              <LSide/>

              <div dangerouslySetInnerHTML={ {__html:this.props.content[this.props.page]} } />

              <ForkMe/>

            </div>

          </div></div>
        );
      }

    });

module.exports = RR;
