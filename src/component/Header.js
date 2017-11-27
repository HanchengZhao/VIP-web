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
          <div>
            <div id="main-search" className="main-search closed"></div>
            <div id="asu_hdr" className="asu_hdr_white">
                <div id="asu_mobile_hdr">
                    <div id="asu_logo">
                        <a href="//www.asu.edu/" target="_top" title="Arizona State University">
                        <img alt="ASU Logo" src="//www.asu.edu/asuthemes/4.6/assets/full_logo.png"/></a>
                    </div>
                    <div className="asuhide f-navicon" id="asu_mobile_button" onclick="javascript:ASUHeader.toggleASU();">
                        <a href="javascript:ASUHeader.toggleASU();">Menu</a>
                    </div>
                    <div className="f-search" id="search_new" onclick="javascript:ASUHeader.toggleASU('main-search');"></div>
                </div>
                <div className="closed" id="asu_mobile_menu">
                    <div id="asu_nav_wrapper">
                        <ul id="asu_login_module">
                            <li className="end" id="asu_hdr_ssi">
                                <a href="//weblogin.asu.edu/cgi-bin/login" onclick="this.href=ASUHeader.alterLoginHref(this.href);" onfocus="this.href=ASUHeader.alterLoginHref(this.href);" onmouseover="this.href=ASUHeader.alterLoginHref(this.href);" target="_top">Sign In</a>
                            </li>
                        </ul>
                        <div id="asu_nav_menu" role="navigation" aria-label="ASU">
                            <div id="asu_universal_nav">
                                <ul>
                                    <li className="parent"><a href="//www.asu.edu/" target="_top">ASU Home</a>
                                        <ul>
                                            <li><a className="first" href="//www.asu.edu/?feature=newsevents" target="_top" title="News and Events">News/Events</a></li>
                                            <li><a href="//www.asu.edu/?feature=academics" target="_top" title="Academics">Academics</a></li>
                                            <li><a href="//www.asu.edu/?feature=research" target="_top" title="Research">Research</a></li>
                                            <li><a href="//www.asu.edu/?feature=athletics" target="_top" title="Athletics">Athletics</a></li>
                                            <li><a href="//www.asu.edu/?feature=alumni" target="_top" title="Alumni">Alumni</a></li>
                                            <li><a href="//www.asu.edu/?feature=giving" target="_top" title="Giving">Giving</a></li>
                                            <li><a href="//www.asu.edu/?feature=president" target="_top" title="President">President</a></li>
                                            <li><a href="//www.asu.edu/?feature=aboutasu" target="_top" title="About ASU">About ASU</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="//my.asu.edu/" target="_top">My ASU</a></li>
                                    <li className="parent"><a href="//www.asu.edu/colleges/" target="_top">Colleges &amp; Schools</a>
                                        <ul>
                                            <li><a className="first" href="//artsandsciences.asu.edu/" target="_top" title="Arts and Sciences website">Arts and Sciences</a></li>
                                            <li><a href="//wpcarey.asu.edu/" target="_top" title="W. P. Carey School of Business Web and Morrison School of Agribusiness website">Business</a></li>
                                            <li><a href="//herbergerinstitute.asu.edu" target="_top" title="Herberger Institute for Design and the Arts website">Design and the Arts</a></li>
                                            <li><a href="//education.asu.edu/" target="_top" title="Mary Lou Fulton Teachers College website">Education</a></li>
                                            <li><a href="//engineering.asu.edu/" target="_top" title="Engineering website">Engineering</a></li>
                                            <li><a href="//sfis.asu.edu/" target="_top" title="Future of Innovation in Society website">Future of Innovation in Society</a></li>
                                            <li><a href="//graduate.asu.edu" target="_top" title="Graduate College website">Graduate</a></li>
                                            <li><a href="//chs.asu.edu/" target="_top" title="Health Solutions website">Health Solutions</a></li>
                                            <li><a href="//honors.asu.edu/" target="_top" title="Barrett, The Honors College website">Honors</a></li>
                                            <li><a href="//cronkite.asu.edu" target="_top" title="Walter Cronkite School of Journalism and Mass Communication website">Journalism</a></li>
                                            <li><a href="//www.law.asu.edu/" target="_top" title="Sandra Day O' Connor College of Law website">Law</a></li>
                                            <li><a href="//nursingandhealth.asu.edu/" target="_top" title="College of Nursing and Health Innovation website">Nursing and Health Innovation</a></li>
                                            <li><a href="//copp.asu.edu" target="_top" title="College of Public Programs website">Public Service and Community Solutions</a></li>
                                            <li><a href="//schoolofsustainability.asu.edu" target="_top" title="School of Sustainability website">Sustainability</a></li>
                                            <li><a href="//uc.asu.edu/" target="_top" title="University College website">University College</a></li>
				                            <li><a target="_top" href="http://www.thunderbird.edu/" title="Thunderbird School of Global Management website">Thunderbird School of Global Management</a></li>
                                        </ul>
                                    </li>
                                    <li class="parent"><a href="//www.asu.edu/map/" target="_top">Map &amp; Locations</a>
                                        <ul>
                                            <li><a className="border first" href="//www.asu.edu/map/" target="_top">Map</a></li>
                                            <li><a href="//campus.asu.edu/tempe/" target="_top" title="Tempe campus">Tempe</a></li>
                                            <li><a href="//campus.asu.edu/west/" target="_top" title="West campus">West</a></li>
                                            <li><a href="//campus.asu.edu/polytechnic/" target="_top" title="Polytechnic campus">Polytechnic</a></li>
                                            <li><a href="//campus.asu.edu/downtown/" target="_top" title="Downtown Phoenix campus">Downtown Phoenix</a></li>
                                            <li><a href="//asuonline.asu.edu/" target="_top" title="Online and Extended campus">Online and Extended</a></li>
                                            <li><a href="//havasu.asu.edu/" target="_top">Lake Havasu</a></li>
                            				<li><a class="border" target="_top" href="http://www.thunderbird.edu/about-thunderbird/locations/phoenix-arizona">Thunderbird</a></li>
                                            <li><a href="//skysong.asu.edu/" target="_top">Skysong</a></li>
                                            <li><a href="//asuresearchpark.com/" target="_top">Research Park</a></li>
                                            <li><a href="//washingtoncenter.asu.edu/" target="_top">Washington D.C.</a></li>
                                            <li><a href="//wpcarey.asu.edu/mba/china-program/english/" target="_top">China</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="//isearch.asu.edu/" target="_top" title="Directory, Index and other info">Directory</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="asu_search">
                        <div id="asu_search_module">
                            <form target="_top" action="https://search.asu.edu/search" id="asu_search_placeholder" method="get" name="gs" role="search">
                                <label for="masu_search_box">Search</label>
                                <input className="asu_search_button" type="submit" value="Search"/>
                                <input name="q" class="asu_search_box" id="masu_search_box" placeholder="Search" autocomplete="off" type="text"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className = "header">
          <a href = "https://www.asu.edu/">
            <img src = {Full_logo} alt = "full logo" className = "image" id = "large"/>
            <img src = {Small_logo} alt = "small logo" className = "image" id = "small" />
          </a>
            <Link to="/"><img src = {VIP_logo_large} alt = "vip logo" className = "image" id = "VIP" /></Link>
        </div> */}
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
                    <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton" fullWidth={true}/></Link>
                    <Link to="/projects"><FlatButton label="Projects" className="menuBarButton" fullWidth={true}/></Link>
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
                    <Link to="/announcement"><FlatButton label="Announcements" className="menuBarButton"/></Link>
                    <Link to="/projects"><FlatButton label="Projects" className="menuBarButton"/></Link>
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