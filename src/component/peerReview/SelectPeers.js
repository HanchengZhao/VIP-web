import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import firebase from '../../firebase';
import Checkbox from 'material-ui/Checkbox';
import QuestionPeers from './QuestionPeers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiButton from '../MuiButton';

import userStore from '../../stores/UserStore';

class SelectPeers extends Component {
  constructor() {
    super();
    this.state = {
      peers:'',
      selected:[],
      final:true,
      questions:'',
      team:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
  }

  componentDidMount() {
    var team = '';
    firebase.database().ref('Students').on('value', (snap) => {
      let peers = [];
      Object.keys(snap.val()).forEach((i) => {
        if(snap.val()[i].email === userStore.email) {
          team = snap.val()[i].team;
        }
      });
      Object.keys(snap.val()).forEach((i) => {
        if(snap.val()[i].team === team) {
          peers.push(snap.val()[i]);
        }
      });
      this.setState(()=>({
        peers:peers,
        team:team
      }));
    });
    firebase.database().ref(`Questions/`).once('value', (snap)=>{
      this.setState({
        questions:snap.val()
      });
    });
  }

  handleClick(event) {
    let id = event.target.id;
    let peer = this.state.peers;
    let selected = this.state.selected;
    if(selected.includes(peer[id])){
      let index = selected.indexOf(peer[id]);
      selected.splice(index, 1);
    }else {
      selected.push(peer[id]);
    }
    this.setState({
      selected:selected
    });
  }

  showQuestions() {
    let selected = this.state.selected;
    this.setState({final:false});
  }

  render() {
    return(
      <div>
        <MuiThemeProvider>
          <div>
            {this.state.team &&
            <Paper zDepth = {2} style = {{margin:'20px'}}>
              <div style = {{padding:'20px'}}>
                {this.state.final
                ?<div>
                  <table className = 'table'>
                    <thead>
                      <tr>
                        <th>Peers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.peers &&
                        this.state.peers.map((peer,index) => {
                          return <tr key = {index}>
                            <th>{peer.name}</th>
                            <th><MuiThemeProvider><Checkbox id = {index} onCheck = {this.handleClick}/></MuiThemeProvider></th>
                            </tr>
                        })
                      }
                    </tbody>
                  </table>
                  <div style = {{textAlign:'right'}}>
                    <MuiButton label = "continue" onClick = {this.showQuestions}/>
                  </div>
                </div>
                :<QuestionPeers peers = {this.state.selected} team = {this.state.team} questions = {this.state.questions}/>
                }
              </div>
            </Paper>
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SelectPeers;