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
  types:['Short Answer', 'Long Answer'],
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
    width:'50%',
  },
}

@observer
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        question:Props.question,
        type:Props.types,
        required:Props.required
      },
      EditMode:PeerReviewStore.EditMode,
      EvalMode:this.props.EvalMode,
      PreviewMode:Props.PreviewMode,
      Answers:{},
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: {
          type: this.props.data.type,
          required: this.props.data.required,
          question: this.props.data.question
        }
      })
    } 
  }


  componentWillReceiveProps(nextProps) {
    let answers = {};
    if (this.props.data) {
      this.setState({
        data: {
          question: nextProps.data.question,
          required: nextProps.data.required
        },
        Answers:nextProps.answers
      });
    } 
  }

  handleChange(e) {
    let Answers = this.state.Answers;
    Answers[this.props.peer.name] = e.target.value;
    this.setState({Answers:Answers},
    ()=>{this.props.handleChange(this.state.Answers)});
  }


  render() {
    let value = '';
    let items = Props.types.map((value, index)=> (
      <MenuItem key={value} value = {value} primaryText = {value} />
    ));
    if(!!this.props.answers){
      value = this.props.answers[this.props.peer.name];
    }
    return(
      <div>
          <MuiThemeProvider>
            <div>
            {this.state.data.type === "Short Answer"
                ?<TextField
                  defaultValue = {value}
                  onChange = {this.handleChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  fullWidth = {true}
                  rows = {1}
                  rowsMax={1}
                  floatingLabelText = "Answer"
                />
                :<TextField
                  defaultValue = {value}
                  onChange = {this.handleChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  rows = {4}
                  rowsMax = {4}
                  fullWidth = {true}
                  floatingLabelText = "Answer"
                  multiLine={true}
                />
                }
            </div>
          </MuiThemeProvider>
        </div>
    );
  }
}

export default Comment;