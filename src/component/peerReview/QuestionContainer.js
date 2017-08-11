import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionCard from './QuestionCard';

const style = {
  width: 'auto',
};

@DragDropContext(HTML5Backend)
export default class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.moveQuestion = this.moveQuestion.bind(this);
    this.state = {
      questions: [{
        id: 1,
        type: 'Score',
      }, {
        id: 2,
        type: 'Comment',
      }, {
        id: 3,
        type: "Multiple Choice",
      }, {
        id: 4,
        type: 'Number',
      }, {
        id: 5,
        type: 'Score',
      }, {
        id: 6,
        type: 'Score',
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
            moveQuestion={this.moveQuestion}
          />
        ))}
      </div>
    );
  }
}
