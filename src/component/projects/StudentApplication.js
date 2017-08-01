import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Validation} from '../../Validation';
import {university} from '../../Theme';
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
        level: '',
        program: '',
        gradeType: '',
        name: '',
        email: '',
        other:'',
        major:'',
        gpa:'',
        title:'',
        fbkey: this.props.match.params.projectid,
        errorText:'',        
      };    
    }

    componentDidMount() {
        firebase.database().ref(`Teams/`+this.state.fbkey).once(`value`).then( (snap) => {
            this.setState({
                title: snap.val().title,
            });
        })
        
        firebase.database().ref(`FormQuestions/${db}`).once('value').then( (snap) => {
        this.setState({
        questionsArray: snap.val(),
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
    var obj  = {};
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
    if(Validation(this.state.email)) {
      if(`${db}`==='General Information'){
          const rootRef = firebase.database().ref().child('GeneralInformation');
          rootRef.push({
          name : this.state.name,
          email : this.state.email,
      });
      } else if(`${db}`==='Academic Information'){
          const rootRef = firebase.database().ref().child('AcademicInformation');
          rootRef.push({
          major: this.state.major,
          gpa: this.state.gpa,
          });
      } else if(`${db}`==='Student Application'){
          const rootRef = firebase.database().ref(`${TeamFormPath}`);
          rootRef.push({
          level: this.state.level,
          program: this.state.program,
          gradeType: this.state.gradeType,
          name: this.state.name,
          email: this.state.email,
          other: this.state.other,
          team:this.state.title
      });
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
          errorText:''
      });
    }else{
      this.setState({
        errorText:'Please Enter A Valid ' + university + ' Email'
      });
    }
  }

	render(){
    let questionsArray = this.state.questionsArray;
    //alert(JSON.stringify(questionsArray));
		return (
		<div>
		  <MuiThemeProvider>
            <div>
              <Card>
                <div>
                  <CardTitle title={this.state.title + ' Application Form'}  style={{textAlign:"center"}} />
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
                        multiLine={true}
                        onChange={ this.handleChange}/><br/>
                    </div>)}))
                      : (<h2>Loading..</h2>) }                
                  <br/>
                  </div>
                </div>
              </Card><br/>
                       
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div style={{margin: 'auto',textAlign: 'center'}}>
                  <RaisedButton label="Apply"  style={style} backgroundColor='#ffc627' onClick={this.firebasewrite}
                  data-toggle="modal" data-target="#myModal" /> <br />
                </div>
              </MuiThemeProvider>
            </div>
		  </MuiThemeProvider>
		</div> )
	}
}



export default StudentApplication;