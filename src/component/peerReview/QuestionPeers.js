import React, { Component } from 'react';

import MultipleChoice from './questionType/MultipleChoice';
import Comment from './questionType/Comment';
import Number from './questionType/Number';
import Score from './questionType/Score';

let DummyProps = {
  question : 'Why?',
  Peers: [
    {name:'joe'},{name:'jimbob'},{name:'cletus'},{name:'vernan'}
  ]
}

const getQuestionComponent = (type, props) => {
  switch(type){
    case 'Score': return <Score EvalMode = {true} {...props}/>;
    case 'Comment' : return <Comment EvalMode = {true} {...props}/>;
    case 'Number' : return <Number EvalMode = {true} {...props} />;
    case 'Multiple Choice': return <MultipleChoice EvalMode = {true} {...props} />;
    default: return <div>Not A Proper Question Type</div>;
  }
}

class QuestionPeers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question:DummyProps.question,
      peers:this.props.peers
    }
  }

  render() {
    let question = getQuestionComponent('Multiple Choice', this.props.data);
    return(
      <div>
        <h2 style = {{textAlign:'center'}}>{this.state.question}</h2>
        <table className = 'table'>
          <thead>
            <tr>
              <th>Peers</th>
            </tr>
          </thead>
          <tbody>
            {this.state.peers &&
              this.state.peers.map((peer) => (
                <tr key = {peer.name}>
                  <th>{peer.name}</th>
                  <th>{question}</th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default QuestionPeers;