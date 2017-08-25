import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AddAdvisor from './AddAdvisor';
import firebase from '../../firebase';
import userStore from '../../stores/UserStore';
import EditProjectCard from './EditProjectCard';
import Application from './StudentApplication';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Primary, {NavColor} from '../../Theme';

class AdvisorPage extends Component {
  constructor() {
    super();
    this.state = {
      advisors: '',
      team: '',
      teamKeys: [],
      student: true,
      showTeam:false,
      advisor:false,
    }
    this.setToFalse = this.setToFalse.bind(this);
    this.showStudent = this.showStudent.bind(this);
    this.showTeam = this.showTeam.bind(this);
    this.showAdvisors = this.showAdvisors.bind(this);
  }

  componentDidMount() {
    let fbAdvisorRef = firebase.database().ref("Advisor");
    let fbTeamRef = firebase.database().ref("Teams");
    fbAdvisorRef.on('value', (snap) => {
      console.log(snap.val());
      Object.keys(snap.val()).forEach((i) => {
        let user = snap.val()[i];
        if (user.email === userStore.email) {
          this.setState({
            team: user.team.split(",")
          });
        }
      })
    });

    fbTeamRef.once('value', (snap) => {
      let teamKeys = [];
      let allData = snap.val();
      Object.keys(snap.val()).forEach((i) => {
        let team = snap.val()[i];
        if(this.state.team.includes(team.teamName)) {
          teamKeys.push(i);
        }
      })
      this.setState({
        teamKeys:teamKeys,
        allData:allData
      });
    });
  }

  showStudent() {
    this.setToFalse();
    this.setState({student:true});
  }

  showTeam() {
    this.setToFalse();
    this.setState({showTeam:true});
  }

  showAdvisors() {
    this.setToFalse();
    this.setState({advisor:true});
  }

  setToFalse() {
    this.setState({
      student:false,
      advisor:false,
      showTeam:false
    })
  }

  render  ()  {
    let teams = this.state.allData;
    let teamArray = [];
    let title = this.state.teamKeys.map((key)=> {
      console.log(teams[key].teamName);
      teamArray.push(teams[key].teamName);
      return <EditProjectCard project = {teams[key]} fbKey = {key} key = {key}/>;
    });
    console.log(teamArray);
    return(
      <div>
        <MuiThemeProvider>
          <div>
            {teams &&
            <Paper zDepth = {2} style = {{padding:'20px'}}>
              
              {this.state.showTeam &&
                <div>
                  <h1 style = {{textAlign:'center'}}>My Teams</h1>
                  <div>{title}</div>
                </div>
              }
              {teamArray && this.state.advisor &&
                <AddAdvisor  teamKeys = {teamArray}/>
              }
              {this.state.student &&
                <Application team = {this.state.team}/>
              }
            </Paper>
            }
            <div style = {{paddingTop:'20px'}}>
              
                <Tabs inkBarStyle ={{color:Primary}}>
                  <Tab label = "Student Application" style={{backgroundColor:NavColor}} onActive={this.showStudent}/>
                  <Tab label = "Manage Advisors" style={{backgroundColor:NavColor}} onActive={this.showAdvisors}/>
                  <Tab label = "Edit Team Information" style={{backgroundColor:NavColor}} onActive={this.showTeam}/>         
                </Tabs>
              
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AdvisorPage;