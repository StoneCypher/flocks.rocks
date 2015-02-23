
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeControls = flocks.createClass({

  changeIsRunning: function() {
    this.fset('running', this.fctx.running? false : true);
  },

  toggleShowRule: function() {
    this.fset('showRule', this.fctx.showRule? false : true);
  },

  render: function() {

    var label = this.fctx.running? "Stop" : "Start",
        rule  = 'b' + this.fctx.grid.rule.born.join('') + '/s' + this.fctx.grid.rule.survive.join(''),

        mrule = function(data) {
        };

/*
        <input type="button" onClick={this.toggleShowRule} value={this.fctx.showRule? 'hide rules' : rule}/>
        &nbsp; | &nbsp;
*/

    return (

      <div id="controls">
        <input type="button" onClick={this.changeIsRunning} value={label}/>
        &nbsp; &nbsp;
        Generation {this.fctx.generation || 0}
        <div style={ { display: this.fctx.showRule? 'block' : 'none' } }>
          <table id="rules">
            <tr>
              <th>Born</th>
              <td>0 <input type="checkbox"/></td>
              <td>1 <input type="checkbox"/></td>
              <td>2 <input type="checkbox"/></td>
            </tr>
            <tr>
              <th>Survive</th>
              <td>1 <input type="checkbox"/></td>
            </tr>
          </table>
        </div>
      </div>

    );

  }

});
