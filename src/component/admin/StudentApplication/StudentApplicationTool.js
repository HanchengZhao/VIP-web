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
    this.updateComponent = this.updateComponent.bind(this);
  }


  componentDidMount = () => {
    let fbRef = firebase.database().ref('StudentApplication');
    fbRef.on('value', (snap) =>{
      this.setState({
        teamData:snap.val()
      })
    });
  }

  updateComponent() {
    this.forceUpdate();
  }

  render = () => {
    return(
      <div>
        {this.state.teamData
        ?<StudentApplicationTable update = {this.updateComponent} roster = {this.state.teamData} />
        :<h1/>
        }
      </div>
    );
  }
}

export default StudentApplicationTool;