
import React from 'react';
import IconButton from './IconButton';
import hideOnDocumentClickMixin from '../../mixins/hideOnDocumentClick';
import keyboardNavigationMixin from '../../mixins/keyboardNavigationMixin';
import RippleMixin from '../../mixins/RippleMixin';

var IconMenu = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    openDirection: React.PropTypes.string,
    onItemSelect: React.PropTypes.func
    /*,
    btnElement: function(props, propName) {
      if(!props[propName] || !props[propName].tagName) {
        return new Error('Prop either does not exist or is not Mountable');
      }
    }*/
  },
  mixins:[ hideOnDocumentClickMixin, RippleMixin, keyboardNavigationMixin ],
  getDefaultProps: function() {
    return {
      openDirection: "top-left"
    }
  },
  getInitialState: function() {
    return {
      menuShown: false
    }
  },
  toggleMenu: function() {
    this.setState({
      menuShown: !this.state.menuShown
    }, () => {

      if(this.state.menuShown) {
        //bind keyboard navigation
        this._bindKeyboardNav(this, this._menu, this.itemSelected);
      }
      else {
        this._unbindKeyboardNav(this);
      }

    });
  },
  itemSelected: function(evt) {
    let _val = evt.target.innerHTML;
    this.createRipple(evt, evt.currentTarget);

    setTimeout((val) => {

      if(this.props.onItemSelect && typeof this.props.onItemSelect === "function") {
        this.props.onItemSelect.call(null, val);
      }

      this.setState({
        menuShown: !this.state.menuShown
      });
    }.bind(this, _val), 500);
  },
  componentDidMount: function() {

    this._dom = React.findDOMNode(this);
    this._btn = React.findDOMNode(this.refs.btn);
    this._menu = this._dom.querySelector('ul');

    this.hideOnDocumentClick(this, this._menu, () => {
      if(this.isMounted()) {
        this._unbindKeyboardNav(this);
        this.setState({
          menuShown:false
        });
      }
    });

    let _width, _height, _btnSize, _offset = {};
    _width = this._menu.offsetWidth;
    _height = this._menu.offsetHeight;
    _btnSize = this._btn.offsetWidth;

    switch(this.props.openDirection) {
      case "top-left":
        _offset = {
          left: 0,
          top: 0
        }
        break;

      case "top-right":
        _offset = {
          left:  -_width + _btnSize,
          top: 0
        }
        break;

      case "bottom-left":
        _offset = {
          left: 0,
          top: -_height + _btnSize
        }
        break;

      case "bottom-right":
        _offset = {
          left: -_width + _btnSize,
          top: -_height + _btnSize
        }
        break;
    }

    this._menu.style.left = _offset.left+'px';
    this._menu.style.top = _offset.top+'px';

  },
  render: function() {
    let _class = (this.state.menuShown) ? "show ": '';
    switch(this.props.openDirection) {
      case "top-left":
        _class += "topleft";
        break;

      case "top-right":
        _class += "topright";
        break;

      case "bottom-left":
        _class += "bottomleft";
        break;

      case "bottom-right":
        _class += "bottomright";
        break;

      default:
        _class += "topright";
        break;
    }
    let _items = this.props.items.map((n, idx) => {
      return <li className='boldFont' onClick={ this.itemSelected } key={idx}>{ n }</li>;
    });

    return (
      <div className='iconmenu' tabIndex='0'>
        <IconButton clickHandler={ this.toggleMenu } ref='btn'>
          <i className='material-icons'>{ this.props.menuBtn || 'more_vert' }</i>
        </IconButton>
        <ul className={ _class }>
          { _items }
        </ul>
      </div>
    )
  },
});

module.exports = IconMenu;
