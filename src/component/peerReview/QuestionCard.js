import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/highlight-off';

import CheckBox from "./questionType/CheckBox";
import Comment from './questionType/Comment';
// import MultipleChoice from './questionType/MultipleChoice';
import Number from './questionType/Number';
import Score from "./questionType/Score";

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const questionSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const questionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveQuestion(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const getQuestionComponent = (type, props) => {
    if (type === 'Score'){
        return <Score {...props}/>;
    } else if (type ==='Comment') {
        return <Comment {...props}/>;
    } else if (type === 'CheckBox') {
        return <CheckBox {...props}/>;
    } else if (type === 'Number') {
        return <Number {...props}/>;
    } else {
        return <div>Not a proper question type</div>;
    }
}

@DropTarget(ItemTypes.QUESTION, questionTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.QUESTION, questionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class QuestionCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    moveQuestion: PropTypes.func.isRequired,
  };

  render() {
    const { type, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const question = getQuestionComponent(type, this.props);
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        <MuiThemeProvider>
          <IconButton onClick = {() => this.props.removeQuestion(this.props.index)} style = {{position: 'absolute',right: '10px'}}>
            <RemoveIcon />
          </IconButton>
        </MuiThemeProvider>
        {question}
      </div>,
    ));
  }
}
