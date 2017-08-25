import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import PeerReviewStudent from './../peerReview/PeerReviewStudent';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Primary, {NavColor} from '../../Theme';
import RosterTable from '../advisor/RosterTable';
import userStore from '../../stores/UserStore';
import {Link, Route, Redirect} from 'react-router-dom';
import firebase from '../../firebase';

class StudentPage extends Component {

  constructor() {
    super();
    this.state = {
      PeerReview:false,
      roster: []
    }
    this.showRoster = this.showRoster.bind(this);
    this.showReview = this.showReview.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Students').on('value', (snap) => {
      let team;
      Object.keys(snap.val()).map((key)=>{
        Object.keys(snap.val()[key]).forEach((roster)=>{
          Object.keys(snap.val()[key][roster]).forEach((student)=>{
            if(snap.val()[key][roster][student].email === userStore.email) {
              this.setState({roster:snap.val()[key][roster]});
            }
          });
        })
      });
    });
  }

  showRoster() {
    this.setState({PeerReview:true});
  }

  showReview() {
    this.setState({PeerReview:false});
  }

  render = () => {
    return(
      <div>
        <MuiThemeProvider>
          <Paper style = {{padding:'20px'}} zDepth = {2}>
        {this.state.PeerReview 
          ?<div>
            <h2 style = {{textAlign:'center'}}>{this.state.team}</h2>
            <RosterTable student = {true} roster = {this.state.roster} />
          </div>
          :<PeerReviewStudent roster = {this.state.roster} />
        }
        </Paper>
        </MuiThemeProvider>
         <div style = {{paddingTop:'20px'}}>
          <MuiThemeProvider>
            <Tabs inkBarStyle ={{color:Primary}}>
              <Tab label = "Peer Review" style={{backgroundColor:NavColor}} onActive={this.showReview}/>
              <Tab label = "Team Roster" style={{backgroundColor:NavColor}} onActive={this.showRoster}/>       
            </Tabs>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default StudentPage;