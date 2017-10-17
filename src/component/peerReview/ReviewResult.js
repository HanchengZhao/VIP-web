import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Primary from '../../Theme';
import userStore from '../../stores/UserStore';

class ReviewResult extends Component {
  constructor() {
    super();
    this.state = {

    }
    //fetch the team options for admin and team for advisor
  }

  render() {
    
    return (
      <div>
        <h2>Peer review result</h2>
        
        <MuiThemeProvider>
          <div>
            
            {/* table */}
          </div>
        </MuiThemeProvider> 

      </div>
    );
  }
}

export default ReviewResult;