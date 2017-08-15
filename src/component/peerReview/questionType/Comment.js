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
      value:0,
      question:Props.question,
      types:Props.types,
      EditMode:PeerReviewStore.EditMode,
      PreviewMode:Props.PreviewMode,
      required:Props.required
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // console.log('ran');
  }

  handleChange(event, index, value) {
    this.setState({value:value});
  }

  handleCheck(e, checked){
    this.setState({
      required: checked
    })
  }

  handleTextChange(e) {
    this.setState({
      question:e.target.value
    });
  }

  render() {
    let items = this.state.types.map((value, index)=> (
      <MenuItem key={value} value = {index} primaryText = {value} />
    ));
    
    return(
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            {PeerReviewStore.EditMode
            ?<TextField
              value = {this.state.question}
              onChange = {this.handleTextChange}
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              floatingLabelText="Question"
              fullWidth={true}
            />
            :<h3>{this.state.question}</h3>
            }
          </div>
          <div className="panel-body">
            {
              PeerReviewStore.EditMode &&
              <div style = {style.edit}>
                <SelectField value = {this.state.value} onChange = {this.handleChange} style = {{float:'left', width:"170px"}}>
                  {items}
                </SelectField>
                <Checkbox checked={this.state.required} label = "Check If Required" labelPosition="left" onCheck={this.handleCheck} style = {{ paddingTop:'15px', width:'180px', float:'right'}} /> 
              </div>
            }
            
            {this.state.value === 0
            ?<TextField 
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              fullWidth = {true}
              rows = {1}
              rowsMax={1}
              floatingLabelText = "Answer"
            />
            :<TextField
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
    );
  }
}

export default Comment;