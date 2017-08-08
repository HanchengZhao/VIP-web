import React, { Component } from 'react';
import RosterTable from '../../advisor/RosterTable';
import firebase from '../../../firebase';

const studentRef = 'Students';

class RosterTool extends Component {
  constructor() {
    super();
    this.state = {
      roster:''
    }
  }

  componentDidMount() {
    let fbRef = firebase.database().ref(`${studentRef}`);
    fbRef.on('value', (snap) => {
      this.setState({
        roster:snap.val()
      });
    });
  }


  render() {
    return (
      <div>
        {this.state.roster
        ?<RosterTable roster = {this.state.roster}/>
        :<h1/>
        }
      </div>
    );
  }
}

export default RosterTool;