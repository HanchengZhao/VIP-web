import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import firebase from '../../firebase';
import userStore from '../../stores/UserStore';
import EditProjectCard from './EditProjectCard';

class AdvisorPage extends Component {
  constructor() {
    super();
    this.state = {
      advisors: '',
      team: '',
      teamKeys: []
    }
  }

  componentDidMount() {
    let fbAdvisorRef = firebase.database().ref("Advisor");
    let fbTeamRef = firebase.database().ref("Teams");
    fbAdvisorRef.on('value', (snap) => {
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

  render  ()  {
    let teams = this.state.allData;
    let title = this.state.teamKeys.map((key)=>(
      <EditProjectCard project = {teams[key]} fbKey = {key} key = {key}/>
    ))
    
    return(
      <div>
        <h1>Advisor Page</h1>
        <div>{title}</div>
      </div>
    );
  }
}

export default AdvisorPage;