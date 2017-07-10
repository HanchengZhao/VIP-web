import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import StudentApplicationTable from './StudentApplicationTable';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class StudentApplicationTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamData : this.props.team
    }
  }

  render = () => {
    let Teams = Object.keys(this.state.teamData).map((uuid, index) =>
    <div style = {{marginTop:"50px"}}>
      <StudentApplicationTable key = {uuid} name = {uuid} teamData = {this.state.teamData[uuid]} />
      <MuiThemeProvider>
        <Divider style = {{marginTop:"20px"}}/>
      </MuiThemeProvider>
    </div>)
    return(
      <div>
        {Teams}
      </div>
    );
  }
}

export default StudentApplicationTool;