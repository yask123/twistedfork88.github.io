import React from 'react';

var ProgressBar = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      type: 'indeterminate',
      min: 0,
      max: 100,
      value: 0
    }
  },
  render: function() {

    let _content = "",
        _valPercent = ((this.props.value) / (this.props.max - this.props.min))*100,
        _innerStyle = { width: _valPercent+'%' };

    if(this.props.type === 'indeterminate') {
      _content = <header className='progressbar'>
        <div aria-busy="true" aria-label="Loading, please wait." role="progressbar" />
      </header>;
    }
    else {
      _content = <div className='progressbarOuter'>
        <div className='progressbarInner' style={ _innerStyle }></div>
      </div>;
    }

    return (
      <div>
        { _content }
      </div>
    );
  }
});

module.exports = ProgressBar;
