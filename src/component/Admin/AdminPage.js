import React, { Component } from 'react';

import TeamApplication from './TeamApplication/TeamApplication';

class AdminPage extends Component {
  render() {
    return(
      <div>
        <h1>Admin Page</h1>
        <TeamApplication />
      </div>
    );
  }
}

export default AdminPage;