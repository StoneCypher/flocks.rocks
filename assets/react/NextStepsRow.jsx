
/** @jsx React.DOM */

"use strict";

var React        = require("react"),

    NextStepsRow = React.createClass({

      render: function() {

        return (

          <div className="NextStepsRow">
            <span className="label">{this.props.label}:</span>
            <a href={this.props.item.url}>
              {this.props.item.page_title}
              { (this.props.label === "Next")? <span>&nbsp; 👉</span> : null }
              { (this.props.label === "Prev")? <span>&nbsp; 👈</span> : null }
            </a>
        </div>

        );

      }

    });

module.exports = NextStepsRow;
