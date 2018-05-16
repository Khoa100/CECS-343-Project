import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Page from './../../components/Page';

class Home extends Component {
  render() {
    return(
      <Page title="Dave's Bistro">
        <div className="content">
          <div className="grid-container">
            <div className="item1 thumbnail">
              <img src="/static/images/index/index1.jpg" alt="Dave's Bistro"/>
            </div>
            <div className="item2">
              <Link to="/auth/create" className="thumbnail">
                <img src="/static/images/index/index2.jpg" alt="Sign Up"/>
              </Link>
            </div>
            <div className="item3">
              <Link to="/menu#desserts" className="thumbnail">
                <img src="/static/images/index/index3.jpg" alt="New Milkshakes"/>
              </Link>
            </div>
            <div className="item4">
              <Link to="/menu" className="thumbnail">
                <img src="/static/images/index/index4.jpg" alt="Lunch Special"/>
              </Link>
            </div>
            <div className="item5">
              <Link to="/menu#desserts" className="thumbnail">
                <img src="/static/images/index/index5.jpg" alt="Delicious Desserts"/>
              </Link>
            </div>
            <div className="item6">
              <Link to="/about" className="thumbnail">
                <img src="/static/images/index/index6.jpg" alt="About Us"/>
              </Link>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Home;
