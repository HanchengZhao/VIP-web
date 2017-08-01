import React, { Component } from 'react';

//Material UI
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import style from './Theme.js';
import Primary, {Secondary} from '../Theme.js';

class MuiButton extends Component {

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <RaisedButton label = {this.props.label} onClick = {this.props.onClick} style = {this.props.style} backgroundColor = {this.props.color || Primary} />
      </MuiThemeProvider>
    )
  }
}

export default MuiButton;