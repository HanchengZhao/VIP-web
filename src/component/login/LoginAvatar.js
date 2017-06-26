import React, { Component } from 'react';

import Default_avatar from '../../assets/login/default_avatar.svg';

import { observer } from "mobx-react";

const styles = {photo : {height:"40px", width:"40px", marginRight:"10", display:"inline-block", borderRadius: "20px"}, displayName : {color:"#f9f9f9", fontSize:"17", paddingTop:"20", marginRight:"20", display:"inline-block"}, container:{float:"right", height:"60px"}};

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
      <div style = {styles.container}>
        <p style = {styles.displayName}>{this.props.user.displayName || ''}</p>
        <img src={this.props.user.photoURL || Default_avatar} style = {styles.photo}/>
      </div>
    );
  }
}

export default LoginAvatar;