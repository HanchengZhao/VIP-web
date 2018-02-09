import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import AnnouncementList from '../announcements/AnnouncementList';
import {Secondary} from '../../Theme';

import Card from 'material-ui/Card';
import logo from '../../assets/Vip_logo.png';

const style = {
  hr: {
    borderTop: "3px double #8c8b8b"
  },
  card: {
    paddingBottom: "10px",
    margin: "10px",
  },
  cardHeader: {
    textAlign : 'left',
    color: "#8C1D40",
    textAlign:'center',
    clear:'left'
  },
  font:{
    color:"#212121",
    clear:'left'
  },
  image:{
    float:'left',
    height:'70px',
  }
}
class Home extends Component {
  render() {
    return(
      <div>
        <Card style={style.card} zDepth = {0}>
        <img src = {logo} style = {style.image}/>
        <h1 style={style.cardHeader}>What is VIP?</h1>
          <p style = {style.font}>VIP at ASU capitalizes on the interests of undergraduates to engage in ongoing scientific research. Beginning as freshmen or sophomores, teams collaborate with upperclassmen and graduate students to address real problems guided by faculty scientists. Students earn academic or honors credits over 4 years.</p>
          <p style = {style.font}>VIP experience:
            <ul>
            <li style = {style.font}>Prepares students for the workplace or more advanced study</li>
            <li style = {style.font}>Facilitates in-depth experience and applied learning through multidisciplinary challenges</li>
            <li style = {style.font}>Enables broad understanding of the innovation process, and</li>
            <li style = {style.font}>Allows for mastery of critical thinking skills and exposure to a variety of skills and roles.</li>
          </ul>
          </p>
          <p style = {style.font}>To inquire about or join VIP areas listed below, follow links for teams below actively recruiting now! </p>
        </Card>
        <h1 style = {{textAlign:'center', color:Secondary}}>Announcements</h1>
        <AnnouncementList pageLength = {2} />
        <hr style={style.hr}/>
        <h1 style = {{textAlign:'center', color:Secondary}}>Active Projects</h1>
        <ProjectList />
      </div>
    );
  }
}

export default Home;