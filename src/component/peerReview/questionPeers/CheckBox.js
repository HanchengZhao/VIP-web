import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import FlatButton from 'material-ui/FlatButton';

import update from 'react/lib/update';
import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';
import _ from 'lodash';

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
  radioButton : {
    display:'inline-block',
    marginRight:'20px'
  },
}

const Props = {
  data: {
    options:['1', '2'],
    question:"Please choose one among them",
  },
  EditMode:true,
}

@observer
class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        options: Props.data.options,
        question: Props.data.question,
      },
      newOption:'',
      EvalMode:this.props.EvalMode,
      Answers:{},
      value:[]
    }
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount(){
    let value = [];
    let answers = {};
    let peer = this.props.peer.name;
    if(!!this.props.answers){
      value = this.props.answers[this.props.peer.name] || [];
    }
    if (this.props.data) {
      this.setState({
        data: {
          question: this.props.data.question,
          options: this.props.data.options,

        },
        value:value,
        Answers:this.props.answers
      });
    } 
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let value = [];
    let answers = {};
    if(!!nextProps.answers){
      value = nextProps.answers[this.props.peer.name] || [];
    }
    if (this.props.data) {
      this.setState({
        data: {
          question: nextProps.data.question,
          options: nextProps.data.options,

        },
        value:value,
        Answers:nextProps.answers
      });
    } 
  }

  handleCheck(e) {
    let Answers = this.state.Answers;
    let value = parseInt(e.target.value);
   if(Answers[this.props.peer.name] === '') {
      //Answers Exists but no answers for peer.name
      Answers[this.props.peer.name] = [value];
    }
    else if(Answers[this.props.peer.name].includes(value)){
      //remove
      Answers[this.props.peer.name].splice(Answers[this.props.peer.name].indexOf(value));
    }
    else{
      //add
      Answers[this.props.peer.name].push(value);
    }
    this.setState({
      Answers:Answers,
    },
    ()=>{this.props.handleChange(this.state.Answers)});
  }

  render() {
    let checkboxes = this.state.data.options.map((value,index) => (
        <div style = {style.radioButton} key = {index}>
          <Checkbox value = {index} label = {value} style = {{width:'200px', display:'inline-block'}} defaultChecked = {this.state.value.indexOf(index) !== -1} onCheck = {this.handleCheck}/>
        </div>
    ));    
    return(
      <div>
        <div>
          <MuiThemeProvider>
            <div style={{display:"inline"}}>
              {checkboxes}
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default CheckBox;