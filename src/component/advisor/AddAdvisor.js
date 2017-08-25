import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import firebase from '../../firebase';

class AddAdvisor extends Component {

  constructor() {
    super();
    this.state = {
      Advisors:[],
      add:false,
      team:'',
      email:'',
      name:''
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.showAdd = this.showAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Advisor').on('value', (snap) => {
      let Advisors = snap.val();
      let team = '';
      Object.keys(snap.val()).forEach((i)=>{
        
        if(!this.props.teamKeys.includes(snap.val()[i].team)) {
          delete Advisors[i];
        }else{
          team = snap.val()[i].team;
        }
      });
      this.setState({
        Advisors:Advisors,
        team:team
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    firebase.database().ref('Advisor').on('value', (snap) => {
      let Advisors = snap.val();
      let team = '';
      Object.keys(snap.val()).forEach((i)=>{
        
        if(!nextProps.teamKeys.includes(snap.val()[i].team)) {
          delete Advisors[i];
        }else{
          team = snap.val()[i].team;
        }
      });
      this.setState({
        Advisors:Advisors,
        team:team
      });
    });
    
  }

  handleRemove(key) {
    firebase.database().ref('Advisor_Remove_Pending').child(key).set(this.state.Advisors[key]);
  }

  handleSubmit() {
    firebase.database().ref('Advisor_Add_Pending').push({
      team:this.state.team,
      name:this.state.name,
      email:this.state.email
    });
    this.setState({
      email:'',
      name:''
    });
  }
  
  handleUpdate(e) {
    let id = e.target.id;
    this.setState({
      [id]: e.target.value
    });
  }

  showAdd() {
    this.setState((prevState)=>({
      add:!prevState.add
    }));
  }

  render() {
    return(
      <div>
        <h1 style = {{textAlign:'center'}}>Manage Advisors</h1>
          <div>
          {this.state.Advisors &&
          <table className = 'table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Advisors &&
                Object.keys(this.state.Advisors).map((key)=>(
                  <tr key = {key}>
                    <td>{this.state.Advisors[key].name}</td>
                    <td>{this.state.Advisors[key].email}</td>
                    <td><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {()=>this.handleRemove(key)}/></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
            }
            <MuiThemeProvider>
              <FlatButton label = {"+ " + " Add Advisor"} onClick = {this.showAdd}/>
            </MuiThemeProvider>
            </div>
            {this.state.add
              ?<MuiThemeProvider>
                <div>
                  <TextField floatingLabelText="Name" id = "name" value = {this.state.name} onChange = {this.handleUpdate}/>
                  <TextField floatingLabelText="Email" id ="email" value = {this.state.email} onChange = {this.handleUpdate}/>
                  <FlatButton label = "submit" onClick = {this.handleSubmit}/>
                </div>
              </MuiThemeProvider>
              :<h1/>
            }
      </div>
    );
  }
}

export default AddAdvisor;