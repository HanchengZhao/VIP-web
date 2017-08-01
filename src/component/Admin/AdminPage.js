import React, { Component } from 'react';
import MuiButton from '../MuiButton';
import Primary from '../../Theme';

import PendingApplication from './TeamApplication/PendingApplication';
import DeniedApplication from './TeamApplication/DeniedApplication';
import ManageAdmin from './ManageAdmin';
import SA_Tool from './StudentApplication/StudentApplicationTool';
import Roster_Tool from './RosterTool/RosterTool';
import userStore from '../../stores/UserStore';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Link, Route, Redirect} from 'react-router-dom';
import {AdminRoute} from '../Route';

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      Project:true,
      Student:false,
      Roster:false,
      AddAdmin:false,
    }
    this.setToFalse = this.setToFalse.bind(this);
    this.showProject = this.showProject.bind(this);
    this.showRoster = this.showRoster.bind(this);
    this.showStudent = this.showStudent.bind(this);
    this.showAdminTool = this.showAdminTool.bind(this);
  }
  showStudent() {
    this.setToFalse();
    this.setState({
      Student:true
    })
  }
  showProject() {
    this.setToFalse();
    this.setState({
      Project:true
    })
  }
  showRoster() {
    this.setToFalse();
    this.setState({
      Roster:true
    })
  }
  showAdminTool() {
    this.setToFalse();
    this.setState({
      AddAdmin:true
    })
  }
  setToFalse() {
    this.setState({
      Project:false,
      Student:false,
      Roster:false,
      AddAdmin:false
    })
  }

  render = () => {
    return(
      <div>
        {this.state.Project
          ?<PendingApplication />
          :<div />
        }
        {this.state.Student
          ?<SA_Tool />
          :<h1 />
        }
        {this.state.Roster
          ?<div>
            <h1 style ={{textAlign:'center'}}>Roster</h1>
            <Roster_Tool />
          </div>
          :<h1 />
        }
        {this.state.AddAdmin
          ?<ManageAdmin />
          :<h1 />
        } 
        <AdminRoute user={userStore} path = "/admin/projectApplication/Denied" component={DeniedApplication} />
         <div>
          <MuiThemeProvider>
            <Tabs inkBarStyle ={{color:'#ffc425'}}>
              <Tab label = "Project Application" style={{backgroundColor:"#353535"}} onActive={this.showProject}/>
              <Tab label = "Student Application" style={{backgroundColor:"#353535"}} onActive={this.showStudent}/>
              <Tab label = "Rosters" style={{backgroundColor:"#353535"}} onActive={this.showRoster}/>
              <Tab label = "Add Admin" style={{backgroundColor:"#353535"}} onActive={this.showAdminTool}/>      
            </Tabs>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default AdminPage;