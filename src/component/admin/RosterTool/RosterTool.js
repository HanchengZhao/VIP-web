import React, { Component } from 'react';
import RosterTable from '../../advisor/RosterTable';
import firebase from '../../../firebase';

const studentRef = 'Students';

class RosterTool extends Component {
  constructor() {
    super();
    this.state = {
      roster:'',
      semester:'',
      currentRoster:''
    }
    this.generateRoster = this.generateRoster.bind(this);
  }

  componentDidMount() {
    let fbRef = firebase.database().ref(`${studentRef}`);
    fbRef.on('value', (snap) => {
      this.setState({
        roster:snap.val(),
      });
    });

    firebase.database().ref(`Semester`).once('value').then((snap)=>{
      this.setState({semester:snap.val().current},()=>{this.generateRoster()});
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
        {this.state.currentRoster
        ?<RosterTable roster = {this.state.currentRoster}/>
        :<h1/>
        }
      </div>
    );
  }
}

export default RosterTool;