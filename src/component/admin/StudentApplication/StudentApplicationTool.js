import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import firebase from '../../../firebase';
import FlatButton from 'material-ui/FlatButton';
import RosterTable from '../../advisor/RosterTable';
import StudentApplicationTable from './StudentApplicationTable';


class StudentApplicationTool extends Component {
  constructor() {
    super();
    this.state = {
      teamData : '',
      Reject:true
    }
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount = () => {
    let fbRef = firebase.database().ref('StudentApplication');
    fbRef.on('value', (snap) =>{
      if(!!snap) {
        this.setState(()=>({teamData:snap.val()}));
      }
    });

    let semesterRef = firebase.database().ref('Semester');
    semesterRef.once('value').then((snap)=>{
      this.setState({semester:snap.val().current});
    });

    let rejectRef = firebase.database().ref('RejectedStudents');
    rejectRef.on('value', (snap) =>{
      let rejectedStudents = {};
      if(this.state.semester) {
        Object.keys(snap.val()).forEach((element)=>{
          Object.keys(snap.val()[element][this.state.semester]).forEach((student)=>{
            rejectedStudents[student] = snap.val()[element][this.state.semester][student];
          });
        });
      }
      if(!!snap) {
        this.setState(()=>({rejectedStudents:rejectedStudents}));
      }
    });
  
  }

  handleClick() {
    this.setState((prevState)=>({Reject:!prevState.Reject}));
  }

  render() {
    return(
      <div>
        {this.state.Reject
          ?<div>
          {this.state.teamData 
            ?<StudentApplicationTable roster = {this.state.teamData} />
            :<h1 style = {{textAlign:'center'}}>No Student Applications</h1>
          }
          </div>
          :<div>
            {this.state.rejectedStudents 
              ?<div>
                <h1 style = {{textAlign:'center'}}>Rejected Students</h1>
                <RosterTable roster = {this.state.rejectedStudents}  student = {true}/>
              </div>
              :<h4>No Rejected Students</h4>
            }
          </div>
        }
        <MuiThemeProvider>
          <div>
            {this.state.Reject 
              ?<FlatButton label = "Rejected Students" onClick = {this.handleClick} style = {{float:'right'}}/>
              :<FlatButton label = "Student Applicants" onClick = {this.handleClick} />
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default StudentApplicationTool;