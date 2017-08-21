import React, { Component } from 'react';

import CourseList from './CourseList';

import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import firebase from '../../../firebase';

class ManageGateKeeper extends Component {
  constructor() {
    super();
    this.state = {
      teams:'',
      key:'',
      courses:'',
    };
    this.manageCourse = this.manageCourse.bind(this);
    
  }

  componentDidMount() {
    firebase.database().ref('Teams').on('value', (snap) =>{
      this.setState({
        teams:snap.val()
      });
    });
    
  }




  manageCourse(key) {
    this.setState({
      key:key
    });
  }

  render() {
    let Teams = Object.keys(this.state.teams).map((key) => {
      if(this.state.teams[key].teamName) {
        return (
          <tr key = {key}>
            <th>{this.state.teams[key].teamName}</th>
            <th><MuiThemeProvider><FlatButton label = "Manage Courses" onClick = {() => this.manageCourse(key)}/></MuiThemeProvider></th>
          </tr>);
      }
    });

    return(
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {Teams}
          </tbody>
        </table>
        {this.state.key
          ?<CourseList team = {this.state.teams[this.state.key]}/>
          :<h1/>
        }
      </div>
    );
  }
}

export default ManageGateKeeper;