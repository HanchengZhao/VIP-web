import React, { Component } from 'react';

import MuiButton from '../../MuiButton';

import DeniedApplications from './DeniedApplication';
import TeamApplication from './PendingApplication';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class ApplicationTool extends Component {
  render = () => {
    return(
      <div>
        <Route path = "/admin/projectApplication/pending" component={TeamApplication} />
        <Route path = "/admin/projectApplication/Denied" component={DeniedApplications} />
        <div style = {{paddingTop:"20px"}}>
          <Link to="/admin/projectApplication/pending"><MuiButton label = "Project approval page" /></Link>
          <Link to="/admin/projectApplication/Denied"><i className = "glyphicon glyphicon-trash" style = {{float:"right", cursor:"pointer", fontSize:"1.5em"}}/></Link>
        </div>
      </div>
    )
  }
}

export default ApplicationTool;