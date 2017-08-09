import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

const styles = {
  dropDown:{
    width: '100px'
  },
  radioButton:{
    display:"inline-block", 
    width: '100px'
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

const dummyPeers = [
  "John Doe",
  "Jane Doe",
  "Andy",
  "Bob",
  "Curry"
]


class Score extends Component {

  constructor() {
    super();
    this.state = {
      from: dummyProps.scale.from,
      to: dummyProps.scale.to,
      low: dummyProps.label.low,
      high: dummyProps.label.high,
      question: dummyProps.question,
      editMode: true,
      reviewMode: false,
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  handleFromChange(e, index, from){
    this.setState({
      from
    })
  }
  handleToChange(e, index, to){
    this.setState({
      to
    })
  }
  render() {
    let scales = [];
    for(let i = this.state.from; i <= this.state.to; i++){
      scales.push(i)
    }
    let RadioButtons = scales.map((scale) => 
      <RadioButton
        key={scale}
        style={styles.radioButton}
        value={scale}
        label={scale}
      />
    )
    let toMenu = [2,3,4,5,6,7,8,9].map((num) => 
      <MenuItem key={num} value={num} primaryText={num} />
    )
    console.log(toMenu)
    return (
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            
            {this.state.editMode &&
              <TextField
              floatingLabelText="Question"
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              fullWidth={true}
              defaultValue={this.state.question}
            />}
          </div>
          <div className="panel-body">
            <div style={{display:"inline-block"}}>
              <SelectField
                floatingLabelText="From"
                value={this.state.from}
                onChange={this.handleFromChange}
                style={styles.dropDown}
              >
                <MenuItem value={0} primaryText="0" />
                <MenuItem value={1} primaryText="1" />
              </SelectField>
              <SelectField
                floatingLabelText="To"
                value={this.state.to}
                onChange={this.handleToChange}
                style={styles.dropDown}
              >
                {toMenu}
              </SelectField>
            </div>
            <div>
            <b>{this.state.from}</b>&nbsp;:&nbsp; 
              <TextField
                hintText="Label(optional)"
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
              />
            <b>{this.state.to}</b>&nbsp;: &nbsp;
              <TextField
                hintText="Label(optional)"
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
              />
            </div>
            <Divider style={{margin:"20px",marginTop:"20px"}}/>
            <div style={{display:"inline"}}>
              {this.state.low}&nbsp;
            </div>
            <div style={{display:"inline"}}>
              <RadioButtonGroup name="scores" defaultSelected="not_light">
                {RadioButtons}
              </RadioButtonGroup>
            </div>
            <div style={{display:"inline"}}>
              &nbsp;{this.state.high}
            </div>
            
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Score;
