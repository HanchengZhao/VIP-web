import React, { Component } from 'react';
import userStore from '../../stores/UserStore';
//Material UI ELEMENTS
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiButton from '../MuiButton';
import Primary, {DeleteColor} from '../../Theme';
//Style sheet
import '../../style/projectpage.css';
import {Link} from 'react-router-dom';  
//Firebase init
import firebase from "../../firebase";

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image:'',
      subtitle: '',
      topics: [],
      sections: [],
      contactEmail:'',
      open:false,
      fbkey: this.props.match.params.projectId
    };
    this.handleSunset = this.handleSunset.bind(this);
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
        image: snap.val().logo,
        contactEmail:snap.val().contactEmail
      });
    });
  }

  handleSunset() {
    firebase.database().ref(`Teams/`).child(this.state.fbkey).once('value').then((snap) => {
      console.log(snap.val());
      firebase.database().ref('Project_Sunset').push(snap.val());
    });
    this.setState({open:true});
    firebase.database().ref(`Teams/${this.state.fbkey}`).remove();
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

     const actions = [
      <Link to = '/projects'>
      <FlatButton
        label="Close"
        primary={true}
      /></Link>,
    ];
    return (
      <div className = "row">
        <MuiThemeProvider>
          <div>
            <h1 className = "title">{this.state.title}</h1>
            <h3 className = "title">{this.state.subtitle}</h3>
            {this.state.image &&
            <img src = {this.state.image} style = {{float:'right'}}/>
            }
            <h3>Research Areas</h3>
            <div>{topics}</div>
            <div>{sections}</div>
            <h4>Contact email : <span>{this.state.contactEmail}</span></h4>
            {(userStore.authed === true) &&
              <div className="row">
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                <Link to={`${this.state.fbkey}/apply`}>
                  <RaisedButton label = "apply" id = "applyButton" backgroundColor = {Primary} style = {{float: "right", margin:"10"}}/>
                </Link>
                </div>
              </MuiThemeProvider>
              </div>
            }
            {(userStore.role === "admin")
                ?<MuiButton label = "Sunset Team" color = {DeleteColor} style = {{margin:"10"}} onClick = {this.handleSunset}/>
                :<h1 />
              }
              <Dialog
                title='This Team Has Been Successfully Sunset!'
                actions={actions}
                modal={true}
                open={this.state.open}>
              </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

export default ProjectPage;