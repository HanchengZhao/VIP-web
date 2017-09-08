import React, { Component } from 'react';

import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import {Validation} from '../../Validation';
import {university} from '../../Theme';
import TeamApplyModalComponent from './Application/TeamApplyModalComponent';
import TextFieldComponent from './Application/TextFieldComponent';
import {Link} from 'react-router-dom';

const TeamFormPath = 'StudentApplication';
var db = 'Student Application';
const style = {
  margin: "10px"
};
const styles = {
  customWidth: {
    width: 260,
  },
};



// Create an array in this.state. then populate the array with TeamApplication key values. Then access them in the TextFieldComponent with the ids in loop.
class StudentApplication extends Component{
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        comments:'',
        major:'',
        gpa:'',
        asuriteID:'',
        questions:'',
        fbkey: this.props.match.params.projectid,
        errorText:'',
        year:'',
        telephoneNumber:'',
        barret:'',
        join:'',
        value:''
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

    handleJoin = (event, index, join) => {
        this.setState({join});
        // alert(JSON.stringify(join));
    };

    handleBarret = (event, index, barret) => {
        this.setState({barret});
       // alert(JSON.stringify(barret));
    };

    handleYear = (event, index, year) => {
        this.setState({year});
       // alert(JSON.stringify(year));
    };

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
          const rootRef = firebase.database().ref(`StudentApplication/`+this.state.title);
          rootRef.push({
          name: this.state.name,
          email: this.state.email,
          major:this.state.major,
          asuriteID: this.state.asuriteID,
          questions:this.state.questions,
          year:this.state.year,
          barret:this.state.barret,
          telephoneNumber: this.state.telephoneNumber,
          join:this.state.join,
      });
      }
      
      
      this.setState({
          value:'',
          id:'',
          level: '',
          program: '',
          questions: '',
          name: '',
          email: '',
          major: '',
          gpa:'',
          errorText:'',
          year:'',
          barret:'',
          join:'',
          comments:'',
          telephoneNumber:''
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
		<div style={{margin: 'auto',textAlign: 'center'}}>
		  <MuiThemeProvider>
            <div>
              <Card>
                <CardTitle title='Application Form' />
                <div className="row">
                  {this.state.questionsArray 
                  ? (Object.keys(this.state.questionsArray).map((id) => {
                    if(questionsArray[id].id==="email") {
                      return(
                        <div key={id}>
                          <TextField questionArray={questionsArray[id]} var={questionsArray[id].id}
                          floatingLabelText={questionsArray[id].text}
                          hintText={questionsArray[id].hint}
                          errorText={this.state.errorText}
                          onChange={ this.handleChange}/><br /></div>)
                    }
                    return(
                  <div key = {id}>
                    <TextField questionArray={questionsArray[id]} var={questionsArray[id].id}
                      floatingLabelText={questionsArray[id].text}
                      hintText={questionsArray[id].hint}

                      onChange={ this.handleChange}/><br/>
                  </div>)}))
                    : (<h2>Loading..</h2>) }                
                <br/>
                <SelectField
                  floatingLabelText="Year"
                  value={this.state.year}
                  onChange={this.handleYear}>
                    <MenuItem value="Freshman" primaryText="Freshman" />
                    <MenuItem value="Sophomore" primaryText="Sophomore" />
                    <MenuItem value="Junior" primaryText="Junior" />
                    <MenuItem value="Senior" primaryText="Senior" />
                    <MenuItem value="Graduate Student" primaryText="Graduate Student" />
                    <MenuItem value="Other" primaryText="Other" />
                </SelectField><br/>
                <SelectField
                  floatingLabelText="Barret College?"
                  value={this.state.barret}
                  onChange={this.handleBarret}>
                    <MenuItem value="Yes" primaryText="Yes" />
                    <MenuItem value="No" primaryText="No" />
                </SelectField><br />
                <SelectField
                  floatingLabelText="Interested?"
                  value={this.state.join}
                  onChange={this.handleJoin}>
                    <MenuItem value="Yes" primaryText="Yes" />
                    <MenuItem value="Maybe" primaryText="Maybe" />
                    <MenuItem value="Would like to know more" primaryText="Would like to know more" />
                    <MenuItem value="Not now" primaryText="Not now" />
                    <MenuItem value="Maybe later" primaryText="Maybe later" />
                </SelectField>                           
                </div>
              </Card><br/>       
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



export default StudentApplication;