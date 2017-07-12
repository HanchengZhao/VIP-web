import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

import { observer } from "mobx-react";
import firebase from '../../firebase';
import '../../style/Login.css';

@observer
class Login extends Component {
  constructor() {
    super();
    this.googleLogin = this.googleLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  googleLogin(user) {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult(provider).then((result) => {

      }).catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorMessage: " + errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
  }

  logout(user) {
    sessionStorage.clear();
    this.props.user.logout();
    return firebase.auth().signOut()
  }

  render () {
    return (
      <div id = "loginContainer">
        { this.props.user.authed
          ? (<FlatButton 
              label="Logout" 
              id = "logout" 
              className="menuBarButton login"
              onClick={this.logout}
              fullWidth={this.props.Width||false}
            />)
          : (<FlatButton 
              label="Login" 
              id = "login" 
              className="menuBarButton login"
              onClick={this.googleLogin}
              fullWidth={this.props.Width||false}
            />)
        }
      </div>
      )
  }
}


export default Login;