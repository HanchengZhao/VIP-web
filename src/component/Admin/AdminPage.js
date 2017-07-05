import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import userStore from '../../stores/UserStore';
import Tool from './TeamApplication/ProjectApplicationTool'

import {Link} from 'react-router-dom';
import {AdminRoute} from '../Route';


class AdminPage extends Component {
  render() {
    return(
      <div>
        <h1>Admin Page </h1>
        <AdminRoute user={userStore} path = "/admin/projectApplication" component={Tool} />
        <div style = {{paddingTop:"20px"}}>
          <Link to="/admin/projectApplication/pending"><MuiButton label = "Project Tool" color = "#8c1d40"/></Link>
        </div>
      </div>
    );
  }
}

export default AdminPage;