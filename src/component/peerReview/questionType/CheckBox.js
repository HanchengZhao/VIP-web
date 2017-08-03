import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CheckBox extends Component {

  constructor() {
    super();
    this.state = {
      answers: [],
      question: '',
      option: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.value = '';
    this.setState((prevState) => ({
      answers: prevState.answers.concat(this.state.option),
      option: ''
    }));
  }

  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  }

  handleOptionChange(event) {
    this.setState({option: event.target.value});
  }

  removeOption(value) {
    this.state.answers.splice(value, 1);
    let answers = this.state.answers;
    this.setState({answers: answers});
  }

  render() {
    let CheckboxItem = this.state.answers.map((answers, index) =>

      <Card>
        <Checkbox label = {answers} value = {index} />
        <i className="glyphicon glyphicon-remove" onClick = {() => this.removeOption(index)} />
      </Card>
  )
    return (
      <MuiThemeProvider>
        <div>
          <TextField onChange = {this.handleQuestionChange} />
          <h1>{this.state.question}</h1>
          <div>{CheckboxItem}</div>
          <TextField onChange = {this.handleOptionChange} refs = "Option"/>
          <RaisedButton label = "Add" primary = {true} onClick = {this.handleSubmit} />
          <RaisedButton label = "Done Editing" backgroundColor="#a4c639" />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default CheckBox;
