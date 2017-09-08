import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
//Material UI ELEMENTS
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Firebase init
import firebase from "../../firebase";

const announcementPath = "Announcement/admin";

class AnnouncementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      content: '',
      author: '',
      fbkey: this.props.match.params.announcementId
    };
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
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>{this.state.title}</h3>
        </div>
        <div className="panel-body">
          <h4><span className="label label-warning pull-right">{this.state.date} -- by {this.state.author}</span></h4>
          <ReactMarkdown source={this.state.content} renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}/>
        </div>
        </div>
    )
  }
}

export default AnnouncementPage;