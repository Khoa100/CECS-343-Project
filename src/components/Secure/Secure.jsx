import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AWS from './../../scripts/aws';

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
      authenticated: state.aws.state === AWS.STATE_AUTHED
    };
  }
)(SecureComponent);

export default Secure;
