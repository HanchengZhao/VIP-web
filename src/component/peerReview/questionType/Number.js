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
    width:'50%'
  },

}

@observer
class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        question: Props.question,
        required:Props.required
      },
      number:0,
      PreviewMode:Props.PreviewMode
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);

  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        data: {
          required: this.props.data.required,
          question: this.props.data.question
        }
      })
    } 
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

  handleNumberChange(e) {
    this.setState({
      number : e.target.value
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

    return(
      <div>
        <MuiThemeProvider>
          <div className="panel panel-default">
            <div className="panel-heading">
              {PeerReviewStore.EditMode 
              ? <TextField
                  value = {this.state.data.question}
                  onChange = {this.handleQuestionChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  floatingLabelText="Question"
                  fullWidth={true}
                />
              : <h3>{this.state.data.question}</h3>
              }
            </div>
            <div className="panel-body">
              <div  style = {style.edit}>
                <TextField type="number" value = {this.state.number} onChange = {this.handleNumberChange} style = {{float:'left', width:'100px'}} id = "number" />
                {
                PeerReviewStore.EditMode  &&
                <Checkbox checked={this.state.data.required} label = "Check If Required" labelPosition="left" onCheck={this.handleCheck} style = {{ paddingTop:'15px', width:'180px', float:'right'}} /> 
                }
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Number;