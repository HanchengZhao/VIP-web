import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import FlatButton from 'material-ui/FlatButton';

import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';

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
  answers:['There is no answer', '42'],
  question:"What's the meaning of life?",
  EditMode:true,
}

@observer
class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question:Props.question,
      answers : Props.answers,
      newAnswer:'',
      EvalMode:this.props.EvalMode
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    let id = e.target.id;
    this.setState({
      [id]:e.target.value
    })
  }

  handleAdd() {
    let answers = this.state.answers;
    answers.push(this.state.newAnswer);
    this.setState({
      answers:answers,
      newAnswer:''
    });
  }

  handleRemove(e) {
    let answers = this.state.answers;
    let index = e.target.id;
    answers.splice(index,1);
    this.setState({
      answers:answers
    });
  }

  render() {
    let RadioButtons = this.state.answers.map((value,index) => (
      <div style = {style.radioButton} key = {index}>
        <Checkbox value = {index} label = {value} style = {{width:'200px', display:'inline-block'}} />
        {(!this.state.EvalMode && PeerReviewStore.EditMode) &&
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
                value = {this.state.question}
                id = 'question'
                onChange = {this.handleChange}
                floatingLabelText="Question"
                underlineFocusStyle={style.underlineStyle}
                floatingLabelStyle={style.floatingLabelStyle}
                fullWidth={true}
              />
              :<h3>{this.state.question}</h3>
              }
            </div>
            <div className="panel-body">
              {PeerReviewStore.EditMode &&
              <div>
                <div className = "edit">
                  <TextField id = 'newAnswer' floatingLabelText="Add Answer" value = {this.state.newAnswer} onChange = {this.handleChange} underlineFocusStyle={style.underlineStyle} floatingLabelStyle={style.floatingLabelStyle}/>
                  <FlatButton label="Add" onClick = {this.handleAdd} />
                </div>
                <Divider style={{margin:"20px",marginTop:"20px"}} />
              </div>
              }
              <div style={{display:"inline"}}>
                {RadioButtons}
              </div>
            </div>
          </div>
        </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <div>
            {this.state.EvalMode && 
              <div style={{display:"inline"}}>
                  {RadioButtons}
              </div>
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MultipleChoice;