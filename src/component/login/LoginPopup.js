import React, { Component } from 'react';

//Material UI
import Dialog from 'material-ui/Dialog';
import MuiButton from './MuiButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';

import styles from '../style/Header.css';

var Color = "#ffc425";

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: this.props.open
      };

      this.handleClose = this.handleClose.bind(this);
    }


  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    return(
      <div>
        <MuiThemeProvider >
          <div>
            <Dialog
              title="Login"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <MuiButton label="Admin Login"/>
              <MuiButton label="Advisor Login" />
              <MuiButton label="student Login"/>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }     
}

export default Login;