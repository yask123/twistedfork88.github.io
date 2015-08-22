import React from 'react';

var LoadIcon2 = React.createClass({
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    $(this._dom).find('.xPath').append("<animateTransform attributeType='xml'\
      attributeName='transform'\
      type='rotate'\
      from='0 20 20'\
      to='360 20 20'\
      dur='0.5s'\
      repeatCount='indefinite'/>");

  },
  render: function() {
    return (
      <div className="spinner"></div>
    );
  }
});

module.exports = LoadIcon2;
