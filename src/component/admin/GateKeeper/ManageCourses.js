import React, { Component } from 'react';

import CourseList from './CourseList';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            <th ><MuiThemeProvider><FlatButton  style = {{float:'right'}} label = "Manage Courses" onClick = {() => this.manageCourse(key)}/></MuiThemeProvider></th>
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
        {this.state.key &&
          <CourseList team = {this.state.teams[this.state.key]}/>
        }
      </div>
    );
  }
}

export default ManageGateKeeper;