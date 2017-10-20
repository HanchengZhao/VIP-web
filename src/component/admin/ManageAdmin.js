import React, { Component } from 'react';
import firebase from '../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ManageAdmin extends Component {
  constructor() {
    super();
    this.state = {
      admin:'',
      add:false,
      email:'',
      name:''
    }
  }
  componentDidMount() {
    firebase.database().ref('Admin').on('value', (snap) =>{
      this.setState({
        admin:snap.val()
      });
    });
    this.showAdd = this.showAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showAdd() {
    this.setState((prevState) => {
      return {add:!(prevState.add)};
    });
  }

  handleUpdate(e) {
    let id = e.target.id;
    this.setState({
      [id]: e.target.value
    });
  }

  handleRemove(e) {
    let uuid = e.target.id;
    let adminRef = firebase.database().ref('Admin_Remove_Pending');
    adminRef.child(`${uuid}`).set(this.state.admin[uuid]);
  }

  handleSubmit() {
    let adminRef = firebase.database().ref('Admin_Add_Pending');
    adminRef.push({
      email:this.state.email,
      name: this.state.name
    });
    this.setState({
      add:false,
    });
  }

  render() {
    let admin = Object.keys(this.state.admin).map((key) => (
      <tr key = {key}>
        <td>{this.state.admin[key].name}</td>
        <td>{this.state.admin[key].email}</td>
        <td><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {this.handleRemove}/></td>
      </tr>
    ));
    return(
      <div>
        {this.state.admin &&
        <div>
          <h1 style = {{textAlign:'center'}}>Manage Admin</h1>
          <table className = "table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {admin}
            </tbody>
          </table>
          <MuiThemeProvider>
            <FlatButton label = {"+  Add Admin"} onClick = {this.showAdd}/>
          </MuiThemeProvider>
        </div>
        }{this.state.add &&
          <MuiThemeProvider>
            <div>
              <TextField floatingLabelText="Name" id = "name" onChange = {this.handleUpdate}/>
              <TextField floatingLabelText="Email" id ="email" onChange = {this.handleUpdate}/>
              <FlatButton label = "submit" onClick = {this.handleSubmit}/>
            </div>
          </MuiThemeProvider>
        }
      </div>
    );
  }
}

export default ManageAdmin;