import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Full_logo from '../assets/full_logo.png';
import Small_logo from '../assets/small_logo.png';
import styles from '../style/Header.css';

class Header extends Component {
  constructor() {
      super();
      //console.log(styles.background-color);
  }

  render() {

    return (
      <div>
        <div className = "header">
          <img src = {Full_logo} className = "image" id = "large"/>
          <img src = {Small_logo} className = "image" id = "small" />
        </div>
        <nav className="navbar navbar-default">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <FlatButton label="Home" className="menuBarButton"/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <FlatButton label="Announcements" className="menuBarButton"/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <FlatButton label="Projects" className="menuBarButton"/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <FlatButton label="Contact" className="menuBarButton"/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <FlatButton label="Login" id = "login" className="menuBarButton"/>
          </MuiThemeProvider>
        </nav>
      </div>
    );
  }
}

export default Header;
