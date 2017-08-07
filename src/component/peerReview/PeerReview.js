import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CheckBox from "./questionType/CheckBox";
import Score from "./questionType/Score";

const questionTypes = ["score", "comment", "number", "multiple choices"]

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
        {/* <CheckBox /> */}
        <Score />
      </div>    
    );
  }
}

export default PeerReview;