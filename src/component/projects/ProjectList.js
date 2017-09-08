import React, { Component } from 'react';
//Material UI ELEMENTS
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import ProjectCard from './ProjectCard';
import userStore from '../../stores/UserStore';
import AnnouncementList from '../announcements/AnnouncementList.js';
import artgineer from '../../assets/team_logo/artgineer.png';
import crypto from '../../assets/team_logo/crypto.png'
import deeplearning from '../../assets/team_logo/deeplearning.jpg';

import firebase from '../../firebase';

const style = {
  card: {
    paddingBottom: "10px",
    margin: "10px",
  },
  cardMedia:{
    height: "100px"
  },
  cardHeader: {
    textAlign : 'left',
    fontSize: '1.3em',
    color: "#8C1D40"
  },
  cardHeader2: {
    textAlign : 'left',
    fontSize: '1.3em',
    maxHeight: "100px",
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "140px"
  }
  
}

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      projects : ""
    }
  }

  componentDidMount(){
    const projectRef = firebase.database().ref('Teams');
    projectRef.once("value", (snap) => {
      this.setState({
        projects: snap.val()
      });
    })
  }

  render () {
    let projects = this.state.projects;
    return (
      <div>
        <AnnouncementList />  
        <p style={style.card}>
          <p style={style.cardHeader}><b>What is VIP?</b></p>
          <p>VIP at ASU capitalizes on the interests of undergraduates to engage in ongoing scientific research. Beginning as freshmen or sophomores, teams collaborate with upperclassmen and graduate students to address real problems guided by faculty scientists. Students earn academic or honors credits over 4 years.</p>
          <p>VIP experience:
            <ul>
             <li>Prepares students for the workplace or more advanced study</li>
             <li>Facilitates in-depth experience and applied learning through multidisciplinary challenges</li>
             <li>Enables broad understanding of the innovation process, and</li>
             <li>Allows for mastery of critical thinking skills and exposure to a variety of skills and roles.</li>
           </ul>
          </p>
          <p>To inquire about or join VIP areas listed below, follow links for teams below actively recruiting now! </p>
      </p>
      <p style={style.cardHeader}><b>Current Active Projects</b></p>
        <div className="row" style={style.card}>
          { this.state.projects
            ? (Object.keys(this.state.projects).map((uuid) =>
                <ProjectCard key={uuid} fbkey={uuid} project={projects[uuid]} />
              ))
            : (<h2>Loading...</h2>)
          }
        </div>
      </div>
      
    )
  }
}

export default ProjectList;