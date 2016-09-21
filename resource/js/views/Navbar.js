import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Card,CardMedia,CardText,CardTitle,CardHeader} from 'material-ui/Card';
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
  navigate(segment){
      this.drawerToggle()
      if(segment === undefined){
        segment = "";
      }
      this.props.history.push('/' + segment)
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
        <AppBar title="SweNewS"
          onLeftIconButtonTouchTap = {this.drawerToggle.bind(this)}
          style = {styles.navBar}
        />
        <Drawer
          width = {300}
          open = {this.state.drawerStatus}
          docked = {false}
          onRequestChange={(drawerStatus) => this.setState({drawerStatus})}
        >
          <Card>
            <CardHeader
                title="Login"
                subtitle="guest"
                avatar=""
              />
          </Card>
          <MenuItem primaryText="Terbaru"
                    onTouchTap={this.navigate.bind(this,"")} />
          <MenuItem primaryText="Headline"
                    onTouchTap={this.navigate.bind(this,'headline')}/>
        </Drawer>
      </div>

    )
  }
}
