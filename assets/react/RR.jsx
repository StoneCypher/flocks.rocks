
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
            pageClass = 's3';
            break;

          case 'what_is_flocks.html':
            pageClass = 's2';
            break;

          case 'flocks_examples.html':
            pageClass = 's4';
            break;

          case 'flocks_quick_start.html':
            pageClass = 's2';
            break;

          case 'flocks_docs.html':
            pageClass = 's5';
            break;

          case 'react_tutorial.html':
            pageClass = 's3';
            break;

          case 'flocks_tutorial.html':
            pageClass = 's2';
            break;

          case 'flocks_full_stack_tutorial.html':
            pageClass = 's6';
            break;

          default:
            pageClass = 's1';
            break;

        }

        return (
          <div id="page" className={ pageClass }><div id="overlay">

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
