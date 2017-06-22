import React, { Component } from 'react';

//Material UI ELEMENTS
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Style sheet
import '../../style/projectpage.css';

//Firebase init
import firebase from "../../firebase";

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      topics: [],
      sections: [],
      fbkey: this.props.match.params.projectId
    };
  }

  componentDidMount() {
    
    firebase.database().ref(`Teams/${this.state.fbkey}`).once('value').then( (snap) => {
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
        sections: sections,
        image: snap.val().logo



      });
    });
  }
  render() {
    let topics = this.state.topics.map((topics,index) =>
      <li key={index}>{topics}</li>
    )
    let sections = this.state.sections.map((sections,index) =>
      <div key={index}>
        <h4>{sections.title}</h4>
        {sections.content}
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

export default ProjectPage;
