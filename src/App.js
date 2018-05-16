import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Amplify from 'aws-amplify';

import SiteHeader from './fragments/SiteHeader/';
import SiteFooter from './fragments/SiteFooter/';

import Routes from './pages';

import rootReducer from './scripts/reducers';

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-2:4f5f038d-5e55-4197-9be2-3cf97deefae3",
    region: "us-east-2",
    userPoolId: "us-east-2_PnDlqA54H",
    userPoolWebClientId: "4efjjmcjfc8ee0qrlrnhl9d0r6",
    mandatorySignIn: false,
    cookieStorage: {
      domain: ".codeanywhere.com",
      secure: true
    }
  },
  API: {
    endpoints: [
      {
        name: "cecs343",
        endpoint: "https://nlpakmrcbh.execute-api.us-east-2.amazonaws.com/IAM_Auth",
        region: "us-east-2"
      }
    ]
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      store: createStore(
        rootReducer,
        applyMiddleware(thunk)
      )
    };
  }
  
  render() {
    return (
      <Router>
        <Provider store={this.state.store}>
          <Fragment>
            <SiteHeader/>
            <Routes/>
            <SiteFooter/>
          </Fragment>
        </Provider>
      </Router>
    );
  }
}

export default App;
