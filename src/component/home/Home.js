import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import AnnouncementList from '../announcements/AnnouncementList';
import {Secondary} from '../../Theme';
class Home extends Component {
  render() {
    return(
      <div>
        <h1 style = {{textAlign:'center', color:Secondary}}>Announcements</h1>
        <AnnouncementList pageLength = {2} />
        <h1 style = {{textAlign:'center', color:Secondary}}>Active Projects</h1>
        <ProjectList />
      </div>
    );
  }
}

export default Home;