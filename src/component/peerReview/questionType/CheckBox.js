import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import FlatButton from 'material-ui/FlatButton';

import update from 'react/lib/update';
import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';
import _ from 'lodash';

const style = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  edit : {
    width:'50%'
  },
  radioButton : {
    display:'inline-block',
    marginRight:'20px'
  },
}

const Props = {
  data: {
    options:['1', '2'],
    question:"Please choose one among them",
  },
  EditMode:true,
}

@observer
class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        options: Props.data.options,
        question: Props.data.question,
      },
      newOption:'',
      EvalMode:this.props.EvalMode,
      Answers:{},
      value:[]
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount(){
    let value = [];
    let answers = {};
    let peer = this.props.peer.name;
    if(!!this.props.answers){
      value = this.props.answers[this.props.peer.name] || [];
    }
    if (this.props.data) {
      this.setState({
        data: {
          question: this.props.data.question,
          options: this.props.data.options,

        },
        value:value,
        Answers:this.props.answers
      });
    } 
  }

  componentWillReceiveProps(nextProps) {
    let value = [];
    let answers = {};
    if(!!nextProps.answers){
      value = nextProps.answers[this.props.peer.name] || [];
    }
    if (this.props.data) {
      this.setState({
        value:value,
        Answers:nextProps.answers
      });
    } 
  }

  handleOptionChange(e) {
    let text = e.target.value
    this.setState(update(this.state, {
      newOption:{
        $set: text
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data);
    });
  }

  handleQuestionChange(e) {
    let text = e.target.value
    this.setState(update(this.state, {
      data: {
        question:{
          $set: text
        }
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data);
    });
  }

  handleAdd() {
    this.setState(update(this.state, {
      data: {
        options:{
          $push: [this.state.newOption]
        }
      },
      newOption:{
        $set : ""
      }
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data);
    });
  }

  handleCheck(e) {
    let Answers = this.state.Answers;
    let value = parseInt(e.target.value);
    if(typeof Answers === 'undefined') {
      Answers = {};
      Answers[this.props.peer.name] = [value];
      console.log("Doesn't Exist");
    }
    else if(typeof Answers[this.props.peer.name] === 'undefined') {
      Answers[this.props.peer.name] = [value];
      console.log("Exist");
    }
    else if(Answers[this.props.peer.name].includes(value)){
      console.log('remove');
      Answers[this.props.peer.name].splice(Answers[this.props.peer.name].indexOf(value));
    }
    else{
      console.log('add');
      Answers[this.props.peer.name].push(value);
    }
    console.log(Answers);
    this.setState({
      Answers:Answers,
    },
    ()=>{this.props.handleChange(this.state.Answers)});
  }

  handleRemove(e) {
    let index = e.target.id;
    this.setState(update(this.state, {
      data: {
        options:{
          $splice:[[index, 1]]
        }
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }

  render() {
    console.log(this.state.value);
    let checkboxes = this.state.data.options.map((value,index) => (
        <div style = {style.radioButton} key = {index}>
          <Checkbox value = {index} label = {value} style = {{width:'200px', display:'inline-block'}} defaultChecked = {this.state.value.indexOf(index) !== -1} onCheck = {this.handleCheck}/>
          {(PeerReviewStore.EditMode && !this.state.EvalMode) &&
            <i className = "glyphicon glyphicon-remove" id = {index} onClick = {this.handleRemove} style = {{display:'inline-block', cursor:'pointer',fontSize: '1.5em'}}/>
          }
        </div>
    ));    
    return(
      <div>
        {!this.state.EvalMode &&
        <MuiThemeProvider>
          <div className="panel panel-default">
            <div className="panel-heading">
              {PeerReviewStore.EditMode
              ?<TextField
                value = {this.state.data.question}
                id = 'question'
                onChange = {this.handleQuestionChange}
                floatingLabelText="Question"
                underlineFocusStyle={style.underlineStyle}
                floatingLabelStyle={style.floatingLabelStyle}
                fullWidth={true}
              />
            : <h3>{this.state.data.question}</h3>
            }
          </div>
          <div className="panel-body">
            {PeerReviewStore.EditMode &&
            <div>
              <div className = "edit">
                <TextField id = 'newAnswer' floatingLabelText="Add Option" 
                  value = {this.state.newOption} 
                  onChange = {this.handleOptionChange} 
                  underlineFocusStyle={style.underlineStyle} 
                  floatingLabelStyle={style.floatingLabelStyle}
                />
                <FlatButton label="Add" onClick = {this.handleAdd} />
              </div>
            </div>
            }
          </div>
          </div>
        </MuiThemeProvider>
        }
        <div>
          {this.state.EvalMode &&
          <MuiThemeProvider>
            <div style={{display:"inline"}}>
              {checkboxes}
            </div>
          </MuiThemeProvider>
          }
        </div>
      </div>
    );
  }
}

export default CheckBox;