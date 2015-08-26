
import React from 'react';
import touchRippleMixin from '../../mixins/TouchRipple';
import { getReactDOMNode } from '../../utils/FKUtils';

var RadioElement = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool,
    onItemSelect: React.PropTypes.func
  },
  mixins: [ touchRippleMixin ],
  getInitialState: function() {
    return {
      isDisabled: this.props.disabled || false,
      items: this.props.items || []
    }
  },
  itemSelected: function(evt) {
    if(this.state.isDisabled) {
      return;
    }

    let _index = parseInt(evt.currentTarget.dataset.index),
        _tItems = this.state.items.slice().map((item, index) => {
          if(_index === index) {
            if(item.selected) {
              //item.selected = false;
            }
            else {
              item.selected = true;
            }
          }
          else  {
            item.selected = false;
          }
          return item;
        });

        this.setState({
          items: _tItems
        }, (item) => {
          if(this.props.onItemSelect && typeof this.props.onItemSelect === "function") {
            this.props.onItemSelect.call(null, item);
          }
        }.bind(this, _tItems[_index]));
  },
  getValue: function() {
    let _t =  this.state.items.filter((item) => {
      return item.selected === true;
    });
    return _t[0] || null;
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    this._radios = Array.prototype.slice.call(this._dom.querySelectorAll('.radioelementitem'));

    this._radios.forEach((radio) => {
      this._attachRipple(radio.querySelector('.circle'));
    });

  },
  render: function() {
    let _items = this.state.items.map((item, index) => {
      let _class = (item.selected) ? "radioelementitem selected": "radioelementitem";
      return <li
              onClick={ this.itemSelected }
              className={ _class }
              key={ index }
              data-index={ index }
              data-value={ item.value }>
                <div className='circle'>
                  <p></p>
                </div>
                <label>{ item.label }</label>
              </li>;
    });
    return (
      <ul className='radioelement'>
        { _items }
      </ul>
    )
  }
});

module.exports = RadioElement;
