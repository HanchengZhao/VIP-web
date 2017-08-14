import React, { Component } from 'react';

import LoginCard from './LoginCard';

class LoginPage extends Component {

  render() {

    return (
      <div>
        <LoginCard 
        login = "Please"
        discription = "The content you're trying to access is protected. Please Login with proper credentials to view this page. " />
      </div>
    );
  }
}

export default LoginPage;