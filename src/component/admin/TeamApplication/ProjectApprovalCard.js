import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiButton from '../../MuiButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import {DeleteColor} from '../../../Theme';
import firebase from "../../../firebase";

const style = {
  actions: {marginLeft  : 'auto', marginRight : '1px', marginBottom:"30px", width:"215px"}, 
  button : {display:"inline-block !important"}};

const TeamApprovalPath = "Teams";
const TeamRejectPath = "RejectedTeams";

class ProjectApprovalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application:this.props.Application,
      fbkey:this.props.fbkey,
      open: false,
      comments: '',
    }
    this.sendPopup = this.sendPopup.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeApplication = this.removeApplication.bind(this);
    this.addAdvisors = this.addAdvisors.bind(this);
  }
  
  removeApplication = () => {
    firebase.database().ref('TeamApplication').child(`${this.state.fbkey}`).remove();
  }

  handleAccept = () => {
    let fbRef = firebase.database().ref().child(TeamApprovalPath);
    fbRef.push(this.props.Application);
    this.addAdvisors(this.state.application);
    this.removeApplication();
  }

  addAdvisors(application) {
    let advisorRef = firebase.database().ref('Advisor');
    let userRef = firebase.database().ref('Users');
    advisorRef.push({
      email:application.leadFacultyEmail,
      name:application.leadFacultyName,
      team:application.teamName
    });
    userRef.push({
      email:application.leadFacultyEmail,
      role:"advisor",
    });
    if(application["faculty"]){
      application["faculty"].foreach((faculty)=>{
        advisorRef.push({
          email:faculty.email,
          name:faculty.name,
          team:application.teamName
        });
        userRef.push({
          email:faculty.email,
          role:'advisor'
        });
      });
    }
  }

  handleReject = () => {
    let fbRef = firebase.database().ref().child(TeamRejectPath);
    fbRef.push({
      application: this.props.Application,
      comments:this.state.comments
    });
    this.handleClose();
    this.removeApplication();
  }
  
  sendPopup = () => {
    this.setState({
      open:true,
    });
  }

  handleClose = () => {
    this.setState({
      open:false,
    });
  }

  handleChange = (e) => {
    this.setState({
      comments: e.target.value
    });
  }

  render = () => {
    const actions = [
      <FlatButton label="No"  onClick = {this.handleClose}/>,
      <FlatButton label="Yes" onClick = {this.handleReject}/>
    ];
   let data = Object.keys(this.state.application).map((key) => {
     if(key === "faculty" || key === "contact" || key === "industry" || key.substring(0, 4)==="lead" ){
       return;
     }
      return(
        <div key = {key}>
          <h3>{key.split(/(?=[A-Z])/).join(" ")}</h3>
          <p>{this.state.application[key]}</p>
        </div>
      );
    });

    let leadFaculty = <p> {this.state.application["leadFacultyDegree"]}, {this.state.application["leadFacultyName"]}, {this.state.application["leadFacultyEmail"]}, {this.state.application["leadFacultyAcademicUnit"]}, {this.state.application["leadFacultyAcademicTitle"]}</p>;

    let faculty_section;
    if(this.state.application['faculty']){
      faculty_section  = this.state.application['faculty'].map((faculty)=>{
        return(<div>
          <p>{faculty.name}, {faculty.email}, {faculty.degree}, {faculty.title}, {faculty.unit}</p>
        </div>);
      });
    }

    let contact_section;
    if(this.state.application['contact']){
      contact_section  = this.state.application['contact'].map((contact)=>{
        return(<div>
          <p>{contact.name}, {contact.email}</p>
        </div>);
      });
    }

    let industry_section;
    if(this.state.application['industry']){
      industry_section  = this.state.application['industry'].map((industry)=>{
        return(<div>
          <p>{industry.name}, {industry.email}</p>
        </div>);
      });
    }



    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Card>
             <CardTitle title = {this.state.application.teamName} subtitle={this.state.application.subtitle} actAsExpander={true} showExpandableButton={true}/>
              <CardText>
               {this.state.desc}
              </CardText>
             <CardMedia expandable={true}>
                <img src={this.state.application.logo} alt="Image Logo for team" />
              </CardMedia>
              <CardText expandable = {true}>
                <h3>Lead Faculty</h3>
                {leadFaculty}
                {data}
                {this.state.application["faculty"] &&
                  <h3>Faculty</h3>
                }
                {faculty_section}
                {this.state.application["contact"] &&
                  <h3>Contact</h3>
                }
                {contact_section}
                {this.state.application["industry"] &&
                  <h3>Industry</h3>
                }
                {industry_section}
              </CardText>
              <CardActions style = {style.actions}>
                <MuiButton label = "Deny" color = {DeleteColor} onClick = {this.sendPopup}/>
                <MuiButton label = "Approve" onClick = {this.handleAccept}/>
              </CardActions>
            </Card>
            <Dialog 
              title="Are you sure you want to deny this application?"
              actions={actions}
              open = {this.state.open}
            >
            <TextField hintText="Comments . . . " onChange = {this.handleChange}/> 
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }  
}

export default ProjectApprovalCard;