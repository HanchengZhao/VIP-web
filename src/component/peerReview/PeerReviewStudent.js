import React, { Component } from 'react';

import SelectPeers from './SelectPeers';
import QuestionPeers from './QuestionPeers';

import { observer } from "mobx-react";
import PeerReviewStore from '../../stores/PeerReviewStore';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from '../../firebase';
import userStore from '../../stores/UserStore';

@observer
class PeerReviewStudent extends Component {
  constructor () {
    super();
    this.state = {
      available:false
    }
  }

  componentDidMount() {
    firebase.database().ref(`Semester/`).once('value', (snap)=>{
      this.setState({
        Semester:snap.val().current
      });
    }).then(()=>{
      let team = '';
      firebase.database().ref('Students').on('value', (snap) => {
        Object.keys(snap.val()).forEach((i) => {
          Object.keys(snap.val()[i][this.state.Semester]).forEach((student)=>{
            if(snap.val()[i][this.state.Semester][student].email === userStore.email) {
              team = snap.val()[i][this.state.Semester][student].teamName;
            }
          });
        });
      });
      firebase.database().ref(`Questions/`).once('value', (snap)=>{
        let defaultForm = snap.val()[team]["defaultForm"];
        let startDate = new Date(snap.val()[team][defaultForm].startDate || 0);
        let endDate = new Date(snap.val()[team][defaultForm].endDate || 13413412341233);
        let todayDate = new Date();
        console.log(snap.val()[team][defaultForm].endDate);
        if((startDate.getTime() <= todayDate.getTime()) && (todayDate.getTime() <= endDate.getTime())) {
          this.setState({
            available:true
          });
        }
      });

    });
  }

  render() {
    console.log(this.state.available);
    return (
      <div>
        <h2>PeerReview</h2>
        {this.state.available
          ?<SelectPeers />
          :<h4>There are no active forms</h4>
        }
        
      </div>    
    );
  }
}

export default PeerReviewStudent;