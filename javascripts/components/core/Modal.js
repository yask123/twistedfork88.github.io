
import React from 'react';
import FlatButton from './FlatButton';

var Modal = React.createClass({
  getInitialState: function() {
    return {
      isShown: true
    }
  },
  toggleShow: function(cb) {
    this.setState({
      isShown: !this.state.isShown
    }, () => {
      if(cb && typeof cb === "function") {
        cb.call(null);
      }
    });
  },
  submit: function() {
    this.toggleShow(this.props.actions[1].action);
  },
  render: function() {
    let _class = (this.state.isShown)? 'confirmmodal show':'confirmmodal';
    return (
      <div className={ _class }>
        <div className='overlay'></div>
        <div className='modalbox'>
          <div className='modalcontent'>
            <h3>{ this.props.header }</h3>
            <p>{ this.props.children }</p>
          </div>
          <div className='actions'>
            <table>
              <tr>
                <td>
                  <FlatButton clickHandler={ this.toggleShow }>cancel</FlatButton>
                </td>
                <td width='3%'></td>
                <td>
                  <FlatButton type='green' clickHandler={ this.submit }>
                    { this.props.actions[1].text || 'submit' }
                  </FlatButton>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
