import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import firebase from '../../firebase'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Primary, {university, validDomain} from '../../Theme';
import {checkEmpty} from './../../Validation';
import MuiTable from '../MuiTable';
import PropTypes from 'prop-types';


const notIncluded = ['sections', 'title', 'logo', 'project Link'];

class EditProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
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
    let fbRef = firebase.database().ref(`Student/${this.state.project.teamName.split(' ').join('')}`);
    fbRef.on('value', (snap) => {
      this.setState({
        Students:snap.val()
      });
    });
    projectKeys.forEach((i) => {
      error[i] = ''
    });
    this.setState({error:error,
    notIncluded});
  }

  handleChange(e) {
    let id = e.target.id;
    let project = this.state.project;
    project[id] = e.target.value;
    this.setState({
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
    let empty = checkEmpty(this.state.error, this.state.project, this.state.project.leadFacultyEmail, notIncluded);
    console.log(empty);
    if(empty[0]) {
      firebase.database().ref(`Teams/${this.state.fbKey}`).set(this.state.project);
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
      if (notIncluded.includes(key) && key!=="project Link"){
        return null;
      }
      if(key==='leadFacultyEmail') {
        return(
          <div key = {key}>
          <h3>{key}</h3>
          <TextField id = {key} errorText = {this.state.emailMessage} defaultValue = {this.state.project[key]} multiLine = {true} onChange = {this.handleChange} rows = {1} fullWidth = {true}
           underlineStyle={{borderColor:Primary}} /> 
        </div>
        );
      }
  
      return(
        <div key = {key}>
          <h3>{key}</h3>
          <TextField id = {key} errorText = {this.state.error[key]} defaultValue = {this.props.project[key]} multiLine = {true} onChange = {this.handleChange} rows = {1} fullWidth = {true}
          underlineStyle={{borderColor:Primary}} /> 
        </div>
      );
    });

    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Card expandable = {true} expanded={this.state.open}>
              <CardTitle title = {this.props.project.teamName} subtitle = {this.props.project.subtitle} />
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