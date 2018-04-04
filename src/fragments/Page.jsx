import { Component, Fragment } from 'react';

import SiteHeader from './SiteHeader.jsx';

class Page extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    document.title = this.props.title;
  }
  
  render() {
    return(
      <Fragment>
        <SiteHeader />
        <main className="container">
          {this.props.children}
        </main>
        /* Site Footer? */
      </Fragment>
    );
  }
}

export default Page;
