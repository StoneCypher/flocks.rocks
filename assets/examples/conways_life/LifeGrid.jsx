
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeGrid = flocks.createClass({

  render: function() {

    var grid = this.fctx.grid,
        rows = [];

    console.log('Grid: ' + JSON.stringify(grid));

    for (var j=0; j<grid.height; ++j) {
      var row = [];

      for (var i=0; i<grid.width; ++i) {
        row.push(<td>{grid.data[j][i]}</td>);
      }

      rows.push(<tr>{row}</tr>);
    }

    return <table>{rows}</table>;

  }

});
