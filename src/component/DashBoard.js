import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import userStore from '../stores/UserStore';

class DashBoard extends Component {
  constructor () {
    super();
    this.state = {
      role: userStore.role
    }
  }

  render() {
    return (
      <div>
        <Redirect to={"/" + this.state.role}/>
      </div>    
    );
  }
}

export default DashBoard;