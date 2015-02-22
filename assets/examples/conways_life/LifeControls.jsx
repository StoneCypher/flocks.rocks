
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeControls = flocks.createClass({

  changeIsRunning: function() {
    this.fset('running', this.fctx.running? false : true);
  },

  render: function() {

    var label = this.fctx.running? "Stop" : "Start";

    return (

      <div id="controls">
        <input type="button" onClick={this.changeIsRunning} value={label}/>
        &nbsp; &nbsp;
        Generation {this.fctx.generation || 0}
      </div>

    );

  }

});
