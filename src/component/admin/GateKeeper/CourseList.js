import React, { Component } from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
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
      courses:'',
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
      team:this.props.team.title,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    firebase.database().ref(`Courses`).on('value',(snap) => {
      this.setState({courses:snap.val()});
    });
    this.setState({
      team:nextProps.team.title
    });

  }

  suffixChange(e) {
    this.setState({
      suffix:(e.target.value).toUpperCase()
    });
    console.log();
  }

  addCourse() {
    firebase.database().ref(`Courses/${this.state.team}`).push(this.state.items[this.state.value]+this.state.suffix);
    console.log();
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
          <h1 style = {{textAlign:'center'}}>{this.state.team} course list</h1>
          <div>
            {this.state.courses[this.state.team]
              ?<table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.state.courses[this.state.team]).map((key) => {
                    return (<tr>
                      <th>{this.state.courses[this.state.team][key]}</th>
                      <th><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {this.handleRemove}/></th>
                      </tr>);
                  })}
                </tbody>
              </table>
              :<h1>no courses</h1>
            }
          </div>
          <DropDownMenu value = {this.state.value} onChange = {this.handleChange} menuStyle = {{marginBottom:'0'}}>
            {MenuItems}
          </DropDownMenu>
          <TextField hintText="Add Suffix" floatingLabelText="Suffix" onChange = {this.suffixChange} maxLength="3"/>
          <FlatButton label = "submit" onClick = {this.addCourse}/> 
          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CourseList;