import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

const style = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  edit : {
    width:'50%'
  },

}


class MultipleChoice extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            <TextField
              floatingLabelText="Question"
              underlineFocusStyle={style.underlineStyle}
              floatingLabelStyle={style.floatingLabelStyle}
              fullWidth={true}
            />
          </div>
          <div className="panel-body">
            
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MultipleChoice;