import React, { Component } from 'react';

//Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends Component {
    state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    return(
      <div>
        <MuiThemeProvider>
          <div>
            <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
            <Dialog
              title="Login"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }     
}

export default Login;