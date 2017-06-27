import React, { Component } from 'react';

import LoginCard from './LoginCard';

class LoginPage extends Component {

  render() {

    return (
      <div>
        <LoginCard 
        login = "Please"
        discription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio." />
      </div>
    );
  }
}

export default LoginPage;