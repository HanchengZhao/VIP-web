import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

const styles = {
  radioButtons:{
    display: 'flex'
  },
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
};

const dummyProps = {
  scale: {
    from: 1,
    to: 5
  },
  label: {
    low: "low",
    high: "high"
  },
  question: "How do you think of this?"
}


class Score extends Component {

  constructor() {
    super();
    this.state = {
      scale: dummyProps.scale,
      label: dummyProps.label,
      question: dummyProps.question
    };

  }


  render() {
    let scales = [];
    for(let i = this.state.scale.from; i <= this.state.scale.to; i++){
      scales.push(i)
    }
    let RadioButtons = scales.map((s) => 
      <RadioButton
        style={{ width: 'auto' }}
        value= {s}
        label= {s}
      />
    )

    return (
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            <TextField
              floatingLabelText="Question"
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              fullWidth={true}
            />
          </div>
          <div className="panel-body">
            <RadioButtonGroup name="scores" defaultSelected="not_light" style={styles.radioButtons}>
              {RadioButtons}
            </RadioButtonGroup>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Score;
