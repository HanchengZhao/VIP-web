import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CheckBox from "./questionType/CheckBox";
import Comment from './questionType/Comment';
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
      questions:[<Comment />]
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
        {/* <MuiThemeProvider>
          <FloatingActionButton mini = {true} secondary={true} iconStyle={{Color: '#FF0000'}} style = {{float:'right'}}>
            <ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider> */}
        <MuiButton label = "Done"/>
      </div>    
    );
  }
}

export default PeerReview;