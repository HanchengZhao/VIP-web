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
    firebase.database().ref('StudentApplication_Raw_Data').on('value', (snap) => {
      let Applications = [];
      Object.keys(snap.val()).forEach((student)=>{
        if(this.props.team.includes(snap.val()[student].teamName)) {
          Applications.push(snap.val()[student]);
        }
      });
      this.setState({
        Applications:Applications
      });
    });
  }

  render() {
    console.log(this.state.Applications)
    return(
      <div>
        {this.state.Applications &&
          <StudentApplicationTable roster = {this.state.Applications} />
        }
      </div>
    );
  }
}

export default Application;