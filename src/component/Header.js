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
          <a href = "https://www.asu.edu/">
            <img src = {Full_logo}  className = "image" id = "large"/>
            <img src = {Small_logo} className = "image" id = "small" />
          </a>
        </div>
        <nav className="navbar navbar-default navbar-static-top">
            <button className="navbar-toggle" data-toggle = "collapse" data-target=".navHeaderCollapse" >
              <span className = "icon-bar" />
              <span className = "icon-bar" />
              <span className = "icon-bar" />
              <span className = "icon-bar" />
            </button>

          <div className="collapse navbar-collapse navHeaderCollapse">

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

            </div>
        </nav>
      </div>
    );
  }
}

export default Header;
