import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import PA_Tool from './TeamApplication/ProjectApplicationTool';
import SA_Tool from './StudentApplication/StudentApplicationTool';
import userStore from '../../stores/UserStore';
import firebase from '../../firebase';

import {Link, Route} from 'react-router-dom';
import {AdminRoute} from '../Route';


class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      teams:[]
    };
  }

  StudentApplicationData = (props) => {
  return (
    <SA_Tool 
    team = {this.state.teams}
    />
  );
}

  componentDidMount = () => {
    let fbRef = firebase.database().ref('StudentApplication');
    fbRef.once('value').then((snap) =>{
      this.setState({
        teams:snap.val()
      })
    });
  }


  render = () => {
    return(
      <div>
        <h1>Admin Page </h1>
        <AdminRoute user={userStore} path = "/admin/projectApplication" component={PA_Tool} />
        <AdminRoute user={userStore} path = "/admin/studentApplication" component={this.StudentApplicationData}/>
        <div style = {{paddingTop:"20px", textAlign:"center"}}>
          <Link to="/admin/projectApplication/pending"><MuiButton label = "Project Tool" color = "#8c1d40"/></Link>
          <Link to="/admin/studentApplication"><MuiButton label = "Student Tool" /></Link>
        </div>
      </div>
    );
  }
}

export default AdminPage;