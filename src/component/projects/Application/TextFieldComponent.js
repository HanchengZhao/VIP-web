import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { Link, Route } from 'react-router-dom';

class TextFieldComponent extends Component {
    constructor(props) {
      super(props);
      
    }
    render () {
      return (
        <MuiThemeProvider>
          <div>
            <TextField
                hintText={this.props.questionArray.hint}
                floatingLabelText={this.props.questionArray.text}
            />
          </div>
        </MuiThemeProvider>
      )
    }
}

export default TextFieldComponent;