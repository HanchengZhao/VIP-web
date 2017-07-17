import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import firebase from '../../../firebase';
import StudentApplicationTable from './StudentApplicationTable';
import MuiTable from '../../MuiTable';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class StudentApplicationTool extends Component {
  constructor() {
    super();
    this.state = {
      teamData : ''
    }
  }

  componentDidMount = () => {
    let fbRef = firebase.database().ref('StudentApplication');
    fbRef.on('value', (snap) =>{
      this.setState({
        teamData:snap.val()
      })
    });
  }

  render = () => {
    return(
      <div>
        {this.state.teamData
        ? Object.keys(this.state.teamData).map((uuid, index) =>
          <div style = {{marginTop:"50px"}} key = {uuid}>
            <MuiTable  
              name = {uuid} 
              approveRef = {`AcceptedStudents_Raw_Data/${uuid}`} 
              fbReject = {`RejectedStudents/${uuid}`} 
              removeRef = {`StudentApplication/${uuid}`} 
              data = {this.state.teamData[uuid]} 
            />
          </div>)
        :<h3>no Applications</h3>}
      </div>
    );
  }
}

export default StudentApplicationTool;