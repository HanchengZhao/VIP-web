import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Login from './login/Login'
import LoginAvatar from './login/LoginAvatar';
import { observer } from "mobx-react";
import userStore from '../stores/UserStore';
import ResourceMenu from './resource/ResourceMenu';

import Full_logo from '../assets/full_logo.png';
import Small_logo from '../assets/small_logo.png';
import VIP_logo_large from '../assets/VIP_logo_large.png';
import '../style/Header.css';

@observer
class Header extends Component {

  render() {
    return (
      <div>
        <div className = "header">
          <a href = "https://www.asu.edu/">
            <img src = {Full_logo} alt = "full logo" className = "image" id = "large"/>
            <img src = {Small_logo} alt = "small logo" className = "image" id = "small" />
          </a>
            <Link to="/"><img src = {VIP_logo_large} alt = "vip logo" className = "image" id = "VIP" /></Link>
        </div>
        <nav className="navbar navbar-default navbar-static-top">

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
                    <Link to="/"><FlatButton label="Home" className="menuBarButton" fullWidth={true}/></Link>
                    {/* <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton" fullWidth={true}/></Link> */}
                    {/* <Link to="/projects"><FlatButton label="Projects" className="menuBarButton" fullWidth={true}/></Link> */}
                      <a className="dropdown">
                        <FlatButton data-toggle="dropdown" label="Faculty Resource" labelPosition="before" icon={<span className="caret"></span>} className="menuBarButton dropdown-toggle" fullWidth={true}/>
                        <div className="dropdown-menu">
                          <ResourceMenu />
                        </div>
                      </a>
                    {userStore.authed &&
                      <Link to="/dashboard"><FlatButton label="Dashboard" className="menuBarButton" fullWidth = {true}/></Link>
                    }
                    <LoginAvatar user={this.props.user}/>
                    <Login user={this.props.user} Width = {true}/>
                  </div>
                  <div className="hidden-xs"> 
                    <Link to="/"><FlatButton label="Home" className="menuBarButton" /></Link>
                    {/* <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton"/></Link> */}
                    {/* <Link to="/projects"><FlatButton label="Projects" className="menuBarButton"/></Link> */}
                    <Link to="/peer-review"><FlatButton label="Peer Review" className="menuBarButton"/></Link>
                    <a className="dropdown">
                      <FlatButton data-toggle="dropdown" label="Faculty Resource" labelPosition="before" icon={<span className="caret"></span>} className="menuBarButton dropdown-toggle"/>
                      <div className="dropdown-menu">
                        <ResourceMenu />
                      </div>
                    </a>
                    <Login user={this.props.user} />
                    <LoginAvatar user={this.props.user}/>
                    {userStore.authed &&
                    <Link to="/dashboard"><FlatButton label="Dashboard" className="menuBarButton" id = "dashboard" /></Link>                                       
                    }
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