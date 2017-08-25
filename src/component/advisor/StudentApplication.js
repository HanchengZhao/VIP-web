import React, {Component} from 'react';
import firebase from '../../firebase';
import StudentApplicationTable from '../admin/StudentApplication/StudentApplicationTable';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      Applications:''
    };
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
  }

  render() {
    return(
      <div>
<<<<<<< HEAD
        {this.state.Applications.length !== 0
=======
        {this.state.Applications
>>>>>>> 8a2e7a5910bbafa6cfa60f65d7bde5e0933db060
          ?<StudentApplicationTable roster = {this.state.Applications} />
          :<h1 style = {{textAlign:'center'}}>No Applications</h1>
        }
      </div>
    );
  }
}

export default Application;