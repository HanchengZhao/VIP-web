import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionCard from './QuestionCard';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import { observer } from "mobx-react";
import PeerReviewStore from '../../stores/PeerReviewStore';
import MuiButton from '../MuiButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

import Primary from '../../Theme';

const style = {
  width: 'auto',
};
const questionTypes = ["Score", "Comment", "Checkbox", "Number"];

const Props = {
  questionArray: [{
        id: 1,
        type: 'Score',
        data:{
          from: 1,
          to: 6,
          low: "low",
          high: "high",
          question: "How do you think of this?"
        }
      }, {
        id: 2,
        type: 'Comment',
        data:{
          question:"Please provide some feedbacks.",
          type:"Short Answer",
          require: false
        }
      }, {
        id: 3,
        type: "CheckBox",
        data:{
          question:"Please choose everyone you know",
          options: ['Andy','Bob']
        }
      }, {
        id: 4,
        type: 'Number',
        data:{
          question:"Please give me a number",
          require: false
        }
      }]
}

@DragDropContext(HTML5Backend)
@observer
export default class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.moveQuestion = this.moveQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.publish = this.publish.bind(this);
    this.state = {
      questionTypes:questionTypes,
      value: 0,
      questions: Props.questionArray
    };
  }

  addQuestion() {
    // let questions = this.state.questions;
    // let question = this.state.questionComponents[this.state.value];
    // questions.push(question);
    // this.setState({
    //   questions:questions
    // });
    let length = this.state.questions.length;
    let type = this.state.questionTypes[this.state.value];
    let initialData = {}
    if (type === 'Score') {
      initialData = {
        from: 1,
        to: 5,
        low: "low",
        high: "high",
        question: ""
      }
    } else if (type === 'Comment') {
      initialData = {
        question:"",
        type:"Short Answer",
        require: false
      }
    } else if (type === 'CheckBox') {
      initialData = {
        question:"",
        options: ['1','2']
      }
    } else {
      initialData = {
        question:"",
        require: false
      }
    }

    this.setState(update(this.state, {
      questions:{
        $push: [{
          id: length+1,
          type: type,
          data: initialData
        }]
      }
    })
    )}

  changeEditMode() {
    PeerReviewStore.switchEditMode();
  }

  handleChange(e, index, value) {
    this.setState({
      value
    });
  }

  moveQuestion(dragIndex, hoverIndex) {
    const { questions } = this.state;
    const dragQue = questions[dragIndex];

    this.setState(update(this.state, {
      questions: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragQue],
        ],
      },
    }));
  }

  removeQuestion(index) {
    this.setState(update(this.state, {
      questions: {
        $splice:[[index, 1]]
      },
    }));
  }

  updateQuestion(index, data) {
    this.setState(update(this.state, {
      questions: {
        [index]:{
          data:{
            $set:data
          }
        }
      },
    }));
  }

  publish(){
    console.log(this.state.questions)
  }
  render() {
    const { questions } = this.state;
    let questionTypes = this.state.questionTypes.map((value, index) =>{
      return <MenuItem primaryText = {value} value = {index} key = {index} />
    });
    return (
      <div style={style}>
        <MuiThemeProvider>
          <div>
            <SelectField value = {this.state.value} onChange = {this.handleChange}>
              {questionTypes}
            </SelectField>
            <FlatButton label = "+ Add" onClick = {this.addQuestion} style = {{verticalAlign:"top"}}/>
            {PeerReviewStore.EditMode
              ?<FlatButton label = "Preview Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"top", float:'right'}}/>
              :<FlatButton label = "Edit Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"top", float:'right'}}/>
            }
          </div>
        </MuiThemeProvider>
        {questions.map((question, i) => (
          <QuestionCard
            key={question.id}
            index={i}
            id={question.id}
            type={question.type}
            data={question.data}
            moveQuestion={this.moveQuestion}
            removeQuestion={this.removeQuestion}
            updateQuestion={this.updateQuestion}
          />
        ))}
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <RaisedButton label = "Publish"  backgroundColor = {Primary} onClick={this.publish} />
        </MuiThemeProvider>
      </div>
    );
  }
}
