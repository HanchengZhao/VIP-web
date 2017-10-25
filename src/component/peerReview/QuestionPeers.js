import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../../style/QuestionPeers.css';

import peerReviewStore from '../../stores/PeerReviewStore';
import LinearProgress from 'material-ui/LinearProgress';

import CheckBox from './questionPeers/CheckBox';
import Comment from './questionPeers/Comment';
import Number from './questionPeers/Number';
import Score from './questionPeers/Score';
import MuiButton from '../MuiButton';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Primary from '../../Theme';


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
      complete:false,
      submited:false,
      open:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.checkCompleted = this.checkCompleted.bind(this);
    this.submit = this.submit.bind(this);
    this.checkCompleteRequired = this.checkCompleteRequired.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if(this.props){
      let questions = [];
      let Answers = {};
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
        for(let i = 0; i<data['formData'].length; i++){
          Answers[i] = {};
          this.props.peers.forEach((peer)=>{
            Answers[i][peer.name] = '';
          });
        }
        console.log(Answers);
        this.setState({
          peers:this.props.peers,
          questions:data,
          date:date,
          next:next,
          fbKey:defaultKey,
          Answers:Answers
        });
      }
    }
  }

  checkCompleteRequired() {
    let questions = this.state.questions;
    let Answers = this.state.Answers;
    let Peers = this.state.peers;
    let isComplete = [];
    let completed = {};
    for(let i=0;i<questions["formData"].length;i++){
      
      if(questions['formData'][i]["data"].required) {
        let temp = [];
        Peers.forEach((peer)=>{
          if(!Answers[i]){
            temp.push(false);
          }else if(!Answers[i][peer.name]){
            temp.push(false);
          }else{
            temp.push(true);
          }
        });
        
        completed[i] = temp;
      }
    }
    
    Object.keys(completed).forEach((answer)=>{
      if(completed[answer].includes(false)){
        isComplete.push(false);
      }else{
        isComplete.push(true);
      }
    });
    if(!isComplete.includes(false)){
      this.setState({
        complete:true
      });
    }else{
      this.setState({
        complete:false
      });
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
        if(Answers[Question][name].length === 0){
          data[nameOfStudent][name][Question] = ''
        }else{
          data[nameOfStudent][name][Question] = Answers[Question][name];
        } 
      });
    });
    firebase.database().ref(`Reviews/${this.props.team}/${this.props.semester}/${this.state.fbKey}`).update(data);
    firebase.database().ref(`SubmitedStudents/${this.props.team}/${this.props.semester}/${this.state.fbKey}`).push(userStore.email);
    this.setState({
      open:true
    });
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

  handleClose() {
    this.setState({
      open:false,
      submited:true
    });
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
    let index = this.state.index;
    let questions = this.state.questions["formData"];
    Object.keys(answer).forEach((key)=>{
      if(!Answers[this.state.index]){
        Answers[this.state.index] = {};
      }
      Answers[this.state.index][key] = answer[key];
    });
    this.setState({Answers:Answers},
    ()=>console.log(this.state.Answers));
    this.checkCompleteRequired();
    if(this.checkCompleted() || !questions[index]['data'].required) {
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
            {this.state.complete && this.state.index === question.length - 1
              ?<li className = "next"><button className="btn btn-success" onClick={this.submit} style ={{borderRadius:'40px', float:'right'}}>submit</button></li>
              :<li className={this.state.next}><a href="#" onClick={this.handleNext}>Next<span aria-hidden="true">&rarr;</span></a></li>
            } 
          </ul>
        </nav>
        <LinearProgress mode="determinate" value = {this.state.index} max = {question.length-1} color = {Primary}/>
        </div>
        }
        <MuiThemeProvider>
        <Dialog
          title="Sumbited"
          open={this.state.open}
          modal={false}
          onRequestClose={this.handleClose}
        />
        </MuiThemeProvider>
        {this.state.submited &&
          <Redirect to= "/dashboard"/>
        }
      </div>
    );
  }
}

export default QuestionPeers;