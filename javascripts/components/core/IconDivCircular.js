

import React from 'react';

var IconDivCircular = React.createClass({
  render: function() {
    return (
      <div className='icondiv'>{ this.props.children }</div>
    )
  }
});

module.exports = IconDivCircular;
