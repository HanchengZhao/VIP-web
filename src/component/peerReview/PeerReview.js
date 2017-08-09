import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CheckBox from "./questionType/CheckBox";
import Comment from './questionType/Comment';
import MultipleChoice from './questionType/MultipleChoice';
import Score from "./questionType/Score";

import MuiButton from '../MuiButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const questionTypes = ["Score", "Comment", "Multiple Choice", "Number"]

class PeerReview extends Component {
  constructor () {
    super();
    this.state = {
      questionTypes:questionTypes,
      questionComponents:[<Score />, <Comment/>, <MultipleChoice/>, ],
      questions:[<Comment/>, <MultipleChoice/>, <Score />],
      value:0
    }
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    let questions = this.state.questions;
    let question = this.state.questionComponents[this.state.value];
    console.log(question);
    questions.push(question);
    this.setState({
      questions:questions
    });
    console.log(this.state.questions);   
  }

  handleChange(e, index, value) {
    this.setState({
      value:value
    });
  }

  render() {
    let questions = this.state.questions.map((key) => {
      return key;
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
          </div>
        </MuiThemeProvider>
        {questions}
        {/* <CheckBox /> */}
        <MuiButton label = "Done"/>
      </div>    
    );
  }
}

export default PeerReview;