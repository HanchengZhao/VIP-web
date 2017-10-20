import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import firebase from '../../../firebase';

class CourseList extends Component {
  constructor() {
    super();
    this.state = {
      team:'',
      courses:'',
      value:0,
      items:["VIP194","VIP294","VIP394","VIP494"],
      suffix: '',
    }
    this.addCourse = this.addCourse.bind(this);
    this.suffixChange = this.suffixChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  
  componentDidMount() {
    firebase.database().ref(`Courses`).on('value',(snap) => {
      this.setState({courses:snap.val()});
    });
    this.setState({
      team:this.props.team.teamName,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    firebase.database().ref(`Courses`).on('value',(snap) => {
      this.setState({courses:snap.val()});
    });
    this.setState({
      team:nextProps.team.teamName
    });
  }

  suffixChange(e) {
    this.setState({
      suffix:(e.target.value).toUpperCase()
    });
  }

  addCourse() {
    firebase.database().ref(`Courses/${this.state.team}`).push({
      course:this.state.items[this.state.value]+this.state.suffix,
      department:this.state.suffix,
      level:this.state.items[this.state.value].split("")[3]
    });
  }

  handleChange = (event, index, value) => this.setState({value:value});
  
  handleRemove(e) {
    let key = e.target.id;
    firebase.database().ref(`Courses/${this.state.team}/${key}`).remove();
  }

  render() {
    let MenuItems = this.state.items.map((value, index) =>(
      <MenuItem key = {index} value={index} primaryText = {value} />
    ));
    return(
      <MuiThemeProvider>
        <div>
          {this.state.team &&
          <div>
          <h2 style = {{textAlign:'center'}}>{this.state.team} course list</h2>
          <div>
            {this.state.courses && this.state.team && this.state.courses[this.state.team]
              ?<table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.state.courses[this.state.team]).map((key) => {
                    return (<tr key = {key}>
                      <th>{this.state.courses[this.state.team][key].course}</th>
                      <th>{this.state.courses[this.state.team][key].department}</th>
                      <th><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {this.handleRemove}/></th>
                      </tr>);
                  })}
                </tbody>
              </table>
              :<h3 style = {{textAlign:'center'}}>no courses</h3>
            }
          </div>
          <SelectField value = {this.state.value} onChange = {this.handleChange} style = {{verticalAlign:'bottom'}}>
            {MenuItems}
          </SelectField>
          
            <TextField hintText="Add Suffix" floatingLabelText="Suffix" onChange = {this.suffixChange} maxLength="3" style = {{verticalAlign:'top'}}/>
            <FlatButton label = "submit" onClick = {this.addCourse} style = {{verticalAlign:'bottom'}}/>
          </div>
          } 
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CourseList;