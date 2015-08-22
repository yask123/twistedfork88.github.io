

import React from 'react';

var SnackBar = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      status: ''
    }
  },
  componentDidMount: function() {

    this._dom = React.findDOMNode(this);

    setTimeout(() => {
      this.setState({
        status: 'show'
      });
    }, 500);

    /*setTimeout((dom) => {

      $(dom).fadeOut(() => {
        if(this.isMounted()) {
          React.unmountComponentAtNode(dom.parentNode);
        }
      }.bind(this, dom));

    }.bind(this, this._dom), 5000);*/
  },
  toggleShow: function(evt) {
    evt.preventDefault();

    $(this._dom).fadeOut((dom) => {
      if(this.isMounted()) {
        React.unmountComponentAtNode(dom.parentNode);
      }
    }.bind(this, this._dom));

  },
  render: function() {
    return (
      <div className={ 'snackbar '+ this.state.status }>
        <div className='row'>
          <div className='col-md-1 vcenter'>
            <i className="material-icons">{ this.props.icon || 'info' }</i>
          </div>
          <div className='col-md-8 vcenter'>
            { this.props.message }
          </div>
          <div className='col-md-3 vcenter'>
            <a href='#' onClick={ this.toggleShow }>DONE</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = SnackBar;
