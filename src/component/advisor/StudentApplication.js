import React, {Component} from 'react';
import firebase from '../../firebase';
import RosterTable from './RosterTable';
import StudentApplicationTable from '../admin/StudentApplication/StudentApplicationTable';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      Applications:'',
      Reject:true,
      rejectedStudents:''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('StudentApplication').on('value', (snap) => {
      console.log(snap.val());
      let Applications = {};
      if(snap.val()) {
        Object.keys(snap.val()).forEach((student)=>{
          if(this.props.team.includes(snap.val()[student].teamName)) {
            Applications[student] = snap.val()[student];
          }
        });
      }
      this.setState({
        Applications:Applications
      });
    });

    let semesterRef = firebase.database().ref('Semester');
    semesterRef.once('value').then((snap)=>{
      this.setState({semester:snap.val().current});
    });

    let rejectRef = firebase.database().ref('RejectedStudents');
    rejectRef.on('value', (snap) =>{
      let rejectedStudents = {};
      console.log(this.state.semester);
      if(this.state.semester) {
        Object.keys(snap.val()).forEach((element)=>{
          Object.keys(snap.val()[element][this.state.semester]).forEach((student)=>{
            if(this.props.team.includes(snap.val()[element][this.state.semester][student].teamName)) {
              rejectedStudents[student] = snap.val()[element][this.state.semester][student];
            }
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
          {Object.keys(this.state.Applications).length !== 0
            ?<StudentApplicationTable roster = {this.state.Applications} />
            :<h1 style = {{textAlign:'center'}}>No Applications</h1>
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
              ?<div style = {{textAlign:'right'}}><FlatButton label = "Rejected Students" onClick = {this.handleClick} /></div>
              :<FlatButton label = "Student Applicants" onClick = {this.handleClick} />
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Application;