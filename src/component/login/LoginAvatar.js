import React, { Component } from 'react';
import Default_avatar from '../../assets/login/default_avatar.svg';

import '../../style/LoginAvatar.css';

import { observer } from "mobx-react";


@observer
class LoginAvatar extends Component {

  render() {
    return (
      <div className="clearfix" id ="Avatar">
        <div id = "displayName">{this.props.user.displayName || " "}</div>
        <img src={this.props.user.photoURL || Default_avatar} id = "photo"/>
      </div>
    );
  }
}

export default LoginAvatar;