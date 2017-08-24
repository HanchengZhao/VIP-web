import React, { Component } from 'react';

import firebase from '../../firebase'
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RosterTable from './RosterTable';
import { Link } from 'react-router-dom';

const RosterPath = 'Teams';
const StudentPath = 'Students';

class EditRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team:'',
      student:'',
      roster:false,
      fbKey:this.props.match.params.teamID
    }
  }

  componentDidMount() {
    
    let fbRef = firebase.database().ref(`${RosterPath}/${this.state.fbKey}`);
    fbRef.on('value', (snap) => {
      this.setState({
        team:snap.val().teamName
      });
    });
    let studentRef = firebase.database().ref(`${StudentPath}`);
    studentRef.on('value', (snap)=>{
      this.setState({student:snap.val()});
    });

    let semesterRef = firebase.database().ref(`Semester`);
    semesterRef.once('value').then((snap)=>{
      this.setState({semester:snap.val().current});
    });
  }

  render() {
    let student = this.state.student;
    let semester = this.state.semester;
    let team = this.state.team;
    return(
      <div>
        <div>
          {student && team && semester && student[team] && student[team][semester]
          ?<div>
            <h1 style = {{textAlign:"center"}}>{this.state.team} Roster Page</h1>
            <RosterTable roster = {student[team][semester]}/>
          </div>
          :<div>
            <h1 style = {{textAlign:"center"}}>Your Roster Is Empty</h1>
            <MuiThemeProvider>
              <Link to = '/advisor'><FlatButton label = "return" /></Link>
            </MuiThemeProvider>
          </div>}
        </div>
      </div>
    );
  }
}

export default EditRoster;