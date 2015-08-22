
import React from 'react';

/**Under development*/
var CircularGauge = React.createClass({
  propTypes: {
    angle: React.propTypes.number.isRequired //angle in degrees
  },
  RAF: (
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.requestAnimationFrame
  ),
  colorSwatch: ["#2196F3", "#009688", "#2979FF", "#FF9800"],
  componentDidMount: function() {
    let canvas = React.findDOMNode(this).querySelector('canvas'),
        context = canvas.getContext('2d'),
        _width = canvas.width,
        cen_y = cen_x = _width / 2,
        radius = 0.4  *_width,
        _startAngle = 0,
        _endAngle = this.props.angle;

    let _t = Math.floor((Math.random()/2)*8);
    this._strokeColor = this.colorSwatch[_t];
    this._startAngle = 0;
    this._endAngle = _endAngle;

    /** TODO:: add RAF support */
    this.RAF = null;

    if(this.RAF) {
      this.RAF(this.rafPlot.bind(this, context, cen_x, cen_y, radius, this._startAngle, _width));
    }
    else {
      this._int = setInterval(() => {
        if(_startAngle < _endAngle) {
          this.plot(context, cen_x, cen_y, radius, _startAngle, _width);
          _startAngle++;
        }
        else {
          clearInterval(this._int);
        }
      }, 0);
    }
  },
  rafPlot: function(context, cen_x, cen_y, radius, endAngle, _width) {
    this.plot(context, cen_x, cen_y, radius, endAngle, _width);
    this._startAngle++;
    if(this._startAngle < this._endAngle) {
      this.RAF(this.rafPlot.bind(this, context, cen_x, cen_y, radius, this._startAngle, _width));
    }
  },
  plot: function(context, cen_x, cen_y, radius, endAngle, _width) {
    let _text = Math.floor((endAngle/360)*100)+'%';
    endAngle = (Math.PI/180)*endAngle;
    context.clearRect(0, 0, _width, _width);

    context.lineCap = "round";
    context.beginPath();
      context.arc(cen_x, cen_y, radius, 0, 2*Math.PI, false);
      context.lineWidth = 20;

      // line color
      context.strokeStyle = '#E0E0E0';
      context.stroke();

    context.beginPath();
      context.arc(cen_x, cen_y, radius, 0, endAngle, false);
      context.lineWidth = 20;

      // line color

      context.strokeStyle = this._strokeColor;
      context.stroke();

    context.font = '1.3rem Riona';
    context.fillText(_text, cen_x - 15, cen_y + 5);

    if(this.RAF) {
      this.RAF(this.plot.bind(this, context, cen_x, cen_y, radius, endAngle, _width));
    }

  },
  render: function() {
    return (
      <div className='chartcontainer'>
        <h4 className='leftborderbox'>{ this.props.title || "" }</h4>
        <canvas width='150px' height='150px'></canvas>
      </div>
    )
  }
});

module.exports = CircularGauge;
