import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class SecureComponent extends Component {
  render() {
    if (this.props.authenticated) {
      return(
        <Fragment>
          {this.props.secure ? this.props.secure : this.props.children}
        </Fragment>
      );
    } else {
      return(
        <Fragment>
          {this.props.unsecure}
        </Fragment>
      );
    }
  }
}

//TODO: check if state includes valid login credentials
const Secure = connect(
  (state, ownProps) => {
    return {
      authenticated: false
    };
  }
)(SecureComponent);

export default Secure;
