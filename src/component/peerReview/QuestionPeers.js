import React, { Component } from 'react';

import '../../style/QuestionPeers.css';

import peerReviewStore from '../../stores/PeerReviewStore';

import CheckBox from './questionType/CheckBox';
import Comment from './questionType/Comment';
import Number from './questionType/Number';
import Score from './questionType/Score';
import MuiButton from '../MuiButton';

import userStore from '../../stores/UserStore';

import firebase from '../../firebase';

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
      Answers:{},
      complete:true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.checkCompleted = this.checkCompleted.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if(this.props){
      let questions = [];
      let next = 'next';
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
        if(data['formData'][0]['data'].required){
          next = 'next disabled';
        }
        this.setState({
          peers:this.props.peers,
          questions:data,
          date:date,
          next:next
        });
      }
    }
  }

  submit() {
    let Answers = this.state.Answers;
    let nameOfStudent = this.props.name;
    let data = {
      [nameOfStudent]:{}
    };
    Object.keys(Answers).forEach((Question) => {
      Object.keys(Answers[Question]).forEach((name) =>{
        if(typeof data[nameOfStudent][name] === 'undefined'){
          data[nameOfStudent][name] = {}
        }
        data[nameOfStudent][name][Question] = {
          "Answer":Answers[Question][name],
          "Question":this.state.questions['formData'][Question]
      };
      });
    });
    firebase.database().ref("Reviews").push(data);
    console.log(data);
  
  }

  checkCompleted() {
    let index = this.state.index;
    let Answers = this.state.Answers;
    let Peers = this.state.peers;
    let temp = [];
    Peers.forEach((peer)=>{
      if(!Answers[index]){
        temp.push(false);
      }else if(!Answers[index][peer.name]){
        temp.push(false);
      }else{
        temp.push(true);
      }
    });
    return !temp.includes(false);
  }

  handleNext() {
    let index = this.state.index;
    let questions = this.state.questions['formData'];
    this.checkCompleted();
    console.log(this.checkCompleted());
      if(index<questions.length-1){
        if(!questions[index]['data'].required || this.checkCompleted()){
          index = index +1;
          if(!questions[index]['data'].required){
            console.log("RAN");
          this.setState({
            index:index,
            previous:'previous'
          });
        }else if(!questions[index-1]['data'].required || this.checkCompleted()){
          console.log('ran');
          this.setState({
            next:'next disabled',
            index:index,
            previous:'previous'
          });
        }
        if (index === questions.length-1){
          this.setState({next:'next disabled'});
        }
      }
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

  handleChange(answer) {
    let Answers = this.state.Answers;
    Object.keys(answer).forEach((key)=>{
      if(!Answers[this.state.index]){
        Answers[this.state.index] = {};
      }
      Answers[this.state.index][key] = answer[key];
    });
    this.setState({Answers:Answers},
    ()=>console.log(this.state.Answers));
    if(this.checkCompleted()) {
      this.setState({
        next:'next'
      });
    }else{
      this.setState({
        next:'next disabled'
      });
    }
  }

  getQuestionComponent = (type, data, getData, peer, props) => {
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
            {this.state.complete
              ?<li className = "next"><button className="btn btn-success" onClick={this.submit} style ={{borderRadius:'40px', float:'right'}}>submit</button></li>
              :<li className={this.state.next}><a href="#" onClick={this.handleNext}>Next<span aria-hidden="true">&rarr;</span></a></li>
            } 
          </ul>
        </nav>
        </div>
        }
      </div>
    );
  }
}

export default QuestionPeers;