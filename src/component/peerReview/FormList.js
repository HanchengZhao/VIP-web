import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
  }

  componentDidMount() {
    firebase.database().ref('Questions').on('value', (snap) => {
      this.setState({
        questions: snap.val()
      })
      console.log(snap.val())
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

  teamCardgenerate(team) {
    const forms = this.state.questions[team];
    if (forms) {
      let keys = Object.keys(forms)
      keys.splice(keys.indexOf('defaultForm'), 1)
      let formItem = keys.map((key) => (
        <tr key = {key}>
          <td><Link to={`${team}/${key}`}>{forms[key].formName}</Link></td>
          <td>{forms[key].startDate.substr(0,15)}</td>
          <td>{forms[key].endDate.substr(0,15)}</td>
          <td>{forms[key].editDate.substr(0,15)}</td>
          <td><i className ="glyphicon glyphicon-remove" style = {{cursor:"pointer"}} id = {key} onClick = {this.handleRemove}/></td>
        </tr>
      ));
      return (
        <Paper zDepth = {2} style = {{padding:'20px'}}>
          <div>
            <h1 style = {{textAlign:'center'}}>{team}</h1>
            <table className = "table">
              <thead>
                <tr>
                  <th>Form name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit Date</th>
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
              Object.keys(this.state.questions).map((team) => {
                return this.teamCardgenerate(team)
              })
            }
            
          </div>
        </MuiThemeProvider> 
        {/* {this.state.questions} */}
      </div>
    );
  }
}

export default FormList;