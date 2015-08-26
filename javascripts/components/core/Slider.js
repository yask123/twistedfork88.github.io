

import React from 'react';
import _jQ from 'jquery';
import Draggable from 'react-draggable';

var Slider = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    onValueChange: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      min: 0,
      max: 100,
      type: 'normal',
      color: ''
    }
  },
  getInitialState: function() {
    let _width = 0;
    if(this.props.value >= this.props.min && this.props.value <= this.props.max) {
      _width = Math.floor(((this.props.value - this.props.min)/(this.props.max - this.props.min))*100);
    }
    if(isNaN(_width)) {
      _width = 0;
    }
    return {
      value: this.props.value || this.props.min,
      width:_width+'%',
      thumbStart: _width
    }
  },
  mouseDown: function() {
    this._thumb.classList.add('pin');
  },
  mouseUp: function() {
    this._dragging = false;
    this._thumb.classList.remove('pin');
  },
  dragStart: function() {
    this._dragging = true;
  },
  drag: function(evt, ui) {

    this._trackLength = this._track.offsetWidth;
    let _lastPosition = evt.pageX - this._trackOffset.left;

    if(_lastPosition < 0) {
      _lastPosition = 0;
    }
    else if(_lastPosition > this._trackLength) {
      _lastPosition = this._trackLength;
    }

    if(_lastPosition >=0 && _lastPosition <= this._trackLength) {
      this._lastPosition = _lastPosition;
      this._thumb.dataset.value = Math.floor((this.props.max/this._trackLength)*this._lastPosition);

      this.setState({
        value: this._thumb.dataset.value,
        width: this._lastPosition+'px'
      }, () => {
        if(this.props.onValueChange && typeof this.props.onValueChange === "function") {
          this.props.onValueChange.call(null, this.state.value);
        }
      });
    }
  },
  dragEnd: function() {
    this._dragging = false;
    this._thumb.classList.remove('pin');
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this._track = this._dom.querySelector('.track');
    this._trackfill = this._track.querySelector('.trackfill');
    this._thumb = this._dom.querySelector('.thumb');

    this._trackLength = this._track.offsetWidth;
    this._trackOffset = _jQ(this._track).offset();

    _jQ('.thumb.react-draggable-dragging').bind('mousedown', (e) => {
      this.mouseDown(e);
    });
    this.setValue(this.props.value);

  },
  getValue: function() {
    return this.state.value;
  },
  setValue: function(value) {
    /** we need to show value for the PIN */
    if(this.props.type === "pin") {
      this._thumb.dataset.value = value;
    }

    let _width = 0;
    if(value >= this.props.min && value <= this.props.max) {
      _width = Math.floor(((value - this.props.min)/(this.props.max - this.props.min))*100);
    }
    if(isNaN(_width)) {
      _width = 0;
    }

    this._thumb.style.left = _width+'%';
    this._trackfill.style.width = _width+'%';

    this.setState({
      value: value,
      width:_width+'%',
      thumbStart: _width
    });

  },
  render: function() {
    let _class = "thumb "+this.props.type+' '+this.props.color;
    return (
      <div className={ 'slider'+' '+ this.props.color }>
        <div className='track'>
          <div className='trackfill' style={ {width: this.state.width } }></div>
        </div>
        <Draggable
          axis="x"
          handle=".thumb"
          onDrag={ this.drag }
          bounds="parent"
          >
          <div className={ _class }
            data-value="0"
            onMouseDown={ this.mouseDown }
            onMouseUp={ this.mouseUp }
          >
          </div>
        </Draggable>
      </div>
    )
  }
});

module.exports = Slider;
