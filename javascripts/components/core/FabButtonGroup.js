
import React from 'react/addons';
import FabButton from './FabButton';

var FabButtonGroup = React.createClass({
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this._children = this._dom.querySelector('.fabchildren');
    let _children = this._children.querySelectorAll('.fabbutton').length;

    this._children.style.top = "calc(-100% - "+(55*(_children -1))+"px)";
  },
  toggleChildList: function() {

    if(this._children.classList.contains('show')) {
      this._children.classList.remove('show');
    }
    else {
      this._children.classList.add('show');
    }
  },
  childClick: function(cb) {
    this.toggleChildList();

    if(cb && typeof cb === 'function') {
      cb();
    }
  },
  render: function() {
    let _fabs = [];
    if(this.props.children) {
      _fabs = React.Children.map(this.props.children, (fab) => {

        let _clkHndlr = fab.props.clickHandler,
            _newChildHandler = this.childClick.bind(this, _clkHndlr);
        return React.addons.cloneWithProps(fab, { clickHandler: _newChildHandler });

      });
    }

    return (
      <div className='fabbuttongrp'>
        <div className='fabchildren'>
          { _fabs }
        </div>
        <div className='fabparent'>
          <FabButton clickHandler={ this.toggleChildList }><i className="material-icons">more_vert</i></FabButton>
        </div>
      </div>
    );
  }
});

module.exports = FabButtonGroup;
