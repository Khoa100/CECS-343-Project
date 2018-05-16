import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SiteFooter extends Component {
  render() {
    return(
      <footer>
        <div className="footer">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </footer>
    );
  }
}

export default SiteFooter;
