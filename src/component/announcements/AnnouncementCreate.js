import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import DatePicker from 'material-ui/DatePicker';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import {debounce} from 'throttle-debounce';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
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
  datePicker: getMuiTheme({
    datePicker: {
      selectColor: "#ffc425"
    },
    flatButton: {
      primaryTextColor: "#ffc425"
    }
  })
};
const rawPath = "Announcement_Raw_Data"
const announcementPath = "Announcement/admin"

class AnnouncementCreate extends Component {
  constructor(){
    super();
    this.state = {
      title: defaultAnnouncement.title,
      content: defaultAnnouncement.content,
      dialogOpen: false,
      startDate: new Date(),
      endDate: "",
      redirectToAnnouncement: false
    }
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.publish = this.publish.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
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
    const currentTime = new Date().getTime();
    let newAnnouncement = {
      title: this.state.title,
      content: this.state.content,
      author: userStore.displayName,
      startDate: this.state.startDate.valueOf(),
      endDate: this.state.endDate.valueOf()
    }
    if (this.state.startDate.getTime() > currentTime){ // scheduled for future
      let anmtRef = firebase.database().ref().child(rawPath)
      anmtRef.push(newAnnouncement)
    } else { // update for now
      let anmtRef = firebase.database().ref().child(announcementPath)
      anmtRef.push(newAnnouncement)
    }
    
    this.setState({
      dialogOpen: true
    })
  }

  handleClose(){
    this.setState({
      dialogOpen:false,
      redirectToAnnouncement: true
    });
  }

  disablePrevDates(startDate) { // prevent selecting endDate before startDate
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }
  handleChangeStartDate(event, date){
    this.setState({
      startDate: date,
    });
  };

  handleChangeEndDate = (event, date) => {
    this.setState({
      endDate: date,
    });
  };


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
        <div className="clearfix" style={{marginBottom: "10px"}}>
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
              
            </div>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={styles.datePicker}>
            <div>
              <DatePicker
                onChange={this.handleChangeStartDate}
                floatingLabelText="Start Date"
                defaultDate={this.state.startDate}
                container="inline"
              />
              <DatePicker
                onChange={this.handleChangeEndDate}
                floatingLabelText="End Date"
                container="inline"
                shouldDisableDate={this.disablePrevDates(this.state.startDate)}
              />
            </div>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <RaisedButton className="pull-right" label = "Publish"  backgroundColor = "#ffc425" onClick={this.publish} />
          </MuiThemeProvider>
        </div>
        {/* <br /> */}
        <h4>Preview:</h4>
        <div className="panel panel-default">
          <div className="panel-heading"><h4>{this.state.title}</h4> </div>
          <div className="panel-body">
            {/* <h4><span className="label label-warning pull-right">{this.state.startDate} -- by {userStore.displayName}</span></h4> */}
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
        {this.state.redirectToAnnouncement && (
          <Redirect to={"/announcement"}/>
        )}
      </div>
    )
  }
}

export default AnnouncementCreate;
