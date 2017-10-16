import React, { Component } from 'react';
import RosterTable from '../../advisor/RosterTable';
import _ from 'lodash';
import firebase from '../../../firebase';

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
    });

    

    
  }

  generateRoster() {
    let semesterRoster = {};
    Object.keys(this.state.roster).forEach((team) => {
      Object.keys(this.state.roster[team][this.state.semester]).forEach((student)=>{
        semesterRoster[student] = this.state.roster[team][this.state.semester][student];
      });
    });
    this.setState({currentRoster:semesterRoster});
  }



  render() {
    return (
      <div>
        {!_.isEmpty(this.state.currentRoster) && this.state.semester && this.state.roster &&
          <RosterTable roster = {this.state.currentRoster}/>
        }
      </div>
    );
  }
}

export default RosterTool;