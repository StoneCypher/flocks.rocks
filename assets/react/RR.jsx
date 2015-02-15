
/** @jsx React.DOM */

"use strict";

var React  = require("react"),
    LSide  = require("./LeftSidebar"),
    ForkMe = require("./ForkMe"),

    RR     = React.createClass({

      render: function() {

        var pageClass;
        switch (this.props.page) {

          case '':
          case 'index.html':
            pageClass = 's1';
            break;

        }

        return (
          <div id="page" className="s1"><div id="overlay">

            <div id="content">

              <LSide content={this.props.content} page={this.props.page} targets={this.props.targets}/>

              <div dangerouslySetInnerHTML={ {__html:this.props.content[this.props.page]} } />

              <ForkMe/>

            </div>

          </div></div>
        );
      }

    });

module.exports = RR;
