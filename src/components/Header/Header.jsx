import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Wave from './../Wave';

const HeaderContext = React.createContext();

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showDrawer: false
    };
    
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  
  setDrawerVisiblity(v) {
    this.setState({ showDrawer: v });
  }
  
  render() {
    return(
      <header>
        <HeaderContext.Provider value={this.setDrawerVisiblity}>
          <div className="header-sticky primary shadow-2">
            <button onClick={() => this.setDrawerVisiblity(true)} className="btn-menu">
              <FontAwesomeIcon icon="bars"/>
            </button>
          </div>
          <Drawer show={this.state.showDrawer}>{this.props.children}</Drawer>
        </HeaderContext.Provider>
      </header>
    );
  }
}

function Drawer(props) {
  return (
    <Fragment>
      <HeaderContext.Consumer>
        {callback => <div className={this.props.show ? "drawer-shadow show" : "drawer-shadow"} onClick={() => callback(false)}></div>}
      </HeaderContext.Consumer>
      <nav className={this.props.show ? "drawer show" : "drawer"}>
        {this.props.children}
      </nav>
    </Fragment>
  );
}

function DrawerLink(props) {
  return(
    <NavLink
      to={props.to}
      id={props.id}
      title={props.title}
      className="link"
      activeClassName="active">
      <HeaderContext.Consumer>
        {callback => 
          <Wave onClick={() => callback(false)}>
            <span className="content">{props.children}</span>
          </Wave>
        }
      </HeaderContext.Consumer>
    </NavLink>
  );
}

function DrawerButton(props) {
  return(
    <HeaderContext.Consumer>
      {callback =>
        <Wave onCLick={(e) => {
          callback(false);
          props.onClick(e);
          }}>
        <button className="button" title={props.title}>{props.children}</button>
      </Wave>}
    </HeaderContext.Consumer>
  );
}

class DrawerLinkGroup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      show: false
    };
    
    this.onPress = this.onPress.bind(this);
  }
  
  onPress(e) {
    this.setState({show: !this.state.show});
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      children: nextProps.children.map((e) => <li>{e}</li>)
    };
  }
  
  render() {
    return(
      <Fragment>
        <div className="link">
          <Wave>
            <span className="content">
              <a className="drawer-link" onClick={this.onPress}>{this.props.name}</a>
            </span>
          </Wave>
        </div>
        <ul className={this.state.show ? "link-group show" : "link-group"}>
          {this.state.children}
        </ul>
      </Fragment>
    );
  }
}

export default Header;
export DrawerLink as Link;
export DrawerButton as Button;
export DrawerLinkGroup as LinkGroup;