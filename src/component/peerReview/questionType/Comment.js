import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import Primary, {Secondary} from '../../../Theme';

import update from 'react/lib/update';
import { observer } from "mobx-react";
import PeerReviewStore from '../../../stores/PeerReviewStore';

const Props = {
  types:['Short Answer', 'Long Answer'],
  question:"What's on your mind today?",
  EditMode:true,
  PreviewMode:false,
  required: true
}

const style = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  edit : {
    width:'50%',
  },
}

@observer
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        question:Props.question,
        type:Props.types,
        required:Props.required
      },
      EditMode:PeerReviewStore.EditMode,
      EvalMode:this.props.EvalMode,
      PreviewMode:Props.PreviewMode,
      Answers:{},
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: {
          type: this.props.data.type,
          required: this.props.data.required,
          question: this.props.data.question
        }
      })
    } 
  }

  handleTypeChange(event, index, value) {
    this.setState(update(this.state, {
      data: {
        type:{
          $set: value
        }
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }

  handleChange(e) {
    let Answers = this.state.Answers;
    Answers[this.props.peer.name] = e.target.value;
    this.setState({Answers:Answers},
    ()=>{this.props.handleChange(this.state.Answers)});
  }

  handleCheck(e, checked){
    this.setState(update(this.state, {
      data: {
        required:{
          $set: checked
        }
      },
    }), () => { // run the function after state changed
      this.props.updateQuestion(this.props.index, this.state.data)
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
      this.props.updateQuestion(this.props.index, this.state.data)
    });
  }

  render() {
    let value = '';
    let items = Props.types.map((value, index)=> (
      <MenuItem key={value} value = {value} primaryText = {value} />
    ));
    if(!!this.props.answers){
      value = this.props.answers[this.props.peer.name];
    }
    return(
      <div>
      {!this.state.EvalMode &&
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            {PeerReviewStore.EditMode
            ?<TextField
              value = {this.state.data.question}
              onChange = {this.handleQuestionChange}
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              floatingLabelText="Question"
              fullWidth={true}
            />
            :<h3>{this.state.data.question}</h3>
            }
          </div>
          <div className="panel-body">
            {
              PeerReviewStore.EditMode &&
              <div style = {style.edit}>
                <SelectField value = {this.state.data.type} onChange = {this.handleTypeChange} style = {{float:'left', width:"170px"}}>
                  {items}
                </SelectField>
                <Checkbox checked={this.state.data.required} label = "Check If Required" labelPosition="left" onCheck={this.handleCheck} style = {{ paddingTop:'15px', width:'180px', float:'right'}} /> 
              </div>
            }
            
            {this.state.data.type === "Short Answer"
            ?<TextField
              onChange = {this.props.onChange}
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              fullWidth = {true}
              rows = {1}
              rowsMax={1}
              floatingLabelText = "Answer"
            />
            :<TextField
              onChange = {this.props.onChange}
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              rows = {4}
              rowsMax = {4}
              fullWidth = {true}
              floatingLabelText = "Answer"
              multiLine={true}
            />
            }
          </div>
          </div>
        </MuiThemeProvider>
      }
      <div>
        {this.state.EvalMode &&
          <MuiThemeProvider>
            <div>
            {this.state.data.type === "Short Answer"
                ?<TextField
                  defaultValue = {value}
                  onChange = {this.handleChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  fullWidth = {true}
                  rows = {1}
                  rowsMax={1}
                  floatingLabelText = "Answer"
                />
                :<TextField
                  defaultValue = {value}
                  onChange = {this.handleChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  rows = {4}
                  rowsMax = {4}
                  fullWidth = {true}
                  floatingLabelText = "Answer"
                  multiLine={true}
                />
                }
            </div>
          </MuiThemeProvider>
        }
        </div>
      </div>
    );
  }
}

export default Comment;