
import React from 'react';
import RippleMixin from '../../mixins/RippleMixin';
import { generateRandomString, getReactDOMNode } from '../../utils/FKUtils';

var TabsControl = React.createClass({
  propTypes: {
    initialActiveTab: React.PropTypes.number,
    onChange: React.PropTypes.func
  },
  mixins: [RippleMixin],
  getDefaultProps: function(){
    return {
      initialActiveTab: 0
    }
  },
  getInitialState: function(){
    return {
      activeTabIndex: this.props.initialActiveTab || 0
    }
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    this._tabs = this._dom.querySelectorAll('.tabheader');
    this._slider = this._dom.querySelector('.tabslider');
    this.activeIndex = this.props.initialActiveTab;
  },
  tabChange: function(index, evt) {

    if(this.state.activeTabIndex === index) {
      return;
    }

    this.createRipple(evt, evt.currentTarget);

    setTimeout(() => {
      this.setState({
        activeTabIndex: index
      });
    }, 300);

  },
  render: function() {

    let _tabHeaders = [],
        _tabContents = [],
        _tabHeaderLength = (1/(this.props.children.length))*100,
        _sliderStyle = {
          width: _tabHeaderLength+'%',
          marginLeft: (this.state.activeTabIndex*_tabHeaderLength)+'%'
        }

    React.Children.map(this.props.children, (tab, index) => {

      if(tab.props.children) {

        try {
            let _tabHeader = tab.props.children[0],
                _tabContent = tab.props.children[1],
                _tabClass = (this.state.activeTabIndex === index)? 'active': '';

            if(!_tabHeader || !_tabContent) {
              throw new Error('invalid tab format. header or content block is not defined.');
              return;
            }

            if(_tabHeader.props.children && _tabContent.props.children) {
              _tabHeaders.push(
                <div
                  className={ 'tabheader '+_tabClass }
                  onClick={ this.tabChange.bind(this, index) }
                  style={{width: _tabHeaderLength+'%'}}
                  key={ generateRandomString(32, '#A') }
                >
                  { _tabHeader.props.children || null }
                </div>
              );

              _tabContents.push(
                <div
                  className={ 'tabcontent '+_tabClass }
                  key={ index }
                >
                  { _tabContent.props.children || null }
                </div>
              );
            }
        }
        catch(e) {
          console.error(e);
        }
      }
    });

    return (
      <div className='tabscontrol'>
        <div className='tabheaders'>
          { _tabHeaders }
        </div>
        <div className='tabslider' style={ _sliderStyle }></div>
        <div className='tabcontents'>
          { _tabContents }
        </div>
      </div>
    )
  }
});

module.exports = TabsControl;
