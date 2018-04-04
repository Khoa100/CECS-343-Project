import { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class SecureComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.authenticated) {
      return(
        <Fragment>
          {this.props.secure}
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
)(MetaSecureContent);

export default Secure;
