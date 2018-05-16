// Library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Link, NavLink } from 'react-router-dom';
import Secure from './../../components/Secure';

// Other imports
import { Actions } from './../../scripts/aws';

class SiteHeader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sticking: false
    };
    
    this.topHeader = React.createRef();
    
    this.onScroll = this.onScroll.bind(this);
    this.signout = this.signout.bind(this);
  }
  
  onScroll(e) {
    const header = this.topHeader.current;
    if (window.pageYOffset >= header.clientHeight) {
      this.setState({sticking: true});
      
    } else {
      this.setState({sticking: false});
    }
  }
  
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }
  
  componentWillunmount() {
    window.removeEventListener("scroll", this.onScroll);
  }
  
  signout() {
    this.props.dispatch(Actions.signout());
  }
  
  render() {
    const className = this.state.sticking ? "sticky" : "";
    
    return(
      <header>
        <div className="header" ref={this.topHeader}>
          <h1><i>DAVE's BISTRO</i></h1>
        </div>
        <div id="topnav" className={className}>
          <NavLink to="/" activeClassName="active" exact>Home</NavLink>
          <NavLink to="/about" activeClassName="active" exact>About</NavLink>
          <NavLink to="/menu" activeClassName="active" exact>Menu</NavLink>
          <NavLink to="/locations" activeClassName="active" exact>Locations</NavLink>
          <Secure
            secure={
              <div className="dropdown">
                <button className="dropbtn">Hi, Your Name</button>
                <div className="dropdown-content">
                  <Link to="/user">Account Home</Link>
                  <Link to="/user/newres">New Reservation</Link>
                  <Link to="/user/viewres">View Reservations</Link>
                  <Link to="/user/settings">Settings</Link>
                  <Link to="/auth" onClick={this.signout} className="right">Signout</Link>
                </div>
              </div>
            }
            unsecure={
              <Link to="/auth/" className="right">Login</Link>
            }/>
        </div>
      </header>
    );
  }
}

export default connect()(SiteHeader);
