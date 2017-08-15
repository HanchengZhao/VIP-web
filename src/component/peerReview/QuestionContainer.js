import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionCard from './QuestionCard';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Primary from '../../Theme';

const style = {
  width: 'auto',
};

@DragDropContext(HTML5Backend)
export default class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.moveQuestion = this.moveQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.publish = this.publish.bind(this);
    this.state = {
      questions: [{
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
          require:false
        }
      }, {
        id: 3,
        type: "Multiple Choice",
        data:{
          question:""
        }
      }, {
        id: 4,
        type: 'Number',
        data:{
          question:""
        }
      }],
    };
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

    return (
      <div style={style}>
        {questions.map((question, i) => (
          <QuestionCard
            key={question.id}
            index={i}
            id={question.id}
            type={question.type}
            data={question.data}
            moveQuestion={this.moveQuestion}
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
