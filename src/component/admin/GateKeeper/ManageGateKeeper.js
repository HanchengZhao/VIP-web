import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import firebase from '../../../firebase';

const GateKeeperRef = "GateKeeper";

class GateKeeper extends Component {
  constructor() {
    super();
    this.state = {
      email:'',
      emailMessage:'',
      department:'',
      error:{}
    }
    this.handleChange = this.handleChange.bind(this);
    this.fbWrite = this.fbWrite.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    firebase.database().ref(GateKeeperRef).on('value',(snap) => {
      this.setState({
        GateKeepers:snap.val()
      });
    });
  }

  handleChange(e) {
    let id = e.target.id;
    let value = e.target.value;
    if(id === "department") {
      return this.setState({[id]:value.toUpperCase()});
    }
    this.setState({[id]:value});
  }

  handleRemove(e) {
    let key = e.target.id;
    firebase.database().ref(GateKeeperRef).child(key).remove();
  }

  fbWrite() {
    firebase.database().ref(GateKeeperRef).push({
      department:this.state.department,
      email:this.state.email,
      name:this.state.name
    });
    this.setState({
      department:'',
      email:'',
      name:''
    })

  }

  render() {
    return(
      <div>
        <h2 style = {{textAlign:'center'}}>GateKeepers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.GateKeepers
              ?Object.keys(this.state.GateKeepers).map((key)=>{
                return(<tr key = {key}>
                  <th>{this.state.GateKeepers[key].name}</th>
                  <th>{this.state.GateKeepers[key].department}</th>
                  <th>{this.state.GateKeepers[key].email}</th>
                  <th><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {this.handleRemove}/></th>
                  </tr>)
              })
              :<tr><th/></tr>
            }
          </tbody>
        </table>
        <MuiThemeProvider>
          <div>
            <TextField hintText="Add Name" value = {this.state.name} id = "name" floatingLabelText="Name" onChange = {this.handleChange}/> 
            <TextField hintText="Add Department" value={this.state.department} id = "department" floatingLabelText="Department" onChange = {this.handleChange} maxLength="3"/>
            <TextField hintText="Add Email" value = {this.state.email} id = "email" floatingLabelText="Email" onChange = {this.handleChange}/>
            <FlatButton label = 'add'  onClick = {this.fbWrite}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default GateKeeper;