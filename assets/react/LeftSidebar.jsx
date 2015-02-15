
/** @jsx React.DOM */

"use strict";

var React       = require("react"),

    LeftSidebar = React.createClass({

      render: function() {

        var links   = [],
            content = this.props.content,
            page    = this.props.page,
            targets = this.props.targets;

        targets.map(function(Block) {
          Block.map(function(ALink, I) {
            links.push(

              <a href                    = { ALink.url }
                 key                     = { ALink.url }
                 target                  = { ALink.new_window ? '_blank' : undefined}
                 className               = { (I == (Block.length-1) ) ? 'section-end' : undefined}
                 dangerouslySetInnerHTML = { {__html:ALink.link_text}}
              />

            )
          });
        });

        return (

          <div id="left-sidebar">
            {links}
          </div>

        );

      }

    });

module.exports = LeftSidebar;
