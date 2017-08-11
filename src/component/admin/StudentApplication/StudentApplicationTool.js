import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import firebase from '../../../firebase';
import StudentApplicationTable from './StudentApplicationTable';


class StudentApplicationTool extends Component {
  constructor() {
    super();
    this.state = {
      teamData : ''
    }
  }


  componentDidMount = () => {
    let fbRef = firebase.database().ref('StudentApplication_Raw_Data');
    fbRef.on('value', (snap) =>{
      if(!!snap) {
        this.setState({
          teamData:snap.val()
        }, ()=>{console.log(this.state.teamData)});
      }
    });
  
  }

  render() {
    return(
      <div>
        {this.state.teamData &&
          <StudentApplicationTable roster = {this.state.teamData} />
        }
      </div>
    );
  }
}

export default StudentApplicationTool;