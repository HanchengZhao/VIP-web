import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

import firebase from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        authed : this.props.authed
    }
    console.log(this.state.authed);
    this.googleLogin = this.googleLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithRedirect(provider)

    firebase.auth().signInWithPopup(provider).then(function(result) {
      if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          // ...
      }
        this.setState({authed: true})
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

  logout() {
    this.setState({
      authed : false
    })
    return firebase.auth().signOut()
  }

  render () {
    return (
      <div>
        { this.state.authed
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