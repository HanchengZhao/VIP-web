import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { observer } from "mobx-react";
import firebase from '../../firebase';

@observer
class Login extends Component {
  constructor() {
    super()
    // this.state = {
    //     authed : this.props.authed
    // }
    // console.log(this.state.authed);
    this.googleLogin = this.googleLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  googleLogin(user) {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult(provider).then((result) => {
      if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          console.log(token)
      }
        this.props.user.login();
        console.log("signInWithPopup")
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
    this.props.user.logout();
    return firebase.auth().signOut()
  }

  render () {
    return (
      <div>
        { this.props.user.authed
          ? (<FlatButton 
              label="Logout" 
              id = "logout" 
              className="menuBarButton login"
              onClick={this.logout}
            />)
          : (<FlatButton 
              label="Login" 
              id = "login" 
              className="menuBarButton login"
              onClick={this.googleLogin}
            />)
        }
      </div>
      )
  }
}


export default Login;