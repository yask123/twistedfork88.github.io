
import React from 'react';
import _jQ from 'jquery';

var Timeline = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this._timelineBar = this._dom.querySelector('.timelinebar');
    let _items = _jQ(this._dom).find('.timelineitem');

    _items.each((idx, item) => {
      let _offset = _jQ(item).position(), _ht = _jQ(item).height();

      if(idx === 0) {
        _jQ(this._timelineBar).find('span:first-child').css({
          height: _ht/2+'px'
        });
      }
      else if(idx === _items.length - 1) {
        _jQ(this._timelineBar).find('span:last-child').css({
          height: _ht/2+'px'
        });
      }
    });

  },
  render: function() {

    let _items = this.props.items || [],
        _timelineitems = _items.map((item, idx) => {
          return <div className='timelineitem' data-markervalue={ idx+1 }>
                    <h5>{ item.title }</h5>
                    <p>
                      { item.content }
                    </p>
                  </div> ;
        });

    return (
      <div className='timeline'>
        <div className='timelinebar'>
          <span></span>
          <span></span>
        </div>
        { _timelineitems }
      </div>
    )
  }
});

module.exports = Timeline;
