
import React from 'react';
import { getReactDOMNode } from '../../utils/FKUtils';

var Chip = React.createClass({
  propTypes: {
    imgSrc: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  },
  onClick: function(evt) {
    this._dom.classList.add('active');
    if(this.props.onClick && typeof this.props.onClick === "function") {
      this.props.onClick.call(null);
    }
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);

    /** remove active class if clicked anywhere else
    _jQ(document).mouseup((evt) => {
      if(!_jQ(this._dom).is(evt.target) && !_jQ(this._dom).has(evt.target).length) {
        if(this.isMounted()) {
          this._dom.classList.remove('active');
        }
      }
    });
    */
  },
  render: function() {
    return (
      <div className='chip' onClick={ this.onClick }>
        <img src={ this.props.imgSrc } />
        <p>{ this.props.name }</p>
      </div>
    )
  }
});

module.exports = Chip;
