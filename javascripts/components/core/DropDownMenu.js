
import _ from 'underscore';
import React from 'react';
import { generateRandomString, getReactDOMNode } from '../../utils/FKUtils';
import RippleMixin from '../../mixins/RippleMixin';
import hideOnDocumentClickMixin from '../../mixins/hideOnDocumentClick';
import keyboardNavigationMixin from '../../mixins/keyboardNavigationMixin';

var DropDownMenu = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    items: React.PropTypes.array,
    selectHandler: React.PropTypes.func
  },
  mixins: [ RippleMixin, hideOnDocumentClickMixin, keyboardNavigationMixin ],
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      items: this.props.items || [],
      value: this.props.value || 'select a value',
      optionsShown: false,
      liHover: false
    }
  },
  toggleOptions: function() {
    if(this.state.disabled) {
      return;
    }
    this.setState({
      optionsShown: !this.state.optionsShown
    }, () => {
      if(this.state.optionsShown) {
        //bind keyboard navigation
        this._bindKeyboardNav(this, this._dom.querySelector('ul'), this.optionSelected);
      }
      else {
        this._unbindKeyboardNav(this);
      }
    });
  },
  optionSelected: function(evt) {
    let option = React.findDOMNode(evt.target).innerHTML;

    //this.createRipple(evt, evt.currentTarget);
    this.setState({
      value: option,
      optionsShown: false,
      liHover: false
    }, () => {
      if(this.props.selectHandler && (typeof this.props.selectHandler === "function")) {
        this.props.selectHandler.call(null, option);
      }
    });

  },
  liHover: function(evt) {
    this.setState({
      liHover: parseInt(evt.target.dataset.index)
    });
  },
  getValue: function() {
    return (this.state.value === "select a value") ? "": this.state.value;
  },
  componentDidMount: function() {

    this._dom = getReactDOMNode(this);

    this.hideOnDocumentClick(this, this._down, () => {
      if(this.isMounted()) {
        this._unbindKeyboardNav(this);
        this.setState({
          optionsShown:false,
          liHover: false
        });
      }
    });

  },
  componentWillUnmount: function() {
    this._unbindKeyboardNav(this);
  },
  render: function() {

    let _optionsClass = (this.state.optionsShown)? 'show': null;

    let inlineStyles = {
      dropdownmenu: {
        marginTop: '2rem',
        marginBottom: '0.5rem',
        position: 'relative',
        fontSize: '1.3rem',
        width :'100%'
      },
      input: {
        position: 'relative',
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        fontSize: '1.5rem'
      },
      matIcon: {
        position: 'absolute',
        right: '0',
        top: '0'
      },
      list: {
        display: (_optionsClass === 'show') ? 'block': 'none',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        listStyle: 'none',
        zIndex: '10',
        padding: '0',
        margin: '0',
        boxShadow: "rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.239216) 0px 1px 4px"
      },
      listItem: {
        display: 'block',
        boxSizing: 'border-box',
        color: '#333333',
        padding: '2rem',
        cursor: 'pointer',
        fontSize: '1.4rem',
        position: 'relative',
        overflow: 'hidden'
      }
    }

    let _options = this.state.items.map((item, index) => {
      let _bgColor = 'transparent', _style;
      if(this.state.liHover === index) {
        _bgColor = '#f1f1f1';
      }
      _style = _.extend({}, inlineStyles.listItem);
      return <li
              className='boldFont'
              data-index={index}
              onMouseOver={ this.liHover }
              style={ _style }
              onClick={this.optionSelected}>
                { item }
              </li>;
    });

    return (
      <div className='DropDownMenu' style={ inlineStyles.dropdownmenu } tabIndex='0'>
        <div style={ inlineStyles.input } onClick={this.toggleOptions}>
          <p>{ this.state.value }</p>
          <i className="material-icons" style={ inlineStyles.matIcon }>arrow_drop_down</i>
        </div>
        <ul style={ inlineStyles.list } ref="options">{ _options }</ul>
      </div>
    );
  }
});

module.exports = DropDownMenu;
