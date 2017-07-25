import React, { Component } from 'react';

import firebase from '../../firebase'
import RosterTable from './RosterTable';

const RosterPath = 'Teams';
const StudentPath = 'Students';

class EditRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: '',
      student:'',
      fbKey:this.props.match.params.teamID
    }
  }

  componentDidMount() {
    let fbRef = firebase.database().ref(`${RosterPath}/${this.state.fbKey}`);
    fbRef.on('value', (snap) => {
      this.setState({
        roster:snap.val(),
        team:snap.val().title
      });
    });
    let studentRef = firebase.database().ref(`${StudentPath}`);
    studentRef.on('value', (snap)=>{
      this.setState({student:snap.val()});
    });
  }

  render() {
    let roster = this.state.roster;
    let student = this.state.student;
    let temp = [];
    Object.keys(student).forEach((key) => {
      if (student[key].team === roster.title) {
        temp.push(student[key]);
      }
    });
    return(
      
      <div>
        {this.state.student && this.state.roster
        ?<div>
          <h1>{this.state.roster.title} Roster Page</h1>
          <RosterTable roster = {temp}/>
        </div>
        :<h1>Loading</h1>}
      </div>
    );
  }
}

export default EditRoster;