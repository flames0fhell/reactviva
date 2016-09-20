import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MuiTemplate from "./MuiTemplate.js";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {redA700} from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: redA700,
  }
});
//Views
import Navbar from "../views/Navbar.js";
import Content from "../views/Content.js";
export default class Template extends React.Component {

  render(){
    return(
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Navbar />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}
