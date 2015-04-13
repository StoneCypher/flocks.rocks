
/** @jsx React.DOM */
/* jshint node: true, browser: true */



var BarGraph = flocks.createClass({

  render: function() {

    var self     = this,

        cols     = (this.props.data || []),
        colCount = cols.length,
        colMax   = Math.max.apply(null, cols),
        colWidth = ((101 - colCount) / colCount).toFixed(5) + '%',

        style = {

          lineHeight      : '100%',

          display         : this.props.display   || 'inline-block',

          margin          : this.props.margin    || '1em',
          padding         : this.props.padding   || '0.5em 0.5em 0 0.5em',

          width           : this.props.width     || '300px',
          height          : this.props.height    || '200px',

          border          : this.props.axisStyle || 'solid',
          borderWidth     : this.props.axisWidth || '0 0 thin thin',
          borderColor     : this.props.axisColor || 'black',

          backgroundColor : this.props.bgColor   || 'white'

        },

        makeBarStyle = function(Height, index) {
          var uBarColor = (Object.prototype.toString.call(self.props.barColor) === '[object Array]')? self.props.barColor[index % colCount] : (self.props.barColor || '#24a9e1');
          return {
            overflow        : 'hidden',
            width           : colWidth,
            height          : ((Height / colMax) * 100).toString() + '%',
            textAlign       : 'center',
            verticalAlign   : 'bottom',
            display         : 'inline-block',
            fontFamily      : self.props.fontFamily || 'sans-serif',
            fontSize        : self.props.fontSize   || '70%',
            color           : self.props.color      || 'white',
            margin          : self.props.margin     || ((index === 0)? '0' : '0 0 0 1%'),
            padding         : self.props.padding    || '0',
            backgroundColor : uBarColor
          };
        },

        outBars = cols.map(function(ColHeight, i) {
          return <div className="bar" style={makeBarStyle(ColHeight, i)}>{ColHeight.toString()}</div>;
        });

    return <div style={style}>{outBars}</div>;

  }

});
