import React, { Component } from 'react';
import RosterTable from '../../advisor/RosterTable';
import _ from 'lodash';
import firebase from '../../../firebase';
import CsvUpload from '../../CsvUpload';

const studentRef = 'Students';

class RosterTool extends Component {
  constructor() {
    super();
    this.state = {
      roster:'',
      semester:'',
    }
    this.generateRoster = this.generateRoster.bind(this);
  }

  componentDidMount() {
    let fbRef = firebase.database().ref(`${studentRef}`);
    fbRef.on('value', (snapRoster) => {
      firebase.database().ref(`Semester`).once('value').then((snapSemester)=>{
        this.setState({
          semester:snapSemester.val().current,
          roster:snapRoster.val(),
        }, () => this.generateRoster());
      });
      let teams = [];
      firebase.database().ref('Teams/').on('value', (snap)=>{
        Object.keys(snap.val()).forEach((team)=>{
          teams.push(snap.val()[team].teamName);
        });
        this.setState({
          teams:teams
        });
      });
    });

    

    
  }

  generateRoster() {
    let semesterRoster = {};
    if(this.state.roster){
      Object.keys(this.state.roster).forEach((team) => {
        Object.keys(this.state.roster[team][this.state.semester]).forEach((student)=>{
          semesterRoster[student] = this.state.roster[team][this.state.semester][student];
        });
      });
      this.setState({currentRoster:semesterRoster});
    }
    
  }



  render() {
    return (
      <div>
        {!_.isEmpty(this.state.currentRoster) && this.state.semester && this.state.roster &&
          <RosterTable roster = {this.state.currentRoster}/>
        }
        <CsvUpload />
      </div>
    );
  }
}

export default RosterTool;