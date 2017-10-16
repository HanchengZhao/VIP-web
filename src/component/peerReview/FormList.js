import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Primary from '../../Theme';
import userStore from '../../stores/UserStore';

// admin should see form lists from different teams
// advisors should only see their own team's list
class FormList extends Component {
  constructor() {
    super();
    this.state = {
      questions: "",
      team: ""
    }
    this.teamCardgenerate = this.teamCardgenerate.bind(this);
    this.handleRemove  = this.handleRemove.bind(this);
    this.setAsDefault = this.setAsDefault.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Questions').on('value', (snap) => {
      this.setState({
        questions: snap.val()
      })
    })
    if (userStore.role === "advisor") { // fetch specific team
      firebase.database().ref('Advisor').orderByChild("email").equalTo(userStore.email).on('value', (snap) => {
        const matchData = snap.val();
        Object.keys(matchData).forEach((key) => {
          let team = matchData[key].team;
          this.setState({
            team: team
          })
          console.log(this.state.team)
        })
        
      })
    }
  }

  handleRemove(team, uuid) {
    let formRef = firebase.database().ref(`Questions/${team}/${uuid}`)
    formRef.remove()
  }

  setAsDefault(team, key, e) {
    e.preventDefault()
    let teamRef = firebase.database().ref(`Questions/${team}`)
    teamRef.update({
      defaultForm: key
    })
  }

  teamCardgenerate(team, index) {
    const forms = this.state.questions[team];
    if (forms) {
      let defaultId = forms.defaultForm;
      let keys = Object.keys(forms)
      keys.splice(keys.indexOf('defaultForm'), 1)
      let formItem = keys.map((key) => (
        <tr key = {key}>
          <td><Link to={`${team}/${key}`}>{forms[key].formName}</Link></td>
          <td>{forms[key].startDate.substr(0,15)}</td>
          <td>{forms[key].endDate.substr(0,15)}</td>
          <td>{forms[key].editDate.substr(0,15)}</td>
          <td>{key === defaultId ? 'default' : <a href="#" onClick = {(e) => this.setAsDefault(team, key,e) }>set as default</a>}</td>
          <td>{ key !== defaultId && 
              <i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {() => this.handleRemove(team, key)}/>}
          </td>
        </tr>
      ));
      return (
        <Paper key = {index} zDepth = {2} style = {{padding:'20px', marginBottom:'20px'}}>
          <div>
            <h1 style = {{textAlign:'center'}}>{team}</h1>
            <table className = "table">
              <thead>
                <tr>
                  <th>Form name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {formItem}
              </tbody>
            </table>
          </div>
        </Paper>
      )
    }
  }


  render() {
    
    return (
      <div>
        <MuiThemeProvider>
          <div>
            { userStore.role === 'advisor' &&
              this.teamCardgenerate(this.state.team)
            }
            {
              userStore.role === 'admin' &&
              Object.keys(this.state.questions).map((team, index) => {
                return this.teamCardgenerate(team, index)
              })
            }
            
          </div>
        </MuiThemeProvider> 
        {/* {this.state.questions} */}
        <div style={{marginTop: "20px"}} className="row">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Link to={'/peer-review/form_generator'}><RaisedButton className="pull-right" label = "New Form"  backgroundColor = {Primary}/></Link>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default FormList;