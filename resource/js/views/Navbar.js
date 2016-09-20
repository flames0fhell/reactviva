import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Navbar extends React.Component {
  constructor(){
    super();
    console.log("init");
    this.state = {
      drawerStatus : false
    }
  }
  drawerToggle(){
    //console.log(this.state);
    this.setState({
      drawerStatus : !this.state.drawerStatus
    });
  }

  render(){
    const styles = {

      navBar : {
        position : 'fixed',
        top : 0,
        right : '0px'
      }
    }
    return (
      <div>
        <AppBar title="Swen News"
          onLeftIconButtonTouchTap = {this.drawerToggle.bind(this)}
          style = {styles.navBar}
        />
        <Drawer open = {this.state.drawerStatus}
          docked = {false}
          onRequestChange={(drawerStatus) => this.setState({drawerStatus})}
        >
          <MenuItem>News</MenuItem>
          <MenuItem>Life</MenuItem>
        </Drawer>
      </div>

    )
  }
}
