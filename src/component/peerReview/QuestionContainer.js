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

import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {grey500} from 'material-ui/styles/colors';
import Primary from '../../Theme';
import firebase from '../../firebase';

const styles = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  datePicker: {
    theme: getMuiTheme({
      datePicker: {
        selectColor: Primary
      },
      flatButton: {
        primaryTextColor: Primary
      }
    }),
    position: "col-md-3"
  },
  publishButton: {
    marginTop: "20px"
  }
};
const questionTypes = ["Score", "Comment", "CheckBox", "Number"];

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
      }],
    date:{
      startDate: '2017-08-18',
      endDate: ''
    },
    formName: 'general questions'
}

@DragDropContext(HTML5Backend)
@observer
export default class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.moveQuestion = this.moveQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.publish = this.publish.bind(this);

    this.state = {
      questionTypes:questionTypes,
      value: 0,
      questions: Props.questionArray,
      startDate: new Date(Props.date.startDate) ,
      endDate:  {} ,
      editDate: new Date(),
      formName: Props.formName
    };
  }

  addQuestion() {
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

  disablePrevDates(startDate) { // prevent selecting endDate before startDate
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }

  handleChangeStartDate(event, date){
    this.setState({
      startDate: date,
    });
  };

  handleChangeEndDate(event, date){
    this.setState({
      endDate: date,
    });
  };

  handleNameChange(e) {
    let name = e.target.value
    this.setState(update(this.state, {
      formName: {
        $set: name
      }
    }))
  }

  publish(){
    console.log(this.state.questions)
    console.log("Date: ", this.state.startDate, this.state.endDate)
  }
  render() {
    const { questions } = this.state;
    let questionTypes = this.state.questionTypes.map((value, index) =>{
      return <MenuItem primaryText = {value} value = {index} key = {index} />
    });
    return (
      <div style={{width: 'auto'}}>
        <h2 style={{textAlign:"center"}}>Form Generator</h2>
        <MuiThemeProvider>
          <div className='row'>
            <TextField
              value = {this.state.formName}
              onChange = {this.handleNameChange}
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle = {styles.underlineStyle}
              floatingLabelText="Form Name"
              style={{width: '150px', marginRight:'25%', marginLeft:'20px'}}
            />

            <SelectField value = {this.state.value} onChange = {this.handleChange} style={{verticalAlign:"bottom",width: '150px'}}>
              {questionTypes}
            </SelectField>
            <FlatButton label = "+ Add" onClick = {this.addQuestion} />
            {PeerReviewStore.EditMode
              ? <FlatButton label = "Preview Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"bottom", float:'right'}}/>
              : <FlatButton label = "Edit Mode" onClick = {this.changeEditMode} style = {{verticalAlign:"bottom", float:'right'}}/>
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
        <div className="row">
          <div className={styles.datePicker.position}>
            <MuiThemeProvider muiTheme={styles.datePicker.theme}>
              <div >
                <DatePicker
                  onChange={this.handleChangeStartDate}
                  floatingLabelText="Start Date"
                  value={this.state.startDate}
                  container="inline"
                />
                <DatePicker
                  onChange={this.handleChangeEndDate}
                  floatingLabelText="End Date"
                  container="inline"
                  value={this.state.endDate}
                  shouldDisableDate={this.disablePrevDates(this.state.startDate)}
                />
              </div>
            </MuiThemeProvider>
          </div>
          <div className="row" style={styles.publishButton}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton className="pull-right" label = "Publish"  backgroundColor = {Primary} onClick={this.publish} />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
