import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiButton from '../../MuiButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class StudentApplicationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamData : this.props.teamData
    }
    this.selected = [];
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  addElement = (uuid) => {
    const keys = Object.keys(this.state.teamData);
    let temp = [];
    switch(uuid) {
      case "all":
        temp = keys.slice();
        break;
      case "none":
        break;
      default:
        uuid.forEach((i) =>{
          temp.push(keys[i]);
      });
    }
    this.selected = temp.slice();
    console.log(this.selected);
  }

  handleAccept = () => {
    alert("Accept")
  }

  handleReject = () => {
    alert("Reject");
  }

  render = () => {
    let teamData = this.state.teamData;
    return(
      <div>
        <h1 style={{textAlign:"center"}}>{this.props.name.split("_").join(" ")} Applicants</h1>
        <MuiThemeProvider>
          <Table multiSelectable = {true} onRowSelection = {this.addElement}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>GPA</TableHeaderColumn>
                <TableHeaderColumn>Reasons For Applying</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false}>
               {teamData
                  ? Object.keys(this.state.teamData).map((uuid) =>
                    <TableRow key = {uuid}>
                      <TableRowColumn>{teamData[uuid].name}</TableRowColumn>
                      <TableRowColumn>{teamData[uuid].email}</TableRowColumn>
                      <TableRowColumn>{teamData[uuid].ID}</TableRowColumn>
                      <TableRowColumn>{teamData[uuid].gradeType}</TableRowColumn>
                      <TableRowColumn style = {{whiteSpace: 'normal', wordWrap: 'break-word'}}>{teamData[uuid].other}</TableRowColumn>
                    </TableRow>
                  )
                  :(<TableRow />)}
            </TableBody>
          </Table>
        </MuiThemeProvider>
        <MuiButton label = "accept selected" onClick = {this.handleAccept}/>
        <MuiButton label = "Reject selected" onClick = {this.handleReject} color = "#8c1d40" />
      </div>
    );
  }
}

export default StudentApplicationTable;