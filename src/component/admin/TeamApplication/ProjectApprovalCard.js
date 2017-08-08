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
    console.log(application);
    let advisorRef = firebase.database().ref('Advisor');
    let userRef = firebase.database().ref('Users');
    advisorRef.push({
      email:application.contactEmail,
      name:application.contactName,
      team:application.teamName
    });
    userRef.push({
      email:application.contactEmail,
      role:"advisor",
    });
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
      return(
        <div>
          <h3>{key}</h3>
          <p>{this.state.application[key]}</p>
        </div>
      );
    })

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
                {data}
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