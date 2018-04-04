import { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Routes from './routes.jsx';

import './styles/common.css';
import './styles/responsive.css';
import './styles/material.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    //TODO: Cerate Redux Store
  }
  
  render() {
    return (
      <Router>
        <Provider>
          <Routes />
        </Provider>
      </Router>
    );
  }
}

export default App;
