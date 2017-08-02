import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import firebase from '../../firebase'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Primary, {university, validDomain} from '../../Theme';
import {Validation, checkEmpty} from './../../Validation';
import MuiTable from '../MuiTable';
import PropTypes from 'prop-types';


const notIncluded = ['sections', 'title', 'logo'];

class EditProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      teamName: this.props.project.title,
      subtitle: this.props.project.subtitle,
      topics: this.props.project.topics,
      advisor: this.props.project.advisor,
      description: this.props.project.description,
      major: this.props.project.major,
      requirements: this.props.project.requirements,
      members: this.props.project.members,
      name: this.props.project.name,
      email: this.props.project.email,
      status: this.props.project.status,
      teamLogo: this.props.project.logo,
      sections:this.props.project.sections,
      fbKey : this.props.fbKey,
      error:{},
      open:false,
      dialog:false,
      Redirect:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.fbWrite = this.fbWrite.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
    this.openRoster = this.openRoster.bind(this);
  }

  componentDidMount() {
    let projectKeys = Object.keys(this.props.project);
    let error = {};
    let fbRef = firebase.database().ref(`Student/${this.state.teamName.split(' ').join('')}`);
    fbRef.on('value', (snap) => {
      this.setState({
        Students:snap.val()
      });
    });
    projectKeys.forEach((i) => {
      error[i] = ''
    });
    this.setState({error:error});
  }

  handleChange(e) {
    let id = e.target.id;
    let project = this.state.project;
    project[id] = e.target.value;
    this.setState({
      [id]:e.target.value,
      project:project
    });
  }

  handleClose() {
    this.setState({
      open:false,
      roster:true
    });
  }

  handleOpen() {
    this.setState((prevState, props) => (
      {open:!prevState.open,
      roster:false}
    ));
  }

  openRoster() {
    this.setState((prevState, props) => (
      {roster:!prevState.roster}
    ));
  }

  dialogClose() {
    this.setState({
      dialog:false,
      Redirect:true,
    });
  }

  dialogOpen() {
    this.setState({
      dialog:true
    }, this.handleClose());
  }

  fbWrite() {
    let empty = checkEmpty(this.state.error, this.state.project, this.state.email, notIncluded);
    if(empty[0]) {
      firebase.database().ref(`Teams/${this.state.fbKey}`).set({
        description:this.state.description,
        title:this.state.teamName,
        subtitle:this.state.subtitle,
        topics:this.state.topics,
        members:this.state.members,
        name:this.state.name,
        email:this.state.email,
        status:this.state.status,
        logo:this.state.teamLogo,
        major:this.state.major,
        requirements:this.state.requirements,
        advisor:this.state.advisor,
        sections: [
                    {'content':this.state.major,'title': 'Major'},
                    {'content':this.state.requirements,'title': 'Requirements'},
                    {'content':this.state.advisor,'title': 'Advisor'}],
      });
    this.dialogOpen();
    }
    this.setState({
      error:empty[1],
      emailMessage:empty[2],
    });
  }

  render() {
    let keys = Object.keys(this.props.project);
    let items = keys.map((key) => {
      if (notIncluded.includes(key)){
        return null;
      }
      if(key==='email') {
        return(
          <div key = {key}>
          <h3>{key}</h3>
          <TextField id = {key} errorText = {this.state.emailMessage} defaultValue = {this.state.project[key]} multiLine = {true} onChange = {this.handleChange} rows = {2} fullWidth = {true}
           underlineStyle={{borderColor:'#ffc425'}} /> 
        </div>
        );
      }
  
      return(
        <div key = {key}>
          <h3>{key}</h3>
          <TextField id = {key} errorText = {this.state.error[key]} defaultValue = {this.props.project[key]} multiLine = {true} onChange = {this.handleChange} rows = {2} fullWidth = {true}
          underlineStyle={{borderColor:'#ffc425'}} /> 
        </div>
      );
    });

    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Card expandable = {true} expanded={this.state.open}>
              <CardTitle title = {this.props.project.title} subtitle = {this.props.project.subtitle} />
              <CardText expandable = {true}>
                <div>
                  {items}
                  <div style = {{float:"right"}}>
                    <FlatButton label = "cancel" onClick = {this.handleClose}/>
                    <FlatButton label = "save" onClick = {this.fbWrite}/>
                  </div>
                </div>
                <br />
              </CardText>
              <CardActions>
                <Link to = {`/advisor/${this.state.fbKey}`}><FlatButton label = "Roster"/></Link>
                <FlatButton label = "Edit" onClick = {this.handleOpen}/>
              </CardActions>
            </Card>
            <Dialog
              title="Your Updates Have Been Saved!"
              open={this.state.dialog}
              onRequestClose={this.dialogClose}
              style = {{textAlign:"center"}}
            />
          </div>
        </MuiThemeProvider>
        {this.state.Redirect && (
        <Redirect to = "/dashboard" />)
        }
      </div>
    );
  }
}

EditProjectCard.propTypes = {
  Project: PropTypes.object
}

export default EditProjectCard;