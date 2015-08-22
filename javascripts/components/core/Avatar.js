
import React from 'react';

var Avatar = React.createClass({
  propTypes: {
    bgColor: React.PropTypes.string,
    src: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <img
        className='avatar'
        style={{backgroundColor: this.props.bgColor || ""}}
        src={this.props.src}
        width="60px"
      />
    );
  }
});


module.exports = Avatar;
