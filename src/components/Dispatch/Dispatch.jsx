import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Dispatch extends Component {
  componentDidMount() {
    this.props.dispatch(this.props.action);
  }
  
  render() {
    return(
      <Fragment></Fragment>
    );
  }
}

export default connect()(Dispatch);
