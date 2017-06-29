import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ASUTeamLogoUpload from './ASUTeamLogoUpload';
import TextFieldComponent from './TextFieldComponent';
import TeamApplyModalComponent from './TeamApplyModalComponent';
import { observable } from "mobx";
const TeamFormPath = 'TeamApplication';
const firebaseRead = firebase.database().ref().child("QuestionList");

const style = {
  margin: 12,
};

var variable="";

class ASUTeamFormComponent extends Component{
  constructor() {
      super();
      this.state = {
			      questionsArray:'',
            teamName: '',
            subtitle: '',
        };
	}
		
	componentDidMount() {

    firebase.database().ref(`FormQuestions/General Information`).once('value').then( (snap) => {
      this.setState({
        questionsArray: snap.val(),
  	});
	});
  } 
	
  /*  getdata =(childdata) =>{
      this.setState({
        teamLogo: childdata,
      });
    }


   handleTopicArray = (event) => {
     var str = event.target.value;
     var res=str.split(",");
     this.setState({
        topics : res,
      })
    }*/


  firebasewrite = () => {
    const rootRef = firebase.database().ref().child(TeamFormPath);
    rootRef.push({
        title : this.state.teamName,
        subtitle : this.state.subtitle,
    });
    this.setState({
          teamName: '',
          subtitle: '',
    });
    }


	render(){
    let questionsArray = this.state.questionsArray;
		return (
		<div style={{margin: 'auto',textAlign: 'center'}}>
		  <MuiThemeProvider>
            <div>
              <Card>
                <CardTitle title='Team Apply Form' />
                <div className="row">
                  {this.state.questionsArray 
                  ? (Object.keys(this.state.questionsArray).map((id) => 
                  <TextFieldComponent key={id} questionArray={questionsArray[id]}
                    floatingLabelFixed={true}
                    value={this.state.teamName} 
                    onChange={(event) => { this.setState({ teamName : event.target.value })}}/>)) 
                    : (<h2>Loading..</h2>) }                
                <br/>
                </div>
              </Card><br/>
              <ASUTeamLogoUpload childdata = {this.getdata}/>
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                  <RaisedButton label="Apply"  style={style} backgroundColor='#ffc627' onClick={this.firebasewrite}
                  data-toggle="modal" data-target="#myModal" /> <br />
                </div>
              </MuiThemeProvider>
            </div>
		  </MuiThemeProvider>
		  <TeamApplyModalComponent />
		</div> )
	}
}



export default ASUTeamFormComponent;