
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeGrid = flocks.createClass({





  componentDidMount: function() {
    this.rAF();
  },





  nextGen: function() {
    this.fset('generation', (this.fctx.generation || 0) + 1);
  },





  rAFhook: function() {

    if (this.fctx.running) {
      this.nextGen();
    }

    this.rAF();

  },





  rAF: function() {
    window.requestAnimationFrame(this.rAFhook);
  },





  render: function() {

    var grid = this.fctx.grid,
        rows = [];

    for (var j=0; j<grid.height; ++j) {
      var row = [];

      for (var i=0; i<grid.width; ++i) {
        row.push(<td style={ { backgroundColor: grid.data[j][i]? 'blue' : 'white' } }></td>);
      }

      rows.push(<tr>{row}</tr>);
    }

    return <table>{rows}</table>;

  }





});
