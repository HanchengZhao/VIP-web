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
import ASUTeamLogoUpload from './Application/ASUTeamLogoUpload';
import TeamApplyModalComponent from './Application/TeamApplyModalComponent';
import TextFieldComponent from './Application/TextFieldComponent';
import {Link} from 'react-router-dom';

const TeamFormPath = 'TeamApplication';
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
        gpa:'',
        teamName: '',
        subtitle: '',
        topics: '',
        advisors: '',
        description: '',
        major: '',
        requirements: '',
        members: '',
        name: '',
        email: '',
        status: '',
        teamLogo: '',
        test:'',
        problemStatement :'' ,
        contactPerson:'',
        contactEmail:'',
        studentOpportunities: '',
        industryLeader:'',
        industryEmail:''
      };
    }

    componentDidMount() {
        
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
    if(Validation(this.state.email)){
      if(`${db}`==='Team Application'){
          const rootRef = firebase.database().ref().child('Teams');
          rootRef.push({
          title : this.state.teamName,
          subtitle : this.state.subtitle,
          topics : this.state.topics,
          description : this.state.description,
          members : this.state.members,
          name : this.state.name,
          email : this.state.email,
          status : this.state.status,
          logo: this.state.teamLogo,
          gpa: this.state.gpa,
          major:this.state.major,
          requirements:this.state.requirements,
          advisor: this.state.advisors,
          problemStatement: this.state.problemStatement,
          contactPerson:this.state.contactPerson,
          contactEmail:this.state.contactEmail,
          studentOpportunities: this.state.studentOpportunities,
          industryLeader:this.state.industryLeader,
          industryEmail:this.state.industryEmail,
          sections: [
                    {'content':this.state.major,'title': 'Major'},
                    {'content':this.state.requirements,'title': 'Requirements'},
                    {'content':this.state.advisors,'title': 'Advisor'}],
      });
      } else if(`${db}`==='General Information'){
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
      }
    
    
    this.setState({
          teamName: '',
          subtitle: '',
          topics: '',
          advisors: '',
          description: '',
          major:'',
          requirements:'',
          members:'',
          name:'',
          email:'',
          status:'',
          teamLogo: '',
          gpa: '',
          errorText:'',
          problemStatement: '',
          contactPerson:'',
          contactEmail:'',
          studentOpportunities: '',
          industryLeader:'',
          industryEmail:''

    });
    }else{
        this.setState({
          errorText:"Please Enter A Valid email"
        });
      }

  }

	render(){
    let questionsArray = this.state.questionsArray;
    //alert(JSON.stringify(questionsArray));
		return (
		<div style={{margin: 'auto',textAlign: 'center'}}>
		  <MuiThemeProvider>
            <div>
              <Card>
                <CardTitle title='Team Apply Form' />
                <div className="row">
                  {this.state.questionsArray 
                  ? (Object.keys(this.state.questionsArray).map((id) => {
                    if(questionsArray[id].id==="email"||questionsArray[id].id==="contactEmail"||questionsArray[id].id==="industryEmail") {
                      return(
                        <div key={id}>
                          <TextField questionArray={questionsArray[id]} var={questionsArray[id].id}
                          floatingLabelText={questionsArray[id].text}
                          hintText={questionsArray[id].hint}
                          errorText={this.state.errorText}
                          onChange={ this.handleChange}/><br /></div>)
                    }
                    return(
                  <div key={id}>
                  <TextField questionArray={questionsArray[id]} var={questionsArray[id].id}
                    floatingLabelText={questionsArray[id].text}
                    hintText={questionsArray[id].hint}

                    onChange={ this.handleChange}/><br /></div>)}))
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
		</div> )
	}
}



export default ProjectApplication;