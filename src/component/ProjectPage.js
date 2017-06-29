import React, { Component } from 'react';

//Material UI ELEMENTS
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Style sheet
import '../style/ProjectPage.css';
import * as firebase from 'firebase';

var data = "hello";


class Project extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      subtitle: '',
      topics: [],
      sections: []
    };
  }

  componentDidMount() {
    firebase.database().ref('data/').once('value').then( (snap) => {
      let topics = [];
      let sections = [];
      for(let i in snap.val().topics) {
        topics.push(snap.val().topics[i]);
      }

      for(let i in snap.val().sections) {
        sections.push(snap.val().sections[i]);
      }

      this.setState({
        title: snap.val().title,
        subtitle: snap.val().subtitle,
        topics: topics,
        sections: sections
      });
    });

    console.log(this.state.topics);
  }
  render() {
    let topics = this.state.topics.map((topics) =>
      <li>{topics}</li>
    )
    let sections = this.state.sections.map((sections) =>
      <div>
        <h4>{sections.title}</h4>
        <p>{sections.content}</p>
      </div>
    )
    return (
      <div className = "row">
        <MuiThemeProvider>
          <div>
            <h1 className = "title">{this.state.title}</h1>
            <h3 className = "title">{this.state.subtitle}</h3>
            <h3>Research Areas</h3>
            <div>{topics}</div>
            <div>{sections}</div>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "apply" id = "applyButton" backgroundColor = "#ffc425" style = {{float: "right", margin:"10"}}/>
            </MuiThemeProvider>
          </div>
      </MuiThemeProvider>
      </div>
  );
  }
}

export default Project;
