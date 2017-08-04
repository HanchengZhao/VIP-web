import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import PendingApplication from './TeamApplication/PendingApplication';
import DeniedApplication from './TeamApplication/DeniedApplication';
import ManageAdmin from './ManageAdmin';
import ManageCourses from './GateKeeper/ManageCourses';
import GateKeeper from './GateKeeper/ManageGateKeeper';
import SA_Tool from './StudentApplication/StudentApplicationTool';
import Roster_Tool from './RosterTool/RosterTool';
import userStore from '../../stores/UserStore';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Primary, {NavColor} from '../../Theme';

import {Link, Route, Redirect} from 'react-router-dom';
import {AdminRoute} from '../Route';

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      GateKeeper:true
    }
    this.setToFalse = this.setToFalse.bind(this);
    this.showProject = this.showProject.bind(this);
    this.showRoster = this.showRoster.bind(this);
    this.showStudent = this.showStudent.bind(this);
    this.showAdminTool = this.showAdminTool.bind(this);
    this.showCourses = this.showCourses.bind(this);
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
  showCourses() {
    this.setToFalse();
    this.setState({
      Courses:true
    })
  }
  setToFalse() {
    this.setState({
      Project:false,
      Student:false,
      Roster:false,
      AddAdmin:false,
      Courses:false
    });
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
        {this.state.Courses
          ?<div>
            <ManageCourses />
            <GateKeeper />
          </div>
          :<h1 />
        }  
        <AdminRoute user={userStore} path = "/admin/projectApplication/Denied" component={DeniedApplication} />
         <div>
          <MuiThemeProvider>
            <Tabs inkBarStyle ={{color:Primary}}>
              <Tab label = "Project Application" style={{backgroundColor:NavColor}} onActive={this.showProject}/>
              <Tab label = "Student Application" style={{backgroundColor:NavColor}} onActive={this.showStudent}/>
              <Tab label = "Rosters" style={{backgroundColor:NavColor}} onActive={this.showRoster}/>
              <Tab label = "Manage Admin" style={{backgroundColor:NavColor}} onActive={this.showAdminTool}/>
              <Tab label = "Manage Courses" style={{backgroundColor:NavColor}} onActive={this.showCourses}/>         
            </Tabs>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default AdminPage;