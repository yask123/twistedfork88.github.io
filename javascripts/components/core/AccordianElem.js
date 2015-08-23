
import React from 'react';
import List from '../core/List';
import RippleMixin from '../../mixins/RippleMixin';
import { getReactDOMNodeForRef, getReactDOMNode } from '../../utils/FKUtils';

var AccordianElem = React.createClass({
  mixins:[ RippleMixin ],
  propTypes: {
    items: React.PropTypes.array
  },
  getInitialState: function() {

    let _items = this.props.items || [],
        _state = _items.map((item) => {
          return {
            status: 'collapsed',
            item: item
          }
        });

    return {
      items: _state
    }
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
  },
  toggleCard: function(index, evt){

    this.createRipple(evt, evt.currentTarget);
    let _s = this.state.items.slice();
    _s = _s.map((item, idx) => {
      if(index === idx) {
        item.status = 'expanded';
      }
      else {
        item.status = 'collapsed';
      }
      return item;
    });

    setTimeout(() => {
      this.setState({
        items: _s
      });
    }, 500);

  },
  render: function() {

    let _items = this.state.items.map((item, index) => {
      return <div className={ 'accordianItem '+ item.status } data-status={ item.status } key={ index }>
                <div className={ 'card-head '+ item.status } onClick={ this.toggleCard.bind(this, index) }>
                  { String.prototype.toUpperCase.call(item.item.header) }
                  <i className="material-icons" style={{float:'right'}}>{ (item.status === 'collapsed') ? 'keyboard_arrow_left': 'keyboard_arrow_down' }</i>
                </div>
                <div className={ 'card-body ' + item.status }>
                  { item.item.content }
                </div>
              </div>;
    });

    return (
      <div className='accordianpanel'>
        { _items }
      </div>
    )
  }
});

module.exports = AccordianElem;
