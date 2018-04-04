import { Component, Fragment } from 'react';
import { Redirect } from 'react-router';

import SiteHeader from './SiteHeader.jsx';
import Secure from './../components/Secure';
import Page from './Page.jsx';

class SecurePage extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    document.title = this.props.title;
  }
  
  render() {
    return(
      <Page title={this.props.title}>
          <Secure
            secure={this.props.children}
            unsecure={<Redirect to="/login" />}/>
      </Page>
    );
  }
}

export default SecurePage;
