import React, { Component } from 'react';
import MuiButton from '../MuiButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Primary, {NavColor} from '../../Theme';
import {Link, Route, Redirect} from 'react-router-dom';

class StudentPage extends Component {

  constructor() {
    super();
    this.state = {
      GateKeeper:true
    }
  }

  render = () => {
    return(
      <div>
         <div>
          <MuiThemeProvider>
            <Tabs inkBarStyle ={{color:Primary}}>
              <Tab label = "Peer Review" style={{backgroundColor:NavColor}} onActive={this.showProject}/>
              <Tab label = "Team Roster" style={{backgroundColor:NavColor}} onActive={this.showRoster}/>       
            </Tabs>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default StudentPage;