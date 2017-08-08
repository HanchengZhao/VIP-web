import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiButton from '../MuiButton';
import RaisedButton from 'material-ui/RaisedButton';

class ApprovalPopup extends Component {
  constructor() {
    super();
  }

  render() {
    const actions = [
      <MuiButton
        label="No"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <MuiButton
        label="Yes"
      />,
    ];
      return(
        <Dialog 
        title="Are you sure you want to deny this application?"
        actions={actions}
        />
      );
  }
}

export default ApprovalPopup;