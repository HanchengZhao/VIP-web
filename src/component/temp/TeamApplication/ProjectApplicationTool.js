import React, { Component } from 'react';

import MuiButton from '../../MuiButton';
import DeniedApplications from './DeniedApplication';
import TeamApplication from './PendingApplication';
import userStore from '../../../stores/UserStore';

import {AdminRoute} from '../../Route';

import {Link} from 'react-router-dom';

class ApplicationTool extends Component {
  render = () => {
    return(
      <div>
        <AdminRoute user={userStore} path = "/admin/projectApplication/Pending" component={TeamApplication} />
        <AdminRoute user={userStore} path = "/admin/projectApplication/Denied" component={DeniedApplications} />
      </div>
    )
  }
}

export default ApplicationTool;