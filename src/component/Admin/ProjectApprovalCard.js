import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiButton from '../MuiButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import firebase from "../../firebase";

const style = {card : {margin:"20"},
actions: {marginLeft  : 'auto', marginRight : '1', marginBottom:"30", width:"200"}, button : {display:"inline-block !important", paddingRight:"20"}};


class ProjectApprovalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'Project Title',
      subtitle:'Project Subtitle',
      text:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
    }
  }

    componentDidMount() {
    firebase.database().ref('Teams/CloudCrypto').once('value').then( (snap) => {
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
    }


  render() {
    return(
      <div>
        <MuiThemeProvider>
          <Card>
            <CardTitle title = {this.state.title} subtitle={this.state.subtitle} actAsExpander={true} showExpandableButton={true}/>
            <CardText>
              Area for inital information
            </CardText>
            <CardMedia expandable={true}>
              <img src={"https://i.ytimg.com/vi/bbgWvrmmhmo/maxresdefault.jpg"} alt="" />
            </CardMedia>
            <CardText expandable = {true}>
              {this.state.text}
            </CardText>
            <CardActions style = {style.actions}>
              <MuiButton label = "Deny" color = "#8c1d40"/>
              <MuiButton label = "Approve" />
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }  
}

export default ProjectApprovalCard;