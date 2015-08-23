

import React from 'react/addons';
import _ from 'underscore';

var Wizard = React.createClass({
  propTypes: {
    stepsCount: React.PropTypes.number.isRequired,
    components: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      components: this.props.items || [],
      componentValue: [],
      steps: this.props.stepsCount,
      currentStep: 0,
      _count: 0
    }
  },
  componentDidMount: function() {
    //align the navs
    this._dom = React.findDOMNode(this);
    this._navFill = this._dom.querySelector('.wizardNavFill');

    let _navs = $(this._dom).find('.wizardEachNav');
    _navs.each((ind, item) => {
      $(item).css('left', (ind*(100/(this.state.steps - 1)))+'%');
    });

    _navs.css('margin-left', '-20px');
  },
  stepSelect: function(step) {

    let _currentComponentVal = (this.refs[this.state.currentStep].getValue) ?
                                  this.refs[this.state.currentStep].getValue():
                                  null,
        _componentVal = this.state.componentValue.slice();

    _componentVal[this.state.currentStep] = _currentComponentVal;
    this.setState({
      currentStep: (step - 1),
      componentValue: _componentVal
    });
  },
  render: function() {
    let _c = 0,
        _nav = _.times(this.state.steps, () => {
          ++_c;
          let _class = 'wizardEachNav';
          if(_c -1 <= this.state.currentStep) {
            _class = 'wizardEachNav active';
          }
          return <div key={_c} className={ _class } data-index={ _c } onClick={ this.stepSelect.bind(this, _c) }>{ _c }</div>;

        }),
        _navFillStyle = {
          width: ((this.state.currentStep*100)/(this.state.steps - 1)) + '%'
        },
        _component = React.addons.cloneWithProps(
          this.state.components[this.state.currentStep],
          {
            ref: this.state.currentStep,
            value:(this.state.componentValue[this.state.currentStep] || {})
          }
        );

    return (
      <div className='fkwizard'>
        <div className='wizardNav'>
          <div className='wizardNavFill' style={ _navFillStyle }></div>
          { _nav }
        </div>
        <div className='wizardContent'>
          { _component }
        </div>
      </div>
    )
  }
});

module.exports = Wizard;
