import React, { Component } from 'react';

import '../../style/QuestionPeers.css';

import peerReviewStore from '../../stores/PeerReviewStore';

import CheckBox from './questionType/CheckBox';
import Comment from './questionType/Comment';
import Number from './questionType/Number';
import Score from './questionType/Score';
import MuiButton from '../MuiButton';

let DummyProps = {
  question : 'Why?',
  Peers: [{name:'joe'},{name:'jimbob'},{name:'cletus'},{name:'vernan'}]
}

class QuestionPeers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions:'',
      peers:this.props.peers,
      index:0,
      next:'next',
      previous:'previous disabled',
      Answers:{}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  componentDidMount() {
    if(this.props){
      let questions = [];
      let data = ''
      let date = '';
      let defaultKey = '';
      Object.keys(this.props.questions[this.props.team]).forEach((key)=>{
        if(key == 'defaultForm') {
          defaultKey = this.props.questions[this.props.team][key];
        }
        console.log(this.props.questions[this.props.team][defaultKey]);
        data = this.props.questions[this.props.team][defaultKey];
      });
      if(data) {
        Object.keys(data).forEach((key)=>{
          if(key === 'data') {
            date = data[key];
          }else{
            questions.push(data[key]);
          }
        });
        this.setState({
          peers:this.props.peers,
          questions:data,
          date:date
        });
      }
    }
  }

  handleNext() {
    let index = this.state.index;
    let questions = this.state.questions['formData'];
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
    console.log(index);
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

  handleChange(answer) {
    console.log(answer);
    let Answers = this.state.Answers;
    Object.keys(answer).forEach((key)=>{
      if(!Answers[this.state.index]){
        Answers[this.state.index] = {};
      }
      Answers[this.state.index][key] = answer[key];
    });
    this.setState({Answers:Answers},
    ()=>console.log(this.state.Answers));
  }

  getQuestionComponent = (type, data, getData, peer, props) => {
    console.log(this.state.Answers[this.state.index]);
    switch(type) {
      case 'Score': return <Score EvalMode = {true} data = {data} handleChange = {getData} peer = {peer} answers = {this.state.Answers[this.state.index]} {...props}/>;
      case 'Comment' : return <Comment EvalMode = {true} data = {data} handleChange = {getData} peer = {peer} answers = {this.state.Answers[this.state.index]} {...props}/>;
      case 'Number' : return <Number EvalMode = {true} data = {data} handleChange = {getData} peer = {peer} answers = {this.state.Answers[this.state.index]} {...props} />;
      case 'CheckBox': return <CheckBox EvalMode = {true} data = {data} handleChange = {getData} peer = {peer} answers = {this.state.Answers[this.state.index]} {...props} />;
      default: return <div>Not A Proper Question Type</div>;
    }
  }

  render() {
    let question = this.state.questions['formData'];
    return(
      <div>
        {this.state.questions &&
        <div>
        <h2 style = {{textAlign:'center'}}>{question[this.state.index].data.question}</h2>
        <table className = 'table' id = "QuestionPeersTable">
          <thead>
            <tr>
              <th>Peers</th>
            </tr>
          </thead>
          <tbody>
            {this.state.peers &&
              this.state.peers.map((peer,index) => (
                <tr key = {index}>
                  <th>{peer.name}</th>
                  <th>{this.getQuestionComponent(question[this.state.index].type, question[this.state.index].data, this.handleChange, peer)}</th>
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
        }
      </div>
    );
  }
}

export default QuestionPeers;