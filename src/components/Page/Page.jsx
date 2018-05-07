import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';

import Secure from './../Secure';

class Page extends Component {
  componentDidMount() {
    document.title = this.props.title;
  }
  
  render() {
    return(
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

class SecurePage extends Component {
  render() {
    return(
      <Page title={this.props.title}>
          <Secure
            secure={this.props.children}
            unsecure={<Redirect to="/auth"/>}/>
      </Page>
    );
  }
}

class UnsecurePage extends Component {
  render() {
    return(
      <Page title={this.props.title}>
        <Secure 
          secure={<Redirect to="/user"/>}
          unsecure={this.props.children}/>
      </Page>
    );
  }
}

export { Page as default, SecurePage, UnsecurePage };