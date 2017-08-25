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
        {Object.keys(this.state.Applications).length !== 0
          ?<StudentApplicationTable roster = {this.state.Applications} />
          :<h1 style = {{textAlign:'center'}}>No Applications</h1>
        }
      </div>
    );
  }
}

export default Application;