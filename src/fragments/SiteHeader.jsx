// Library imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import { Link, NavLink } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarFixedAdjust } from 'rmwc/Toolbar';
import { Button } from 'rmwc/Button';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemText } from 'rmwc/List';
import Secure from './../components/Secure';

// Other imports
import { signOut } from './../scripts/actions';

const WrapDrawerLink = (props) => {
  return(
    <NavLink to={props.to} className="nav" onClick={props.onClick}>
      <ListItem>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
    </NavLink>
  );
}

const WrapDrawerButton = (props) => {
  return(
    <ListItem onClick={props.onClick}>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
};

class SiteHeader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showDrawer: false
    };
    
    this.closeDrawer = this.closeDrawer.bind(this);
  }
  
  closeDrawer() {
    this.setState({ showDrawer: false });
  }
  
  render() {
    return(
      <Fragment>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon onClick={() => {this.setState({showDrawer: !this.state.showDrawer})}}>menu</ToolbarMenuIcon>
              <ToolbarTitle>Dave's Bistro</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <Secure 
                secure={
                  <Button onClick={() => {this.props.dispatch(signOut())}}>Sign Out</Button>
                }
                unsecure={
                  <Link to="/sign-in"><Button theme="text-primary-on-primary" className="mdc-ripple-surface--accent">Sign In</Button></Link>
                }/>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust/>
        <Drawer
          temporary
          open={this.state.showDrawer}
          onClose={() => this.setState({showDrawer: false})}>
          <DrawerHeader>
            <span style={{fontFamily:"courier"}}>Logo Placeholder</span>
          </DrawerHeader>
          <Secure
            secure={
              <DrawerContent>
                <WrapDrawerLink to="/users/" onClick={this.closeDrawer} text="Home"/>
                <WrapDrawerButton onClick={() => {this.props.dispatch(signOut())}} text="Sign Out"/>
              </DrawerContent>
            }
            unsecure={
              <DrawerContent>
                <WrapDrawerLink to="/#top" onClick={this.closeDrawer} text="Home"/>
                <WrapDrawerLink to="/#about" onClick={this.closeDrawer} text="About"/>
                <WrapDrawerLink to="/#reviews" onClick={this.closeDrawer} text="Reviews"/>
                <WrapDrawerLink to="/sign-in" onClick={this.closeDrawer} text="Sign In"/>
              </DrawerContent>
            }/>
        </Drawer>
      </Fragment>
    );
  }
}

export default connect()(SiteHeader);
