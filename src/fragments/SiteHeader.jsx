import { Component } from 'react';

import Secure from './../components/Secure';

import UnAuthHeader from './UnAuthHeader.jsx';
import AuthHeader from './AuthHeader.jsx';

class SiteHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Secure 
        secure={<AuthHeader />}
        unsecure={<UnAuthHeader />}/>
    );
  }
}