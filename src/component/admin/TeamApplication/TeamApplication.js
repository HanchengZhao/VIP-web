import React, { Component } from 'react';

import firebase from "../../../firebase";
import ProjectApprovalCard from './ProjectApprovalCard';

const style = {textAlign:"center"};


class TeamApplication extends Component {

  constructor() {
    super();
    this.state = {
      Applications: '' 
    }
  }
  
  componentDidMount = () => {
    const fbRef = firebase.database().ref("TeamApplication");
    fbRef.on('value', (snap) => {
      this.setState({
        Applications: snap.val()
      })

    });
  }

  render = () => {
    let Applications = this.state.Applications;
    return(
      <div className = "row">
        <h1 style = {style}>TEAMS PENDING APPROVAL</h1>
        { this.state.Applications
              ? (Object.keys(this.state.Applications).map((uuid) =>
                  <ProjectApprovalCard key = {uuid} fbkey = {uuid} Application = {Applications[uuid]} />
                ))
              : (<h3 style = {style}>No Projects pending approval</h3>)
            }
      </div>
    );

  }
}

export default TeamApplication;