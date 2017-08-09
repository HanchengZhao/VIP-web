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

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number:0,
      question:Props.question,
      EditMode:Props.EditMode,
      PreviewMode:Props.PreviewMode,
      required:Props.required
      
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }

  handleCheck(e, checked){
    this.setState({
      required: checked
    })
  }
  handleNumberChange(e) {
    this.setState({
      number : e.target.value
    });
  }

  handleTextChange(e) {
    this.setState({
      question:e.target.value
    });
  }

  
  render() {

    return(
      <div>
        <MuiThemeProvider>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.state.EditMode 
              ? <TextField
                  value = {this.state.question}
                  onChange = {this.handleTextChange}
                  floatingLabelStyle={style.floatingLabelStyle}
                  underlineFocusStyle = {style.underlineStyle}
                  floatingLabelText="Question"
                  fullWidth={true}
                />
              : <h3>{this.state.question}</h3>
              }
            </div>
            <div className="panel-body">
              <div  style = {style.edit}>
                <TextField type="number" value = {this.state.number} onChange = {this.handleNumberChange} style = {{float:'left', width:'100px'}} />
                {
                this.state.EditMode &&
                <Checkbox checked={this.state.required} label = "Check If Required" labelPosition="left" onCheck={this.handleCheck} style = {{ paddingTop:'15px', width:'180px', float:'right'}} /> 
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