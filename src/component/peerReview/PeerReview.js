import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/highlight-off';

import Comment from './questionType/Comment';
import MultipleChoice from './questionType/MultipleChoice';
import Number from './questionType/Number';
import Score from "./questionType/Score";

import SelectPeers from './SelectPeers';
import QuestionPeers from './QuestionPeers';

import { observer } from "mobx-react";
import PeerReviewStore from '../../stores/PeerReviewStore';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const questionTypes = ["Score", "Comment", "Multiple Choice", "Number"];

@observer
class PeerReview extends Component {
  constructor () {
    super();
    this.state = {
      questions:[<Comment EditMode = {PeerReviewStore.EditMode}/>, <MultipleChoice/>, <Score/>, <Number/>],
      questionTypes:questionTypes,
      questionComponents:[<Score/>, <Comment/>, <MultipleChoice/>, <Number /> ],
      value:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
  }

  addQuestion() {
    let questions = this.state.questions;
    let question = this.state.questionComponents[this.state.value];
    questions.push(question);
    this.setState({
      questions:questions
    });
  }

  changeEditMode() {
    PeerReviewStore.EditMode = !(PeerReviewStore.EditMode);
  }

  handleRemove(index) {
    let questions = this.state.questions;
    questions.splice(index,1);
    this.setState({
      questions:questions
    });
  }

  handleChange(e, index, value) {
    this.setState({
      value:value
    });
  }

  render() {
    let questions = this.state.questions.map((key, index) => {
      return (
      <div key = {index}>
        <MuiThemeProvider>
          <IconButton onClick = {() => this.handleRemove(index)} style = {{float:'right'}}>
            <RemoveIcon />
          </IconButton>
        </MuiThemeProvider>
        {key}
      </div>);
    });
    let questionTypes = this.state.questionTypes.map((value, index) =>{
      return <MenuItem primaryText = {value} value = {index} key = {index} />
    });
    return (
      <div>
        <h2>PeerReview</h2>
        <MuiThemeProvider>
          <div>
            <SelectField value = {this.state.value} onChange = {this.handleChange}>
              {questionTypes}
            </SelectField>
            <FlatButton label = "+ Add" onClick = {this.addQuestion} style = {{verticalAlign:"top"}}/>
            {PeerReviewStore.EditMode
              ?<FlatButton label = "Preview Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"top", float:'right'}}/>
              :<FlatButton label = "Edit Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"top", float:'right'}}/>
            }
          </div>
        </MuiThemeProvider>
        {questions}
        {/* <CheckBox /> */}
        <SelectPeers />
      </div>    
    );
  }
}

export default PeerReview;