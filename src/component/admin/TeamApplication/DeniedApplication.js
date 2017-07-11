import React, { Component } from 'react';

import firebase from '../../../firebase';
import MuiButton from '../../MuiButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {textAlign:"center"};

class DeniedApplications extends Component {

  constructor() {
    super();
    this.Recovered =[];
    this.state = {
      Applications: '',
    };
    this.addElement = this.addElement.bind(this);
    this.recoverApplications = this.recoverApplications.bind(this);
  }

  componentDidMount = () => {
    const fbRef = firebase.database().ref("RejectedTeams");
    fbRef.on('value', (snap) => {
      this.setState({
        Applications: snap.val()
      })
    });
  }

  addElement = (uuid) => {
    const keys = Object.keys(this.state.Applications);
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
    this.Recovered = temp.slice();
  }

    recoverApplications = () => {
      let fbRef = firebase.database();
      let Recovered = this.Recovered;
      for(let i in Recovered) {
        fbRef.ref("RejectedTeams").child(`${Recovered[i]}/application`).once('value').then((snap) => {
          fbRef.ref("TeamApplication").push(snap.val());
        });
      fbRef.ref("RejectedTeams").child(`${Recovered[i]}`).remove();
    }
  }

  render = () => {
    let Applications = this.state.Applications;
    return(
      <div>
        <h1 style = {style}>DENIED APPLICATIONS</h1>
        {Applications 
        ? <MuiThemeProvider>
          <div>
            <Table multiSelectable = {true} onRowSelection = {this.addElement}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Comments</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {this.state.Applications
                  ? Object.keys(this.state.Applications).map((uuid) =>
                    <TableRow key = {uuid}>
                      <TableRowColumn>{Applications[uuid].application.title}</TableRowColumn>
                      <TableRowColumn>{Applications[uuid].application.name}</TableRowColumn>
                      <TableRowColumn>{Applications[uuid].application.email}</TableRowColumn>
                      <TableRowColumn>{Applications[uuid].comments}</TableRowColumn>
                    </TableRow>
                  )
                  :(<TableRow />)}
              </TableBody>
            </Table>
            <MuiButton label="Recover Selected" onClick={this.recoverApplications}/>
          </div>
        </MuiThemeProvider> 
        : (<h3 style={style}>No Denined Applications</h3>)
        }
      </div>

    );
  }
}

export default DeniedApplications;