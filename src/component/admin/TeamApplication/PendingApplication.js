import React, { Component } from 'react';

import firebase from "../../../firebase";
import MuiButton from "../../MuiButton";
import DeniedApplication from './DeniedApplication';
import ProjectApprovalCard from './ProjectApprovalCard';

const style = {textAlign:"center"};


class TeamApplication extends Component {

  constructor() {
    super();
    this.state = {
      Applications: '',
      open: false,
      denied:false,
    }
    this.showDenied = this.showDenied.bind(this);
    this.hideDenied = this.hideDenied.bind(this);
  }
  
  componentDidMount = () => {
    const fbRef = firebase.database().ref("TeamApplication");
    fbRef.on('value', (snap) => {
      this.setState({
        Applications: snap.val()
      })

    });
  }

  showDenied() {
    this.setState({
      denied:true
    });
  }

  hideDenied() {
    this.setState({
      denied:false
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
        <div style = {{paddingTop:"20px", float:"right"}}>
          <MuiButton label = "Denied Applications" onClick = {this.showDenied}/>
        </div>
        {this.state.denied &&
          <div style = {{paddingTop:"50px"}}>
            <DeniedApplication />
            <MuiButton label = "hide" onClick = {this.hideDenied}/>
          </div>
        }
      </div>
    );

  }
}

export default TeamApplication;