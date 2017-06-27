import React, { Component } from 'react';
import Login from './Login'
import Default_avatar from '../../assets/login/default_avatar.svg';

import { observer } from "mobx-react";

const styles = {
  photo : {height:"40px", width:"40px", marginRight:"10px", marginTop:"12px", borderRadius: "20px", display:"inline-block"},
  displayName : {color:"#f9f9f9", fontSize:"17px", verticalAlign: "-8px" , marginRight:"20px", display:"inline-block"},
  container:{float:"right", height:"60px"},
  };

@observer
class LoginAvatar extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(this.props.user.authed)
  //   this.state = {
  //     displayName: this.props.user.displayName || '',
  //     photoURL: this.props.user.photoURL || Default_avatar
  //   };
  // }

  render() {
    return (
      <div className="clearfix" style = {styles.container}>
        <div style = {styles.displayName}>{this.props.user.displayName || ''}</div>
        <img src={this.props.user.photoURL || Default_avatar} style = {styles.photo}/>
      </div>
    );
  }
}

export default LoginAvatar;