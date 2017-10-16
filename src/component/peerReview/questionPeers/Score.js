import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import update from 'react/lib/update';
import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';

const styles = {
  dropDown:{
    width: '100px'
  },
  radioButton:{
    display:"inline-block", 
    width: '70px',
    marginLeft: '35px'
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
  question: "",
  EditMode:true
}

const dummyPeers = [
  "John Doe",
  "Jane Doe",
  "Andy",
  "Bob",
  "Curry"
]

@observer
class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        from: dummyProps.scale.from,
        to: dummyProps.scale.to,
        low: dummyProps.label.low,
        high: dummyProps.label.high,
        question: dummyProps.question,
      },
      Answers:{},
      value:-1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    let value = -1;
    if(!!this.props.answers){
      value = this.props.answers[this.props.peer.name]
    }

    if (this.props.data) {
      this.setState({
        data: {
          from: this.props.data.from,
          to: this.props.data.to,
          low: this.props.data.low,
          high: this.props.data.high,
          question: this.props.data.question
        },
        value:value
      })
    } 
  }

  componentWillReceiveProps(nextProps) {
    let value = -1;
    if(!!nextProps.answers){
      value = nextProps.answers[nextProps.peer.name]
    }

    if (this.props.data) {
      this.setState({
        data: {
          from: nextProps.data.from,
          to: nextProps.data.to,
          low: nextProps.data.low,
          high: nextProps.data.high,
          question: nextProps.data.question
        },
        value:value
      })
    }
  }

  handleChange(e) {
    let Answers = this.state.Answers;
    let value = parseInt(e.target.value);
    Answers[this.props.peer.name] = value;
    this.setState({
      Answers:Answers,
      value:value
    },
    ()=>{this.props.handleChange(this.state.Answers)});
  }


  render() {
    let scales = [];
    for(let i = this.state.data.from; i <= this.state.data.to; i++){
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
    return (
      <div>
        <div>
          <MuiThemeProvider>
          <div className="row"  style={{display:"inline-block", marginLeft: "15px"}}>
                <span style={{float:"left"}}> <b>{this.state.data.low}&nbsp;</b></span>
                <RadioButtonGroup  name="scores" valueSelected = {this.state.value} style={{float:"left"}} onChange = {this.handleChange}>
                  {RadioButtons}
                </RadioButtonGroup>
                <span style={{float:"left"}}><b>&nbsp;{this.state.data.high}</b></span>
              </div>
          </MuiThemeProvider>
        </div>
        </div>
    );
  }
}

export default Score;
