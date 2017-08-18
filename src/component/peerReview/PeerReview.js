import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/highlight-off';

import Comment from './questionType/Comment';
// import MultipleChoice from './questionType/MultipleChoice';
import CheckBox from './questionType/CheckBox';
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

import QuestionContainer from './QuestionContainer';

const questionTypes = ["Score", "Comment", "Checkbox", "Number"];

@observer
class PeerReview extends Component {
  constructor () {
    super();
    this.state = {
      
    }
  }

  render() {

    return (
      <div>
        <h2>PeerReview</h2>
        <QuestionContainer/>
        <SelectPeers />
      </div>    
    );
  }
}

export default PeerReview;