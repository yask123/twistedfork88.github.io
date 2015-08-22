

import React from 'react';
import RippleMixin from '../../mixins/RippleMixin';

var List = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },
  mixins: [ RippleMixin ],
  itemClicked: function(href, isHash, evt) {
    this.createRipple(evt, evt.currentTarget);

    if(href) {
      setTimeout((href, isHash) => {
        if(isHash) {
          window.location.hash = href;
        }
        else{
          window.location = href;
        }
      }.bind(this, href, isHash), 500);
    }

  },
  render: function() {

    let _items = this.props.items.map((item, idx) => {
      return <li key={ idx } onClick={ this.itemClicked.bind(this, item.href, item.isHash) }>
                <div><i className="material-icons">{ item.icon }</i></div>
                <div>{ item.text }</div>
             </li>;
    });

    return (
      <ul className='list'>
        { _items }
      </ul>
    )
  }
});

module.exports = List;
