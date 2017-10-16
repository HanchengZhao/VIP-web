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
      reviewMode: false,
      EvalMode: this.props.EvalMode,
      Answers:{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleLowLabel = this.handleLowLabel.bind(this);
    this.handleHighLabel = this.handleHighLabel.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount(){
    if (this.props.data) {
      this.setState({
        data: {
          from: this.props.data.from,
          to: this.props.data.to,
          low: this.props.data.low,
          high: this.props.data.high,
          question: this.props.data.question
        }
      })
    } 
    
  }

  handleChange(e) {
    let Answers = this.state.Answers;
    Answers[this.props.peer.name] = e.target.value;
    this.setState({Answers:Answers},
    ()=>{this.props.handleChange(this.state.Answers)});
  }

  handleQuestionChange(e){
    let text = e.target.value
    this.setState(update(this.state, {
      data: {
        question:{
          $set: text
        }
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data)
    });
    
  }



  handleFromChange(e, index, from){
    this.setState(update(this.state, {
      data: {
        from:{
          $set:from
        }
      },
    }), () => {
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }

  handleHighLabel(e){
    this.setState(update(this.state, {
      data: {
        high:{
          $set:e.target.value
        }
      },
    }), () => {
      this.props.updateQuestion(this.props.index, this.state.data)
    });
    
  }

  handleLowLabel(e){
    this.setState(update(this.state, {
      data: {
        low:{
          $set:e.target.value
        }
      },
    }), () => {
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }

  handleToChange(e, index, to){
    this.setState(update(this.state, {
      data: {
        to:{
          $set:to
        }
      },
    }), () => {
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }
  render() {
    let scales = [];
    let value;
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
    let toMenu = [2,3,4,5,6,7,8,9].map((num) => 
      <MenuItem key={num} value={num} primaryText={num} />
    )
    if(!!this.props.answers) {
      value = this.props.answers[this.props.peer.name];
    }
    return (
      <div>
        {!this.state.EvalMode &&
        <MuiThemeProvider>
          <div className="panel panel-default">
            <div className="panel-heading">
              
              {PeerReviewStore.EditMode 
              ? <TextField
                  floatingLabelText="Question"
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  fullWidth={true}
                  value={this.state.data.question}
                  onChange={this.handleQuestionChange}
                />
              : <h3>{this.state.data.question}</h3>
              }
              
            </div>
            <div className="panel-body">
              { PeerReviewStore.EditMode  &&
                <div>
                  <div style={{display:"inline-block"}}>
                    <SelectField
                      floatingLabelText="From"
                      value={this.state.data.from}
                      onChange={this.handleFromChange}
                      style={styles.dropDown}
                    >
                      <MenuItem value={0} primaryText="0" />
                      <MenuItem value={1} primaryText="1" />
                    </SelectField>
                    <SelectField
                      floatingLabelText="To"
                      value={this.state.data.to}
                      onChange={this.handleToChange}
                      style={styles.dropDown}
                    >
                      {toMenu}
                    </SelectField>
                  </div>
                  <div>
                    <b>{this.state.data.from}</b>&nbsp;:&nbsp; 
                      <TextField
                        hintText="Label(optional)"
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        defaultValue={this.state.data.low}
                        onChange={this.handleLowLabel}
                      />
                    <b>{this.state.data.to}</b>&nbsp;: &nbsp;
                      <TextField
                        hintText="Label(optional)"
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        defaultValue={this.state.data.high}
                        onChange={this.handleHighLabel}
                      />
                  </div>
                </div>
                }
                

              
              
              <div className="row" style={{display:"inline-block", marginLeft: "15px"}}>
                <span style={{float:"left"}}> <b>{this.state.data.low}&nbsp;</b></span>
                <RadioButtonGroup name="scores" defaultSelected="not_light" style={{float:"left"}}>
                  {RadioButtons}
                </RadioButtonGroup>
                <span style={{float:"left"}}><b>&nbsp;{this.state.data.high}</b></span>
              </div>
            </div>
            </div>
          </MuiThemeProvider>
        }
        <div>
          {this.state.EvalMode &&
          <MuiThemeProvider>
          <div className="row"  style={{display:"inline-block", marginLeft: "15px"}}>
                <span style={{float:"left"}}> <b>{this.state.data.low}&nbsp;</b></span>
                <RadioButtonGroup  name="scores" defaultSelected = {value} style={{float:"left"}} onChange = {this.handleChange}>
                  {RadioButtons}
                </RadioButtonGroup>
                <span style={{float:"left"}}><b>&nbsp;{this.state.data.high}</b></span>
              </div>
          </MuiThemeProvider>
          }
        </div>
        </div>
    );
  }
}

export default Score;
