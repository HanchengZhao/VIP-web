import React, { Component } from 'react';



import CheckBox from './questionType/CheckBox';
import Comment from './questionType/Comment';
import Number from './questionType/Number';
import Score from './questionType/Score';
import MuiButton from '../MuiButton';

let DummyProps = {
  question : 'Why?',
  Peers: [{name:'joe'},{name:'jimbob'},{name:'cletus'},{name:'vernan'}]
}

const getQuestionComponent = (type, data, props) => {
  switch(type) {
    case 'Score': return <Score EvalMode = {true} data = {data} {...props}/>;
    case 'Comment' : return <Comment EvalMode = {true} data = {data} {...props}/>;
    case 'Number' : return <Number EvalMode = {true} data = {data} {...props} />;
    case 'CheckBox': return <CheckBox EvalMode = {true} data = {data} {...props} />;
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
    type: "CheckBox",
    data:{
      question:"",
      options:['1','2']
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
      questions:questions,
      peers:this.props.peers,
      index:0,
      next:'next',
      previous:'previous disabled'
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  componentDidMount() {
    if(this.props){
      let questions = [];
      let data = ''
      let date = '';
      Object.keys(this.props.questions[this.props.team]).forEach((key)=>{
        data = this.props.questions[this.props.team][key];
      });
      Object.keys(data).forEach((key)=>{
        if(key === 'date') {
          date = data[key];
        }else{
          questions.push(data[key]);
        }
      })
      this.setState({
        peers:this.props.peers,
        questions:questions,
        date:date
      });
    }
  }

  handleNext() {
    let index = this.state.index;
    let questions = this.state.questions;
    if(index<questions.length-1){
      index = index +1;
      this.setState({
        index:index,
        previous:'previous'
      });
    }
    if (index === questions.length-1){
      this.setState({next:'next disabled'});
    }
  }

  handlePrevious() {
    let index = this.state.index;
    if(index > 0) {
      index = index - 1;
      this.setState({
        index:index,
        next:'next'
      });
    }
    if(index === 0) {
      this.setState({previous:'previous disabled'});
    }
  }

  

  render() {
    let question = getQuestionComponent(this.state.questions[this.state.index].type, this.state.questions[this.state.index].data);
    return(
      <div>
        <h2 style = {{textAlign:'center'}}>{this.state.questions[this.state.index].data.question}</h2>
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
        <nav aria-label="...">
          <ul className="pager">
            <li className={this.state.previous}><a href="#" onClick={this.handlePrevious}><span aria-hidden="true">&larr;</span>Previous</a></li>
            <li className={this.state.next}><a href="#" onClick={this.handleNext}>Next<span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default QuestionPeers;