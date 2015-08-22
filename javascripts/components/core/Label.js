
import React from 'react';

var Label = React.createClass({
  render: function() {

    let _type = this.props.type || "default";
    _type = 'label_'+_type;
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className={ _type }>
            { this.props.children || "" }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Label;
