import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {checkEmpty} from '../../Validation';
import {university} from '../../Theme';
import ASUTeamLogoUpload from './Application/ASUTeamLogoUpload';
import TeamApplyModalComponent from './Application/TeamApplyModalComponent';
import TextFieldComponent from './Application/TextFieldComponent';
import {Link} from 'react-router-dom';
import Primary from '../../Theme';

const TeamFormPath = 'TeamApplication_Raw_Data';
var db = 'Team Application';
const style = {
  margin: "10px"
};

function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
// Create an array in this.state. then populate the array with TeamApplication key values. Then access them in the TextFieldComponent with the ids in loop.
class ProjectApplication extends Component{
  constructor() {
      super();
      this.state = {
        applied:false,
        notIncluded:['data','error'],
        empty:{},
        data:{},
        error:{}
      };
    }

    componentDidMount() {
      firebase.database().ref(`FormQuestions/${db}`).once('value').then( (snap) => {
        let data = {};
        let empty = {};
        let notIncluded = this.state.notIncluded;
        Object.keys(snap.val()).forEach((i)=>{
          data[snap.val()[i].id] = '';
          empty[snap.val()[i].id] = '';
          if(!snap.val()[i].required) {
            notIncluded.push(snap.val()[i].id);
          }
        });
        this.setState({
          data:data,
          empty:empty,
          notIncluded:notIncluded,
          questionsArray: snap.val(),
        });
      });
    } 

    getdata =(childdata) =>{
      let data = this.state.data;
      data['logo'] = childdata;
      this.setState({
        data:data
      });
    }

    handleChange = (event) => {
    var str = event.target.id;
    var res = str.split("-");
    var key = res[2].charAt(0).toLowerCase() + res[2].slice(1);
    var val = event.target.value;
    var obj  = this.state.data;
    obj[key] = val;
    if(key==="topics"){
     var str = event.target.value;
     var res=str.split(",");
     this.setState({
        topics : res,
      })
    }
    else{
        this.setState(obj);
    }
  }



  firebasewrite = () => {
    let empty = checkEmpty(this.state.error, this.state.data, this.state.data.contactEmail, this.state.notIncluded);
    if(empty[0]){
      if(`${db}`==='Team Application'){
          const rootRef = firebase.database().ref().child(TeamFormPath);
          rootRef.push(this.state.data);
      }
      this.setState((prevState) => {
        return {
          data:prevState.empty,
          applied:true
        };
      });
    }
    console.log(this.state.empty);
    this.setState({
      error:empty[1],
      errorText:empty[2]
    })

  }

	render(){
    let questionsArray = this.state.questionsArray;
    //alert(JSON.stringify(questionsArray));
		return (
		<div>
		  <MuiThemeProvider>
            <div>
              <Card>
                <div style={{position: "relative",left: "45%"}}>
                <CardTitle title='Team Apply Form' />
                <div className="row">
                  {this.state.questionsArray 
                  ? (Object.keys(this.state.questionsArray).map((id) => {
                    if(questionsArray[id].id==="contactEmail") {
                      return(
                        <div key={id}>
                          <TextField
                          floatingLabelText={questionsArray[id].text}
                          value = {this.state.data[questionsArray[id].id]}
                          hintText={questionsArray[id].hint}
                          errorText={this.state.errorText}
                          onChange={ this.handleChange}/><br /></div>)
                    }

                    return(
                  <div key={id}>
                  <TextField
                    floatingLabelText={questionsArray[id].text}
                    value = {this.state.data[questionsArray[id].id]}
                    hintText={questionsArray[id].hint}
                    errorText={this.state.error[questionsArray[id].id]}
                    multiLine={true}
                    onChange={ this.handleChange}/><br /></div>)}))
                    : (<h2>Loading..</h2>) }                
                </div>
                </div>
              </Card><br/>
              <div style={{margin:"auto",textAlign:"center"}}>
                <ASUTeamLogoUpload childdata = {this.getdata}/>             
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <div>
                    <RaisedButton label="Apply"  style={style} backgroundColor={Primary} onClick={this.firebasewrite}
                    data-toggle="modal" data-target="#myModal"/> <br />
                  </div>
                </MuiThemeProvider>
              </div>
            </div>
		  </MuiThemeProvider>
		</div> )
	}
}



export default ProjectApplication;