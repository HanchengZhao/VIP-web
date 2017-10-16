import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import update from 'react/lib/update';
import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';

const Props = {
  question:"What's on your mind today?",
  EditMode:true,
  PreviewMode:false,
  required: true
}

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

@observer
class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        question: Props.question,
        required:Props.required
      },
      number:0,
      PreviewMode:Props.PreviewMode,
      EvalMode:this.props.EvalMode,
      required:Props.required,
      PreviewMode:Props.PreviewMode,
      Answers:{}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: {
          required: this.props.data.required,
          question: this.props.data.question
        },
        Answers:{}
      })
    } 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        required: nextProps.data.required,
        question: nextProps.data.question
      },
      Answers:nextProps.answers
    })
  }

  handleChange(e) {
    let Answers = this.state.Answers;
    Answers[this.props.peer.name] = e.target.value;
    this.setState({
      Answers:Answers,
      number:e.target.value
    },
    ()=>{this.props.handleChange(this.state.Answers)});
  }


  handleNumberChange(e) {
    this.setState({
      number : e.target.value
    });
  }


  
  render() {
    let value;
    if(!!this.props.answers) {
      value = this.props.answers[this.props.peer.name];
    }else{
      value = this.state.number;
    }
    return(
      <div>
          <div>
            <MuiThemeProvider>
              <div  style = {style.edit}>
                <TextField type="number" value = {value} onChange = {this.handleChange} style = {{float:'left', width:'100px'}} id = "number" />
              </div>
            </MuiThemeProvider>
          </div>
        </div>
    );
  }
}

export default Number;