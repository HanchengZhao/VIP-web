import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {checkEmpty} from '../../Validation';
import Primary, {university} from '../../Theme';
import TeamApplyModalComponent from './Application/TeamApplyModalComponent';
import TextFieldComponent from './Application/TextFieldComponent';
import {Link} from 'react-router-dom';

const TeamFormPath = 'StudentApplication_Raw_Data';
var db = 'Student Application';
const style = {
  margin: "10px"
};

// Create an array in this.state. then populate the array with TeamApplication key values. Then access them in the TextFieldComponent with the ids in loop.
class StudentApplication extends Component{
  constructor(props) {
      super(props);
      this.state = {
        data:{},
        fbkey: this.props.match.params.projectid,
        errorText:'',
        error:{},
        courses:'',
        value:0,
        notIncluded:['fbkey', 'errorText','error','other']
      };    
    }

    componentDidMount() {
        firebase.database().ref(`Teams/`+this.state.fbkey).once(`value`).then( (snap) => {
            this.setState({
                title: snap.val().teamName,
            });
        })
        
        firebase.database().ref(`FormQuestions/${db}`).once('value').then( (snap) => {
          let data = {}
          let notIncluded = this.state.notIncluded;
          Object.keys(snap.val()).forEach((i)=>{
            data[snap.val()[i].id] = ''
            if(!snap.val()[i].required) {
              notIncluded.push(snap.val()[i].id);
            }
          });
          this.setState({
            questionsArray: snap.val(),
            data:data,
            notIncluded:notIncluded
          });
        });
    }

    getdata =(childdata) =>{
      this.setState({
        teamLogo: childdata,
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
    let empty = checkEmpty(this.state.error, this.state.data, this.state.data.email, this.state.notIncluded);
    if(empty[0]) {
      if(`${db}`==='General Information'){
          const rootRef = firebase.database().ref().child('GeneralInformation');
          rootRef.push(
          this.state.data
      );
      } else if(`${db}`==='Academic Information'){
          const rootRef = firebase.database().ref().child('AcademicInformation');
          rootRef.push(
          this.state.data
          );
      } else if(`${db}`==='Student Application'){
          const rootRef = firebase.database().ref(`${TeamFormPath}`);
          rootRef.push(
          this.state.data
      );
      }
      
      
      this.setState({
          id:'',
          level: '',
          program: '',
          gradeType: '',
          name: '',
          email: '',
          major: '',
          gpa:'',
          errorText:'',
          error:[]

      });
    }
    this.setState({
      errorText:empty[2],
      error:empty[1]
    });
    console.log(empty[1]);
  }

	render(){
    let questionsArray = this.state.questionsArray;
    //alert(JSON.stringify(questionsArray));
		return (
		<div>
		  <MuiThemeProvider>
            <div>
              <Card>
                <CardTitle title={this.state.title + ' Application Form'} style={{textAlign:"center"}} />
                  <div className="row" style={{position:"relative", left:"43%"}}>
                  {this.state.questionsArray 
                  ? (Object.keys(this.state.questionsArray).map((id) => {
                    if(questionsArray[id].id==="email") {
                      return(
                        <div key={id}>
                          <TextField
                          floatingLabelText={questionsArray[id].text}
                          hintText={questionsArray[id].hint}
                          errorText={this.state.errorText}
                          onChange={ this.handleChange}/><br /></div>)
                    }
                    return(
                  <div key = {id}>
                    <TextField
                      floatingLabelText={questionsArray[id].text}
                      hintText={questionsArray[id].hint}
                      errorText={this.state.error[questionsArray[id].id]}
                      onChange={ this.handleChange}/><br/>
                  </div>)}))
                    : (<h2>Loading..</h2>) }                
                <br/>
                </div>
              </Card><br/>
                       
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div style={{margin: 'auto',textAlign: 'center'}}>
                  <RaisedButton label="Apply"  style={style} backgroundColor={Primary} onClick={this.firebasewrite}
                  data-toggle="modal" data-target="#myModal" /> <br />
                </div>
              </MuiThemeProvider>
            </div>
		  </MuiThemeProvider>
		</div> )
	}
}



export default StudentApplication;