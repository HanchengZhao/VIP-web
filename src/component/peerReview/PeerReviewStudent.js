import React, { Component } from 'react';

import SelectPeers from './SelectPeers';
import QuestionPeers from './QuestionPeers';

import { observer } from "mobx-react";
import PeerReviewStore from '../../stores/PeerReviewStore';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

@observer
class PeerReviewStudent extends Component {
  constructor () {
    super();
    this.state = {
      
    }
  }

  render() {

    return (
      <div>
        <h2>PeerReview</h2>
        <SelectPeers />
      </div>    
    );
  }
}

export default PeerReviewStudent;