import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Login from './login/Login'
import LoginAvatar from './login/LoginAvatar';

import Full_logo from '../assets/full_logo.png';
import Small_logo from '../assets/small_logo.png';
import Vip_logo from '../assets/Vip_logo.png';
import '../style/Header.css';





class Header extends Component {

  render() {

    return (
      <div>
        <div className = "header">
          <a href = "https://www.asu.edu/">
            <img src = {Full_logo}  className = "image" id = "large"/>
            <img src = {Small_logo} className = "image" id = "small" />
          </a>
            <img src = {Vip_logo} className = "image" id = "VIP" />
        </div>
        <nav className="navbar navbar-default navbar-static-top" id="TEST" >

            <button className="navbar-toggle" data-toggle = "collapse" data-target=".navHeaderCollapse">
              <span className = "icon-bar" />
              <span className = "icon-bar" />
              <span className = "icon-bar" />
              <span className = "icon-bar" />
            </button>

          <div className="collapse navbar-collapse navHeaderCollapse" >
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                  <div data-toggle="collapse" data-target=".navHeaderCollapse" className="visible-xs row" > 
                    <Link to="/"><FlatButton label="Home" className="menuBarButton" /></Link>
                    <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton"/></Link>
                    <Link to="/projects"><FlatButton label="Projects" className="menuBarButton"/></Link>
                    <Link to="/contact"><FlatButton label="Contact" className="menuBarButton"/></Link>
                    <Login user={this.props.user} />
                  </div>
                  <div className="hidden-xs"> 
                    <Link to="/"><FlatButton label="Home" className="menuBarButton" /></Link>
                    <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton"/></Link>
                    <Link to="/projects"><FlatButton label="Projects" className="menuBarButton"/></Link>
                    <Link to="/contact"><FlatButton label="Contact" className="menuBarButton"/></Link>
                    <Login user={this.props.user} />
                    <LoginAvatar user={this.props.user}/>                                        
                  </div>
                </div>  
              </MuiThemeProvider>
          </div>

        </nav>
      </div>
    );
  }
}

export default Header;
