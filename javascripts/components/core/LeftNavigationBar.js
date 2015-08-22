
import React from 'react';
import IconButton from './IconButton';
import { generateRandomString } from '../../utils/FKUtils';

var LeftNavBar = React.createClass({
  getInitialState: function() {
    return {
      isShown: false,
      items: this.props.items || {}
    }
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this._allHeadings = $(this._dom).find('.leftnavbar nav dt');

    this.showLinks();

    //adjust the max-height of the contents of the navbar
    $(this._dom).find('nav').css({
      'max-height': ($(this._dom).find('.leftnavbar').height() - 250),
      'overflow-y': 'auto'
    });

    if(this.props.isShown) {
      this.setState({
        isShown: true
      });
    }

  },
  createLinks: function() {
    let _found = false, _out = [];
    let _items = this.state.items;
    for(var header in _items) {

      var _heading = <dt key={ generateRandomString(32, '#A') } onClick={this.toggleItems}>{ header }</dt>;
      var _subItems = _items[header] || [];
      _subItems = _subItems.map(function(item){
        return <dd key={ generateRandomString(32, '#A') }><a href='#' onClick={ this.navigate }>{ Object.keys(item)[0] }</a></dd>;
      }.bind(this));

      //hack for appending the sub-items
      var _x = [1];
      _subItems = _x.map(function(n) {
        return <div key={ generateRandomString(32, '#A') } data-status="collapsed">{ _subItems }</div>;
      });
      _out = _out.concat(_heading, _subItems);
    }
    return _out;
  },
  showLinks: function() {
    // collapse all links
    this._allLinkCollections = $(this._dom).find('.leftnavbar nav div');
    $(this._allLinkCollections).slideUp();
  },
  getDomNode: function(elem) {
    return React.findDOMNode(elem);
  },
  resetAllHeadings: function() {
    $(this._allHeadings).data('status', 'collapsed');

    //hide all the sub-items list div
    $(this._allLinkCollections).hide();

    //remove active class from all DIVs
    $(this._allHeadings).removeClass('active');
  },
  toggleItems: function(evt) {
    var _domElem = evt.target;
    //this.resetAllHeadings();

    if(
      $(_domElem).data('status') === "collapsed" ||
      typeof $(_domElem).data('status') === "undefined"
    ) {
      $(_domElem).addClass('active').data('status', "expanded");
      $(_domElem).next().slideDown();
    }
    else {
      $(_domElem).removeClass('active').data('status', "collapsed");
      $(_domElem).next().slideUp();
    }

  },
  toggleNavBar: function() {
    this.setState({
      isShown: !this.state.isShown
    }, () => {
      if(this.state.isShown) {
        this.showLinks();
      }
    });
  },

  navigate: function(evt) {
    this.toggleNavBar();
  },
  render: function() {
      let _class = (this.state.isShown)? 'leftnavbar shown':'leftnavbar';
      let _overlayClass = (this.state.isShown)? 'overlay shown':'overlay';

      let _out = this.createLinks();

      return(
        <div className='leftnavbarcontainer'>
          <div className={ _overlayClass } onClick={this.toggleNavBar}></div>
          <div className={ _class }>
              <span className='logo'>
                <img src='./images/navBarLogo.png' />
              </span>
              <nav>
                <dl>
                  { _out }
                </dl>
              </nav>
              <hr style={{ borderColor: '#0277BD' }}/>
              <br/>
              <div style={{padding: '0 0 0 22px'}}>
                <IconButton type='default' clickHandler={ this.toggleNavBar }>
                  <i className="material-icons">arrow_back</i>
                </IconButton>
              </div>
          </div>

        </div>
      );
  }
});

module.exports = LeftNavBar;
