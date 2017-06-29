import React, { Component } from 'react';

//Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import style from './Theme.js';

class MuiButton extends Component {

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <RaisedButton label = {this.props.label} backgroundColor = {this.props.color ||"#ffc425"} />
      </MuiThemeProvider>
    )
  }
}

export default MuiButton;