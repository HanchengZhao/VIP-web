import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import firebase from '../../firebase';

class ChangeSemester extends Component {

  constructor() {
    super();
    this.state = {
      current: '',
      past: '',
      newSemester:'',
      value:'default'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Semester').on('value', (snap)=>{
      this.setState({
        current:snap.val().current,
        past:snap.val().past
      });
    });
  }

  handleChange(e) {
    this.setState({
      newSemester:e.target.value
    });
  }

  handleMenuChange(event, index, value,) {
    let uuid = (Object.keys(this.state.past)[value]);
    this.setState({
      value:value,
      newSemester:this.state.past[uuid]
    });
  }

  handleSubmit() {
    if(!_.has(this.state.past, this.state.current)) {
      firebase.database().ref('Semester/past').push(this.state.current);
    }
    firebase.database().ref('Semester/current').set(
      this.state.newSemester
    );
    this.setState({
      value:'default',
      newSemester:''
    });
  }

  render() {
    let menuItems
    if(this.state.past) {
      menuItems = Object.keys(this.state.past).map((element, key)=>{
        return <MenuItem value = {key}  key = {element} primaryText = {this.state.past[element]}/>
      });
    }
    
    return(
      <div>
        <h3 style = {{textAlign:'center'}}>Current Semester : {this.state.current}</h3>
        <MuiThemeProvider>
          <div>
            {this.state.past &&
            <div style = {{float:'left'}}>
              <h4>Past Semesters</h4>
                <SelectField value = {this.state.value} onChange = {this.handleMenuChange}>
                  {menuItems}
                </SelectField>
              </div>
            }
            <div style = {{textAlign:'right'}}>
              <TextField hintText="Semester" floatingLabelText="Change Semester" value = {this.state.newSemester} onChange = {this.handleChange}/>
              <FlatButton label = "Change Semester" onClick = {this.handleSubmit}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ChangeSemester; 