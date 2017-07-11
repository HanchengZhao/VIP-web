import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import {debounce} from 'throttle-debounce';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import firebase from '../../firebase';
import userStore from '../../stores/UserStore';

const defaultAnnouncement = {
  title: `This is header`,
  content: `> This is body`
}

const styles = {
  underlineStyle: {
    borderColor: "#ffc425",
  },
  floatingLabelStyle: {
    color: grey500,
  },
};

const announcementPath = "Announcement/admin"

class AnnouncementCreate extends Component {
  constructor(){
    super();
    this.state = {
      title: defaultAnnouncement.title,
      content: defaultAnnouncement.content,
      dialogOpen: false
    }
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.publish = this.publish.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  debounceTitle = debounce(300, (e) => {
    this.setState({
      title: e.target.value
    })
  })
  debounceContent = debounce(300, (e) => {
    this.setState({
      content: e.target.value
    })
  })

  titleChange(e) {
    e.persist()
    this.debounceTitle(e)
  }

  contentChange(e) {
    e.persist()
    this.debounceContent(e)
  }

  publish(){
    let date = new Date().valueOf()
    let anmtRef = firebase.database().ref().child(announcementPath)
    anmtRef.push({
      title: this.state.title,
      content: this.state.content,
      author: userStore.displayName,
      date: date
    })
    this.setState({
      dialogOpen: true
    })
  }

  handleClose(){
    this.setState({
      dialogOpen:false,
    });
  }


  render(){
    const actions = [
      <FlatButton
        label="Got it"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <MuiThemeProvider>
          <div className="panel panel-default">
            <div className="panel-heading">
              <TextField
                hintText="Please enter title here"
                floatingLabelText="Announcement title"
                floatingLabelFixed={true}
                onChange={this.titleChange}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                fullWidth={true}
              />
            </div>
            <div className="panel-body">
              <TextField
              hintText="You can use markdown syntax here to edit annoucement content"
              floatingLabelText="*bold* _italics_ ~strike~ `code` ```preformatted``` >quote"
              multiLine={true}
              rows={4}
              onChange={this.contentChange}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              fullWidth={true}
            />
            </div>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "Publish"  backgroundColor = "#ffc425" onClick={this.publish} style = {{float: "right", margin:"10px"}} />
            </MuiThemeProvider>
          </div>
        </MuiThemeProvider>
        <h4>Preview:</h4>
        <div className="panel panel-default">
          <div className="panel-heading"><h4>{this.state.title}</h4> </div>
          <div className="panel-body">
            <ReactMarkdown source={this.state.content} renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}/>
          </div>
        </div>
        <MuiThemeProvider>
         <Dialog
            title="Announcement Published!"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
          >
            You can go to the annoucement page to check
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default AnnouncementCreate;
