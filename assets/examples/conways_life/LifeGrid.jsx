
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeGrid = flocks.createClass({





  componentDidMount: function() {
    this.rAF();
  },





  nextGrid: function(oldGrid) {

    var newGrid = {
      width   : oldGrid.width,
      height  : oldGrid.height,
      wrap    : oldGrid.wrap,
      rule    : oldGrid.rule,
      rulemap : oldGrid.rulemap
    };

    var NextXL, NextXR,
        NextYU, NextYD,
        Sum;

    var countNeighborsWithWrap = function(GridSource, X, Y, W, H) {
      // assumes cell contents are 0 or 1
      NextXL = ((X===0)    ? W-1 : X-1);
      NextXR = ((X===(W-1))?  0  : X+1);
      NextYU = ((Y===0)    ? H-1 : Y-1);
      NextYD = ((Y===(H-1))?  0  : Y-1);

      return GridSource[XL][YU] + GridSource[X][YU] + GridSource[XR][YU] +
             GridSource[XL][Y]           +            GridSource[XR][Y]  +
             GridSource[XL][YD] + GridSource[X][YD] + GridSource[XR][YD];
    };

    var outcome = function(GridSource, X, Y, W, H, Rule) {
      var count = countNeighborsWithWrap(GridSource, X, Y, W, H);
      return GridSource[X][Y]? oldGrid.rulemap.survive[count] : oldGrid.rulemap.born[count];
    };

    var newData = new Array(oldGrid.height);
    for (var i=0, iC = oldGrid.height; i<iC; ++i) {
      newData[i] = new Array(oldGrid.width);
      for (var j=0, jC = oldGrid.width; j<jC; ++j) {
        newData[i][j] = ((Math.random() > 0.5)? 1:0);
      }
    }

    newGrid.data = newData;

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
