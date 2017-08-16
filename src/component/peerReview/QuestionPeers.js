import React, { Component } from 'react';

import MultipleChoice from './questionType/MultipleChoice';
import Comment from './questionType/Comment';
import Number from './questionType/Number';
import Score from './questionType/Score';
import MuiButton from '../MuiButton';

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
const questions = [{
    id: 1,
    type: 'Score',
    data:{
      from: 1,
      to: 6,
      low: "low",
      high: "high",
      question: "How do you think of this?"
    }
  }, {
    id: 2,
    type: 'Comment',
    data:{
      question:"Please provide some feedbacks.",
      type:"Short Answer",
      require:false
    }
  }, {
    id: 3,
    type: "Multiple Choice",
    data:{
      question:""
    }
  }, {
    id: 4,
    type: 'Number',
    data:{
      question:""
    }
  }];

class QuestionPeers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question:DummyProps.question,
      peers:this.props.peers,
      index:0
    }
    this.switchQuestion = this.switchQuestion.bind(this);
  }

  switchQuestion() {
    let index = this.state.index;
    console.log('index:', index, 'questions', questions.length)
    if(index<questions.length-1){
      index = index +1;
      this.setState({index:index});
    }else if (index===questions.length-1){
      this.setState({submit:true});
    }
  }

  render() {
    let question = getQuestionComponent(questions[this.state.index].type, questions[this.state.index].data);
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
        {this.state.submit
        ?<MuiButton label = "Submit" onClick = {this.switchQuestion} />
        :<MuiButton label = "next question" onClick = {this.switchQuestion} />
        }
      </div>
    );
  }
}

export default QuestionPeers;