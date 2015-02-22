
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeControls = flocks.createClass({

  changeIsRunning: function() {
    this.fset('running', this.fctx.running? false : true);
  },

  render: function() {

    var label = this.fctx.running? "Stop" : "Start",
        rule  = 'b' + this.fctx.grid.rule.born.join('') + '/s' + this.fctx.grid.rule.survive.join('');

    return (

      <div id="controls">
        <input type="button" onClick={this.changeIsRunning} value={label}/>
        &nbsp; | &nbsp;
        <input type="button" onClick={this.toggleShowRule} value={rule}/>
        &nbsp; | &nbsp;
        Generation {this.fctx.generation || 0}
      </div>

    );

  }

});
