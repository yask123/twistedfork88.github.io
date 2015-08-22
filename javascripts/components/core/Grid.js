
import React from 'react';
import { generateRandomString } from '../../utils/FKUtils';

var Grid = React.createClass({
  componentDidMount: function() {
    
  },
  render: function() {
    let _items = this.props.items.map((item) => {
      return <div key={ generateRandomString(32, '#A') } className='griditem'>{ item.content }</div> ;
    });
    return (
      <div className='gridcontainer' data-columns>
        { _items }
      </div>
    )
  }
});

module.exports = Grid;
