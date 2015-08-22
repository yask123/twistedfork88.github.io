import React from 'react';

var LoadIcon = React.createClass({
  render: function() {
    return (
      <div className='loadspinner'>
        <svg className="spinner" width="25px" height="25px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
         <circle className="circlepath" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    );
  }
});

module.exports = LoadIcon;
