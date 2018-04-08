import React, { Component, Fragment } from 'react';

class If extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.c) {
      return(
        <Fragment>
          {this.props.children}
        </Fragment>
      );
    }
  }
}

export default If;