import React, { Component } from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import firebase from '../../firebase';

class ManageGateKeeper extends Component {
  constructor() {
    super();
    this.state = {
      teams:'',
      key:'',
      value:0,
      items:["VIP194","VIP294","VIP394","VIP494"],
      suffix: '',
    };
    this.manageCourse = this.manageCourse.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.suffixChange = this.suffixChange.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Teams').on('value', (snap) =>{
      this.setState({
        teams:snap.val()
      });
    });
  }

  addCourse() {
    console.log(this.state.items[this.state.value]+this.state.suffix);
  }

  handleChange = (event, index, value) => this.setState({value:value});
  
  suffixChange(e) {
    this.setState({
      suffix:(e.target.value).toUpperCase()
    });
  }

  manageCourse(key) {
    this.setState({
      key:key
    });
  }

  render() {
    let Teams = Object.keys(this.state.teams).map((key) => {
      if(this.state.teams[key].title) {
        return (
          <tr key = {key}>
            <th>{this.state.teams[key].title}</th>
            <th><MuiThemeProvider><FlatButton label = "Manage Courses" onClick = {() => this.manageCourse(key)}/></MuiThemeProvider></th>
          </tr>);
      }
    });
    let MenuItems = this.state.items.map((value, index) =>(
      <MenuItem value={index} primaryText = {value} />
    ));
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
        <MuiThemeProvider>
          <div>
            <DropDownMenu value = {this.state.value} onChange = {this.handleChange} >
              {MenuItems}
            </DropDownMenu>
            <TextField hintText="Add Suffix" floatingLabelText="Suffix" onChange = {this.suffixChange} maxLength="3"/>
            <FlatButton label = "submit" onClick = {this.addCourse}/> 
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ManageGateKeeper;