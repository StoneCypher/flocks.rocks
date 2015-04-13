
/** @jsx React.DOM */
/* jshint node: true, browser: true */



var Heatmap = flocks.createClass({

  render: function() {

    var self    = this,
        style   = { borderSpacing: '0', borderCollapse: 'collapse' },
        tdstyle = function(X) { return { backgroundColor: X, height:'38px', width:'38px', textAlign:'center', verticalAlign:'middle', border:'2px solid #e6e6e6', borderRadius:'8px' }; },
        thstyle = { fontWeight: 'normal', fontSize: '75%', fontFamily: 'sans-serif' },
        colors  = this.props.colors  || ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
        buckets = this.props.buckets || 9,
        rows    = this.props.rows,
        key     = this.props.dkey,
        flat    = [].concat.apply([], this.props.data),

        max     = Math.max.apply(null, flat),
        min     = Math.min.apply(null, flat),
        range   = max - min,
        step    = range / buckets,

        heads   = <tr><th></th>{this.props.cols.map(function(X) { return <th style={thstyle}>{X}</th>; })}</tr>,

        rows  = this.props.data.map(function(Row, i) {

          var Cells = Row.map(function(Cell) {

            var last = 0,
                idx  = 0;

            for (var i=0, iC=key.length; i<iC; ++i) {
              if (key[i] <= Cell) { last=i; }
              idx = key[i] > Cell;
            }

            return <td style={tdstyle(colors[ last ])}></td>;

          });

          return <tr><th style={thstyle}>{rows[i]}</th>{Cells}</tr>;

        }),

        colorRow = <tr>{[0,1,2,3,4,5,6,7,8].map(function(i) { return <td style={{width:'4em',height:'1.5em',backgroundColor:colors[i]}}></td>; })}</tr>,
        keyRow   = <tr>{[0,1,2,3,4,5,6,7,8].map(function(i) { return <td>&ge; {key[i]}</td>; })}</tr>;

    return (
      <div>
        <table style={style}>
          <thead>{heads}</thead>
          <tbody>{rows}</tbody>
        </table>
        <table style={{borderCollapse:'collapse',marginTop:'1em'}}><tbody>{colorRow}{keyRow}</tbody></table>
      </div>
    );

  }

});
