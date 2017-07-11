import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import PA_Tool from './TeamApplication/ProjectApplicationTool';
import SA_Tool from './StudentApplication/StudentApplicationTool';
import userStore from '../../stores/UserStore';

import {Link, Route} from 'react-router-dom';
import {AdminRoute} from '../Route';


class AdminPage extends Component {
  
  render = () => {
    return(
      <div>
        <h1>Admin Page </h1>
        <AdminRoute user={userStore} path = "/admin/projectApplication" component={PA_Tool} />
        <AdminRoute user={userStore} path = "/admin/studentApplication" component={SA_Tool}/>
        <div style = {{paddingTop:"20px", textAlign:"center"}}>
          <Link to="/admin/projectApplication/pending"><MuiButton label = "Project Tool" color = "#8c1d40"/></Link>
          <Link to="/admin/studentApplication"><MuiButton label = "Student Tool" /></Link>
        </div>
      </div>
    );
  }
}

export default AdminPage;