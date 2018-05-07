import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

const STATE_EXIT = 0;
const STATE_ENTER_INIT = 1;
const STATE_ENTER = 2;
const STATE_NORMAL = 3;

class TransitionSwitch extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      state: props.transitionInit ? STATE_ENTER_INIT : STATE_NORMAL,
      current: props.location,
      prev: null
    };
    
    this.mainRef = React.createRef();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.current.pathname) {
      return {
        state: STATE_EXIT,
        current: nextProps.location,
        prev: prevState.current
      };

    } else {
      return null;
    }
  }
  
  onTransitionEnd(e) {
    //console.log(`${e.target === this.mainRef.current} state=${this.state.state} propertyName=${e.propertyName}`);
    if (e.target !== this.mainRef.current) return;
    e.stopPropagation();
    if (this.state.state === STATE_EXIT) {
      this.setState({state: STATE_ENTER_INIT});
      
    } else if (this.state.state === STATE_ENTER_INIT) {
      this.setState({state: STATE_ENTER});
      
    } else if (this.state.state === STATE_ENTER) {
      this.setState({state: STATE_NORMAL});
      
    } else {
      //console.log(this.state.state);
    }
  }
  
  render() {
    const { children, location, tag: Tag = "main" } = this.props;
    
    let className = "";
    
    if (this.state.state === STATE_EXIT) className = `${this.props.transitionName}-exit`;
    else if (this.state.state === STATE_ENTER_INIT) className = `${this.props.transitionName}-enter-init`;
    else if (this.state.state === STATE_ENTER) className = `${this.props.transitionName}-enter`;
    else if (this.state.state === STATE_NORMAL) className = this.props.transitionName;
    
    const loc = this.state.state === STATE_EXIT ? this.state.prev : location;
    
    return(
      <Tag className={className} onTransitionEnd={this.onTransitionEnd} ref={this.mainRef}>
        <Switch location={loc}>
          {children}
        </Switch>
      </Tag>
    );
  }
}

export default withRouter(TransitionSwitch);
