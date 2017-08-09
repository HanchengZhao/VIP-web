import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CheckBox from "./questionType/CheckBox";
import Comment from './questionType/Comment';
import MultipleChoice from './questionType/MultipleChoice';
import Number from './questionType/Number';
import Score from "./questionType/Score";

import MuiButton from '../MuiButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const questionTypes = ["score", "comment", "number", "multiple choices"]

class PeerReview extends Component {
  constructor () {
    super();
    this.state = {
      questions:[<Comment />, <MultipleChoice/>, <Score />, <Number />]
    }
  }

  render() {
    let questions = this.state.questions.map((key) => {
      return key;
    });
    return (
      <div>
        <h2>PeerReview</h2>
        {questions}
        <MuiButton label = "Done"/>
        {/* <CheckBox /> */}
        
      </div>    
    );
  }
}

export default PeerReview;