
import React from 'react';
import IconButton from './IconButton';
import FlatButton from './FlatButton';

/* Card has the following types:
 * 1. basic
 * 2. solid-header
 * 3. colored
 * 4. underlined
 * 5. outlined
 * 6. rich-media
 */

var Card = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      type: 'basic'
    }
  },
  componentDidMount: function() {

    this._dom = React.findDOMNode(this);
    if(this.props.type === 'rich-media') {
      let _richMedia = $(this._dom).find('.card-rich-media-bg'),
          _w = _richMedia.width(),
          _h = (9/16)*_w;

      _richMedia
        .height(_h)
        .css({
          'background-position':'center',
          'background-repeat':'no-repeat'
        });
    }

  },
  render: function() {

    let _header = "", _content="";
    if(this.props.type === 'rich-media') {
      _header = <div className='card-header' style={{paddingLeft:'0.5rem', paddingTop:'0.5rem'}}>
                  <div className='card-rich-media-bg' style={{backgroundImage: 'url('+this.props.richMediaSrc+')' }}></div>
                </div>;
      _content = <div>
        <h4>{ this.props.title }</h4>{ this.props.content }
        <br/><br/>
      </div>;
    }
    else {
      _header = <div className='card-header boldFont'>
                  <h4>{ this.props.title || 'Header' }</h4>
                </div>;
      _content = <div>{ this.props.content }<br/><br/></div> || "";
    }

    return (
      <div className={ "card"+' '+this.props.type }>
        { _header }
        <div className='card-content'>
          { _content }
          <div className='card-actions'>
            <FlatButton type={ (this.props.type === 'colored')? 'amber': 'green' }>SHARE</FlatButton>
            <FlatButton type={ (this.props.type === 'colored')? 'amber': 'green' }>EXPLORE</FlatButton>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Card;
