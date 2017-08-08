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
  }

  render() {
    let student = this.state.student;
    let temp = [];
    if(student) {
      Object.keys(student).forEach((key) => {
        if (student[key].team === this.state.team) {
          temp.push(student[key]);
        }
      });
    }
    return(
      <div>
        <div>
          {this.state.student && this.state.team
          ?<div>
            <h1 style = {{textAlign:"center"}}>{this.state.team} Roster Page</h1>
            <RosterTable roster = {temp}/>
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