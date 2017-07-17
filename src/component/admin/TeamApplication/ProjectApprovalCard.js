import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiButton from '../../MuiButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import firebase from "../../../firebase";

const style = {card : {margin:"20px"},
  actions: {marginLeft  : 'auto', marginRight : '1px', marginBottom:"30px", width:"200px"}, 
  button : {display:"inline-block !important", paddingRight:"20px"}};

const TeamApprovalPath = "Teams";
const TeamRejectPath = "RejectedTeams";
const secondary_color = "#8c1d40";

class ProjectApprovalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:this.props.Application.title,
      subtitle:this.props.Application.subtitle,
      image: this.props.Application.logo,
      sections:this.props.Application.sections,
      topics: this.props.Application.topics,
      desc: this.props.Application.desc,
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
  }
  
  removeApplication = () => {
    firebase.database().ref('TeamApplication').child(`${this.state.fbkey}`).remove();
  }

  handleAccept = () => {
    let fbRef = firebase.database().ref().child(TeamApprovalPath);
    fbRef.push(this.props.Application);
    this.removeApplication();
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
      <FlatButton label="Default" label="No" color={secondary_color} onClick = {this.handleClose}/>,
      <FlatButton label="Default" label="Yes" onClick = {this.handleReject}/>
    ];

    let sections = Object.keys(this.state.sections).map((uuid) =>
      <div key = {uuid}>
        <h3>{this.state.sections[uuid].title}</h3>
        {this.state.sections[uuid].content}
      </div>
    );

    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Card>
             <CardTitle title = {this.state.title} subtitle={this.state.subtitle} actAsExpander={true} showExpandableButton={true}/>
              <CardText>
               {this.state.desc}
              </CardText>
             <CardMedia expandable={true}>
                <img src={this.state.image} alt="Image Logo for team" />
              </CardMedia>
              <CardText expandable = {true}>
                <h3>Research Areas</h3>
                <ul>
                  {this.state.topics}
                </ul>
                {sections}
              </CardText>
              <CardActions style = {style.actions}>
                <MuiButton label = "Deny" color = {secondary_color} onClick = {this.sendPopup}/>
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