import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import AnnouncementList from '../announcements/AnnouncementList';
import {Secondary} from '../../Theme';

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
    fontSize: '1.3em',
    color: "#8C1D40"
  },
}
class Home extends Component {
  render() {
    return(
      <div>
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