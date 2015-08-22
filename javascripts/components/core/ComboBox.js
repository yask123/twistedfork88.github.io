

import React from 'react';
import _ from 'underscore';
import PaperInput from './PaperInput';
import { generateRandomString, getReactDOMNode, staticMessages } from '../../utils/FKUtils';

let _staticMsgs = staticMessages();

var ComboBox = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    fieldName: React.PropTypes.string,
    valueFieldName: React.PropTypes.string,
    url: React.PropTypes.string,
    items: React.PropTypes.array,
    selectHandler: React.PropTypes.func
  },
  _filter: "",
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      items: this.props.items || [],
      value: this.props.value || "",
      showResult: false,
      xhrReqDone: false
    }
  },
  fetchData: function() {
    $.ajax({
      url: this.props.url
    })
    .done((response) => {

      //small hack to handle response types for proxied requests
      if(this.props._proxied) {
        response = JSON.parse(response);
        response = response.d;
      }

      let _t = response.map((n) => {
        if(this.props.fieldName) {
          return n[this.props.fieldName];
        }
        else {
          return n;
        }
      });

      this.setState({
        items: _t,
        xhrReqDone: true
      });

    });
  },
  filterItems: function() {

    this._filter = this.refs['input'].getValue();

    if(!this._filter) {
      this.setState({
        value: "",
        showResult: false
      });
      return;
    }

    this.setState({
      showResult: true
    });
  },
  valueSelect: function(evt) {
    let _val = evt.target.innerHTML;
    this.hideResultList();

    if(_val === _staticMsgs.noItemsFound || _val === _staticMsgs.fetchingDataMsg) {
      return;
    }

    this.refs['input'].setValue(_val);
    this.setState({
      value: _val
    }, () => {
      if(this.props.selectHandler && typeof this.props.selectHandler === 'function') {
        this.props.selectHandler.call(null, this.state.value);
      }
    });
  },
  componentDidMount: function() {

    this._dom = getReactDOMNode(this);

    //check if you have an xhr url
    if(this.props.url) {
      this.fetchData();
    }

    $(document).mouseup(function(evt) {
      if(!$(this._dom).is(evt.target) && !$(this._dom).has(evt.target).length) {
        if(this.isMounted()) {
          this.setState({
            showResult:false
          });
        }
      }
    }.bind(this));

  },
  toggleResultList: function() {
    if(this.state.disabled) {
      return;
    }
    this.setState({
      showResult: !this.state.showResult
    });
  },
  hideResultList: function() {
    this.setState({
      showResult: false
    });
  },
  getValue: function() {

    /* if valueFieldName is set, then we set the value of the component to the value
     * of this valueFieldName field.

    let _val = this.state.value;
    if(this.props.fieldName && this.props.valueFieldName) {
      try {
        if(this.props.fieldName !== this.props.valueFieldName) {
          //retrieve the valueFieldName for the value
          let _item = this.state.xhrData.filter((item) => {
            return item[this.props.fieldName] === _val;
          });
          if(_item && _item.length) {
            _item = _item[0];
            _val = _item[this.props.valueFieldName];
          }
        }
      }
      catch(e) {
        console.error(e);
      }
    }
    */

    return this.state.value;
  },
  render: function() {
    let _items = this.state.items.filter((n) => {
      return n.indexOf(this._filter) > -1;
    });
    _items = _items.map((item) => {
      return <li key={ generateRandomString(32, '#A') } onClick={ this.valueSelect }>{ item }</li>;
    });
    let _class = (this.state.showResult) ? 'resultset show': 'resultset';

    //show no items found if state items array is empty
    if(!this.state.items.length) {
      let _msg = _staticMsgs.noItemsFound;
      if(!this.state.xhrReqDone) {
          _msg = _staticMsgs.fetchingDataMsg;
      }
      _items = [<li key={ generateRandomString(32, '#A') } onClick={ this.valueSelect }>{ _msg }</li>];
    }

    return (
      <div className='comboBox'>
        <div style={{position:'relative'}}>
          <PaperInput disabled={ this.state.disabled } ref="input" placeholder={ this.props.placeholder || "search..." } value={ this.state.value } changeHandler={ this.filterItems } />
          <span style={{ cursor: 'pointer', position: 'absolute', top: '30%', right:'0', zIndex:'0' }} onClick={ this.toggleResultList }>
            <i className="material-icons">expand_more</i>
          </span>
        </div>
        <div className={_class}>
          <ul>{ _items }</ul>
        </div>
      </div>
    );
  }

});

module.exports = ComboBox;
