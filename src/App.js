import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import SiteHeader from './fragments/SiteHeader';

import { Home, SignIn, Error404 } from './pages';

import rootReducer from './scripts/reducers';

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
          <Route render={({ location }) => (
            <Fragment>
              <SiteHeader/>
              <Switch>
                <Route exact path="/sign-in" component={ SignIn }/>
                <Route path="/" component={ Home }/>
                <Route component={ Error404 }/>
              </Switch>
              {/* SiteFooter ? */}
            </Fragment>
          )}/>
        </Provider>
      </Router>
    );
  }
}

export default App;
