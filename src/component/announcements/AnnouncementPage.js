import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// Material UI ELEMENTS
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiButton from '../MuiButton';
import { Redirect } from 'react-router-dom';
//Firebase init
import firebase from "../../firebase";
import userStore from '../../stores/UserStore';
import Primary,{ Secondary, DeleteColor} from '../../Theme';

const announcementPath = "Announcement/admin";

class AnnouncementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      content: '',
      author: '',
      fbkey: this.props.match.params.announcementId,
      open: false,
      redirectToAnnouncement: false,
      goToEditPage: false
    };
    this.sendEdit = this.sendEdit.bind(this);
    this.sendPopup = this.sendPopup.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClose(){
    this.setState({
      open:false,
    });
  }

  handleDelete(){
    firebase.database().ref(announcementPath).child(`${this.state.fbkey}`).remove();
    this.handleClose();
    this.setState({
      redirectToAnnouncement: true
    });
  }

  sendEdit(){
    this.setState({
      goToEditPage:true,
    });
  }

  sendPopup(){
    this.setState({
      open:true,
    });
  }

  componentDidMount() {
    
    firebase.database().ref(`${announcementPath}/${this.state.fbkey}`).once('value').then( (snap) => {

      this.setState({
        title: snap.val().title,
        content: snap.val().content,
        author: snap.val().author,
        date: new Date(snap.val().startDate).toDateString()
      });
    });
  }
  render() {
    const actions = [
      <FlatButton  label="Cancel" color={DeleteColor} onClick = {this.handleClose}/>,
      <FlatButton  label="Delete" onClick = {this.handleDelete}/>
    ];

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 style={{color:Secondary}}>{this.state.title}</h3>
          </div>
          <div className="panel-body">
            <h4><span className="label label-warning pull-right">{this.state.date} -- by {this.state.author}</span></h4>
            <ReactMarkdown source={this.state.content} renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}/>
          </div>
        </div>
        { userStore.role === "admin" &&
          <div>
            <div className="row" >
              <div style={{float: "right"}}>
                <MuiButton label = "Delete" color = {DeleteColor} onClick={this.sendPopup}/>
              </div>
              <div style={{float: "right"}}>
                <MuiButton label = "Edit" color = {Primary} onClick={this.sendEdit}/>
              </div>
            </div>
            <MuiThemeProvider>
              <Dialog 
                title="Sure to delete?"
                actions={actions}
                open = {this.state.open}
              />
            </MuiThemeProvider>
            {this.state.redirectToAnnouncement && (
              <Redirect to={"/announcement"}/>
            )}
            {this.state.goToEditPage && (
              <Redirect to={"/announcement/edit/" + this.state.fbkey}/>
            )}
          </div>
        }
        
      </div>
    )
  }
}

export default AnnouncementPage;