

import React from 'react/addons';
import { getReactDOMNode } from '../../utils/FKUtils';
import { times } from 'underscore';

/** The way wizards would work is :
  * 1. the Wizard component takes an array of React components
  * 2. Each such component would need to define 2 specific methods:
  *   a. getValue: A mandatory method, that would return an object containing the value
  *      of the component. Note that this object would be passed as prop to the component when rendered
  *   b. validate: this method would be called in to determine if the wizard needs to validate
  *      before moving on to another step in the wizard. This method should return an object of
  *      the format
  *      {
  *        isValid: Boolean,
  *        validationMsg: String
  *      }
  * 3. Whenever we need to change the step in the wizard the above methods would be called in and if
  *    the validate method is defined and returns a valid component, the wizard moves to the desired
  *    step.
  */

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
    this._dom = getReactDOMNode(this);

    let _navs = $(this._dom).find('.wizardEachNav');
    _navs.each((ind, item) => {
      $(item).css('left', (ind*(100/(this.state.steps - 1)))+'%');
    });
    _navs.css('margin-left', '-20px');

  },
  stepSelect: function(step) {

    if(step < 0 || step >= this.state.steps) {
      return;
    }

    let _currentComponentVal = (this.refs[this.state.currentStep].getValue) ?
                                  this.refs[this.state.currentStep].getValue():
                                  null,
        _componentVal = this.state.componentValue.slice();

    _componentVal[this.state.currentStep] = _currentComponentVal;

    //validate if the wizard needs to move to the desired step
    if(
      this.refs[this.state.currentStep].validate &&
      typeof this.refs[this.state.currentStep].validate === 'function'
    ) {
      let _validate = this.refs[this.state.currentStep].validate();
      if(_validate && !_validate.isValid) {
        alert(_validate.validationMsg);
        return;
      }
    }

    this.setState({
      currentStep: step,
      componentValue: _componentVal
    });
  },
  canTransition: function(step) {

    if(step >= this.state.currentStep) {
      if(step - this.state.currentStep <= 1) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }

  },
  render: function() {
    let _c = -1,
        _nav = times(this.state.steps, () => {
          ++_c;
          let _class = 'wizardEachNav';
          if(_c <= this.state.currentStep) {
            _class = 'wizardEachNav active';
          }

          if(this.canTransition(_c)) {
            return <div key={_c} className={ _class } data-index={ _c } onClick={ this.stepSelect.bind(this, _c) }>{ _c + 1 }</div>;
          }
          else {
            return <div key={_c} className={ _class } data-index={ _c }>{ _c + 1 }</div>;
          }

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
        ),
        _prevStep = (this.state.currentStep - 1 < 0) ? 0: (this.state.currentStep - 1),
        _nextStep = (this.state.currentStep + 1 >= this.state.stepsCount) ? this.state.stepsCount: (this.state.currentStep + 1);

    let _leftControl = "", _rightControl = "";


    if(this.state.currentStep -1 >=0) {
      _leftControl = <div
                        className='control'
                        onClick={ this.stepSelect.bind(this, _prevStep) }
                      >
                        <i className="material-icons">keyboard_arrow_left</i>
                      </div>;
    }
    else {
      _leftControl = <div className='control inactive'>
                        <i className="material-icons">keyboard_arrow_left</i>
                      </div>
    }

    if(this.state.currentStep + 1 <this.state.steps) {
      _rightControl = <div
                        className='control'
                        onClick={ this.stepSelect.bind(this, _nextStep) }
                      >
                        <i className="material-icons">keyboard_arrow_right</i>
                      </div>;
    }
    else {
      _rightControl = <div className='control inactive'>
                        <i className="material-icons">keyboard_arrow_right</i>
                      </div>;
    }

    return (
      <div className='fkwizard'>
        <div className='wizardNav'>
          <div className='wizardNavFill' style={ _navFillStyle }></div>
          { _nav }
        </div>
        <div className='wizardContent'>
          { _component }
        </div>
        <br/><hr/><br/>
        <div className='paginatecontrols'>
        { _leftControl }
        { _rightControl }
        </div>
      </div>
    )
  }
});

module.exports = Wizard;
