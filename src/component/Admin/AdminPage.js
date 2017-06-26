import React, { Component } from 'react';

import ProjectApproval from './ProjectApprovalCard';

class AdminPage extends Component {
  render() {
    return(
      <div>
        <h1>Admin Page</h1>
        <ProjectApproval />
      </div>
    );
  }
}

export default AdminPage;