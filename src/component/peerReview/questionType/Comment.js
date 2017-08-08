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
  types:['Short Answer', 'Long Answer']
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

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      value:0,
      types:Props.types
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value:value});
  }

  render() {
    let items = this.state.types.map((value, index)=> (
      <MenuItem value = {index} primaryText = {value} />
    ));
    return(
      <MuiThemeProvider>
        <div className="panel panel-default">
          <div className="panel-heading">
            <TextField
              floatingLabelStyle={style.floatingLabelStyle}
              underlineFocusStyle = {style.underlineStyle}
              floatingLabelText="Question"
              fullWidth={true}
            />
          </div>
          <div className="panel-body">
            <div  style = {style.edit}>
              <SelectField value = {this.state.value} onChange = {this.handleChange} style = {{float:'left'}}>
                {items}
              </SelectField>
              <Checkbox label = "Check If Required" labelPosition="left" style = {{ paddingTop:'15px',width:'40%', float:'right'}} /> 
            </div>
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