import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
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

const TeamFormPath = 'Teams';
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
        error:{},
        open:false,
        faculty:[],
        industryPeople:[],
        contactPeople:[]
      };

      this.addFaculty = this.addFaculty.bind(this);
      this.changeFaculty = this.changeFaculty.bind(this);
      this.removeFaculty = this.removeFaculty.bind(this);

      this.addContact = this.addContact.bind(this);
      this.removeContact = this.removeContact.bind(this);
      this.changeContact = this.changeContact.bind(this);

      this.addIndustry = this.addIndustry.bind(this);
      this.removeIndustry = this.removeIndustry.bind(this);
      this.changeIndustry = this.changeIndustry.bind(this);

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
    console.log(key);
    obj[key] = val;
    if(key==="topics"){
     var str = event.target.value;
     var res=str.split(",");
     this.setState({
        topics : res,
      })
    }
    else{
        console.log(obj);
        this.setState(obj);
    }
  }



  firebasewrite = () => {
    console.log(this.state.data);
    let empty = checkEmpty(this.state.error, this.state.data, this.state.data.leadFacultyEmail, this.state.notIncluded);
    if(empty[0]){
      if(`${db}`==='Team Application'){
          const rootRef = firebase.database().ref().child(TeamFormPath);
          rootRef.push(this.state.data);
      }
      this.setState((prevState) => {
        return {
          data:prevState.empty,
          faculty:[],
          open:true,
          contactPeople:[],
          industryPeople:[]
        };
      });
    }
    this.setState({
      error:empty[1],
      errorText:empty[2]
    })

  }

  addFaculty(){
    let faculty = this.state.faculty;
    let newFaculty = {
      email:'',
      name:'',
      degree:'',
      title:'',
      unit:'',
    }
    faculty.push(newFaculty);
    this.setState({
      faculty:faculty
    });
  }

  addIndustry(){
    let industryPeople = this.state.industryPeople;
    let newPerson = {
      email:'',
      name:'',
    }
    industryPeople.push(newPerson);
    this.setState({
      industryPeople:industryPeople
    });
  }

  addContact(){
    let Contact = this.state.contactPeople;
    let newContact = {
      email:'',
      name:'',
    }
    Contact.push(newContact);
    this.setState({
      contactPeople:Contact
    });
  }

  changeFaculty(event, value){
    let id = event.target.id;
    let index = id[id.length-1];
    id = id.substring(0, id.length-1);

    let obj = this.state.data;

    let faculty = this.state.faculty;
    faculty[index][id] = value;
    obj["faculty"] = faculty;

    this.setState({
      data:obj,
      faculty:faculty
    });
  }

  changeContact(event, value){
    let id = event.target.id;
    let index = id[id.length-1];
    id = id.substring(0, id.length-1);

    let obj = this.state.data;

    let Contact = this.state.contactPeople;
    Contact[index][id] = value;
    obj["contact"] = Contact;

    this.setState({
      data:obj,
      contactPeople:Contact
    });
  }

  changeIndustry(event, value){
    let id = event.target.id;
    let index = id[id.length-1];
    id = id.substring(0, id.length-1);

    let obj = this.state.data;
    
    let Industry = this.state.industryPeople;

    Industry[index][id] = value;
    obj["industry"] = Industry;

    this.setState({
      data:obj,
      industryPeople:Industry
    });
  }

  removeFaculty(index){
    let faculty = this.state.faculty
    faculty.splice(index, 1);
    this.setState({
      faculty:faculty
    });
  }

  removeContact(index){
    let Contact = this.state.contactPeople
    Contact.splice(index, 1);
    this.setState({
      contactPeople:Contact
    });
  }

  removeIndustry(index){
    let Industry = this.state.industryPeople;
    Industry.splice(index, 1);
    this.setState({
      industryPeople:Industry
    });
  }

	render(){
    let questionsArray = this.state.questionsArray;
    //alert(JSON.stringify(questionsArray));
    let faculty = this.state.faculty.map((faculty, index)=>{
      return (<div className = "row" key = {index}>
        <h3 style = {{color:'#b2b2b2'}}>faculty {index + 1}
          <i className = "glyphicon glyphicon-remove" 
            id = {index} 
            onClick = {()=>this.removeFaculty(index)} 
            style = {{display:'inline-block', cursor:'pointer',fontSize: '1.2em', textAlign:'right'}}/>
        </h3>
        <br />
        <TextField floatingLabelText = "email" id = {"email"+index} onChange = {this.changeFaculty} /><br />
        <TextField floatingLabelText = "name" id = {"name"+index}  onChange = {this.changeFaculty} /><br />
        <TextField floatingLabelText = "degree" id = {"degree"+index} onChange = {this.changeFaculty} /><br />
        <TextField floatingLabelText = "title" id = {"title"+index} onChange = {this.changeFaculty} /><br />
        <TextField floatingLabelText = "unit" id = {"unit"+index} onChange = {this.changeFaculty} /><br />
        
      </div>);
    });

    let Contact = this.state.contactPeople.map((contact, index)=>{
      return (<div className = "row" key = {index}>
        <h3 style = {{color:'#b2b2b2'}}>Contact Person {index + 1}
          <i className = "glyphicon glyphicon-remove" 
            id = {index} 
            onClick = {()=>this.removeContact(index)} 
            style = {{display:'inline-block', cursor:'pointer',fontSize: '1.0em', textAlign:'right'}}/>
        </h3>
        <br />
        <TextField floatingLabelText = "email" id = {"email"+index} onChange = {this.changeContact} /><br />
        <TextField floatingLabelText = "name" id = {"name"+index}  onChange = {this.changeContact} /><br />
      </div>);
    });

    let Industry = this.state.industryPeople.map((industry, index)=>{
      return (<div className = "row" key = {index}>
        <h3 style = {{color:'#b2b2b2'}}>Industry Person {index + 1}
          <i className = "glyphicon glyphicon-remove" 
            id = {index} 
            onClick = {()=>this.removeIndustry(index)}
            style = {{display:'inline-block', cursor:'pointer',fontSize: '1.0em', textAlign:'right'}}/>
        </h3>
        <br />
        <TextField floatingLabelText = "email" id = {"email"+index} onChange = {this.changeIndustry} /><br />
        <TextField floatingLabelText = "name" id = {"name"+index}  onChange = {this.changeIndustry} /><br />
      </div>);
    });
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
                    if(questionsArray[id].id==="leadFacultyEmail") {
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
                  {faculty}
                  {Contact}
                  {Industry}
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <div>
                    <RaisedButton label="add faculty"  style={style} backgroundColor={Primary} onClick={this.addFaculty}/>
                    <RaisedButton label="add contact person"  style={style} backgroundColor={Primary} onClick={this.addContact}/>
                    <RaisedButton label="add industry person"  style={style} backgroundColor={Primary} onClick={this.addIndustry}/>
                    <br />
                  </div>
                </MuiThemeProvider>
              </Card><br/>
              <div style={{margin:"auto",textAlign:"center"}}>
                <ASUTeamLogoUpload childdata = {this.getdata}/>             
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <div>
                    <RaisedButton label="Apply"  style={style} backgroundColor={Primary} onClick={this.firebasewrite}/>
                    <br />
                  </div>
                </MuiThemeProvider>
              </div>
              <Dialog
                title="Applied"
                modal={false}
                open={this.state.open}
                onRequestClose={()=>{this.setState({open:false})}}
                />
            </div>
		  </MuiThemeProvider>
		</div> )
	}
}



export default ProjectApplication;
