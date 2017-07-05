import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import Tool from './TeamApplication/ProjectApplicationTool'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


class AdminPage extends Component {
  render() {
    return(
      <div>
        <h1>Admin Page</h1>
        <Route path = "/admin/projectApplication" component={Tool} />
        <div style = {{paddingTop:"20px"}}>
          <Link to="/admin/projectApplication/pending"><MuiButton label = "Project Tool" color = "#8c1d40"/></Link>
        </div>
      </div>
    );
  }
}

export default AdminPage;