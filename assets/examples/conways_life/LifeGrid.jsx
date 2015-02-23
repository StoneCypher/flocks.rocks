
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeGrid = flocks.createClass({





  componentDidMount: function() {
    this.rAF();
  },





  nextGrid: function(oldGrid) {

    var newGrid = {
          width  : 24,
          height : 16,
          wrap   : false,
          rule   : { born: [3], survive: [2,3] },
          data   : [
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,1,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,1,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],

            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],

            [ 0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,1,1,1, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0 ],

            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,1,1 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 1,1,1,0 ],
            [ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ]
          ]
        };

    return newGrid;

  },





  nextGen: function() {
    this.flock();

    this.fset('generation', (this.fctx.generation || 0) + 1);
    this.fset('grid',       this.nextGrid(this.fctx.grid));

    this.funlock();
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
        rows = [],
        row,
        key,
        style;

    for (var j=0; j<grid.height; ++j) {
      row = [];

      for (var i=0; i<grid.width; ++i) {
        key = 'td_' + i.toString() + '_' + j.toString();
        style = { backgroundColor: grid.data[j][i]? 'blue' : 'white' };
        row.push(<td key={key}style={style}></td>);
      }

      rows.push(<tr key={'tr_'+j.toString()}>{row}</tr>);
    }

    return <table id="grid">{rows}</table>;

  }





});
