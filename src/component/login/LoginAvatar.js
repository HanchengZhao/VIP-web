import React, { Component } from 'react';

import Default_avatar from '../../assets/login/default_avatar.svg';

const styles = {photo : {height:"40px", width:"40px", marginRight:"10", display:"inline-block"}, userName : {color:"#f9f9f9", fontSize:"17", paddingTop:"20", marginRight:"20", display:"inline-block"}, container:{float:"right", height:"60px"}};
class LoginAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: this.props.userName || '',
      photoURL: this.props.URL || Default_avatar
    };
  }

  render() {
    return (
      <div style = {styles.container}>
        <p style = {styles.userName}>{this.state.Username}</p>
        <img src={this.state.photoURL} style = {styles.photo}/>
      </div>
    );
  }
}

export default LoginAvatar;