import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import SiteHeader from './fragments/SiteHeader';

import Routes from './pages';

import rootReducer from './scripts/reducers';
import { Actions as AWS } from './scripts/aws';

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
  
  componentDidMount() {
    this.state.store.dispatch(AWS.init());
  }
  
  render() {
    return (
      <Router>
        <Provider store={this.state.store}>
          <Fragment>
            <SiteHeader/>
            <Routes />
            {/* SiteFooter ? */}
          </Fragment>
        </Provider>
      </Router>
    );
  }
}

export default App;
