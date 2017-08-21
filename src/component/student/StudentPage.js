import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import PeerReviewStudent from './../peerReview/PeerReviewStudent';

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
    }
    this.showRoster = this.showRoster.bind(this);
    this.showReview = this.showReview.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('Students').on('value', (snap) => {
      let team;
      let roster = [];
      Object.keys(snap.val()).map((key)=>{
        if(userStore.email === snap.val()[key]['email']) {
          team = snap.val()[key]['team'];
          this.setState({team:team});
        }
      })
      Object.keys(snap.val()).map((key)=>{
        if(snap.val()[key]['team']===team) {
          roster.push({
            email:snap.val()[key]['email'],
            name:snap.val()[key]['name'],
            major: snap.val()[key]['Program_and_Plan']
          });
        }
      })
      this.setState({roster:roster});
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
        {this.state.PeerReview
          ?<div>
            <h2 style = {{textAlign:'center'}}>{this.state.team}</h2>
            <RosterTable roster = {this.state.roster} />
          </div>
          :<PeerReviewStudent />
        }
         <div>
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