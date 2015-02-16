
/** @jsx React.DOM */

"use strict";

var React        = require("react"),
    NextStepsRow = require("./NextStepsRow"),

    NextSteps    = React.createClass({

      render: function() {

        return (

          <div id="nextsteps">
            {this.props.next? <NextStepsRow item={this.props.next} label="Next"/> : null }
            {this.props.prev? <NextStepsRow item={this.props.prev} label="Prev"/> : null }
          </div>

        );

      }

    });

module.exports = NextSteps;
