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

import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {grey500} from 'material-ui/styles/colors';
import Primary from '../../Theme';
import firebase from '../../firebase';
import _ from 'lodash';
import userStore from '../../stores/UserStore';

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
          to: 5,
          low: "low",
          high: "high",
          question: "How often do you interact with this person?"
        }
      }, {
        id: 2,
        type: 'Comment',
        data:{
          question: "Please provide some feedbacks.",
          type: "Short Answer",
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
    formName: 'general questions',
    teamName: 'Cloud crypto'
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
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSetToDefault = this.handleSetToDefault.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.moveQuestion = this.moveQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.publish = this.publish.bind(this);
    this.update = this.update.bind(this);

    this.state = {
      questionTypes:questionTypes,
      value: 0,
      teamvalue: 0,
      questions: Props.questionArray,
      startDate: new Date(Props.date.startDate),
      endDate:  {},
      editDate: new Date(),
      formName: Props.formName,
      setAsDefault: true,
      team: "",
      teamOptions: "",
      dialogOpen: false,
      dialogMessage: ""
    };
  }

  componentDidMount() {
    if (this.props.match.params.team) {
      firebase.database().ref(`Questions/${this.props.match.params.team}/${this.props.match.params.formid}`).once('value').then( (snap) => {
        const form = snap.val();
        this.setState({
          questions: form.formData,
          startDate: new Date(form.startDate),
          endDate: form.endDate === "" ? {} : new Date(form.endDate),
          editDate: new Date(form.editDate),
          formName: form.formName,
          setAsDefault: false,
          team: this.props.match.params.team
        });
      });
    } else if (userStore.role === "advisor") { // fetch specific team
      firebase.database().ref('Advisor').orderByChild("email").equalTo(userStore.email).on('value', (snap) => {
        const matchData = snap.val();
        Object.keys(matchData).forEach((key) => {
          let team = matchData[key].team;
          this.setState({
            team: team
          })
          console.log(this.state.team)
        })
        
      })
    } else{ // admin publish
      firebase.database().ref('Teams').once('value', (snap) => {
        const matchData = snap.val();
        const teams = [];
        Object.keys(matchData).forEach((key) => {
          let teamName = matchData[key].teamName;
          teams.push(teamName);
        })
        console.log(teams);
        this.setState({
          teamOptions: teams,
          team: teams[0]
        })
      })
    }
  }

  addQuestion() {
    let maxid = this.state.questions.length + 1;
    this.state.questions.forEach((question) => { // make sure new id has no duplicates
      if (question.id >= maxid) {
        maxid = question.id + 1
      }
    })
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
          id: maxid,
          type: type,
          data: initialData
        }]
      }
    }))
    console.log(this.state.questions)
  }

  changeEditMode() {
    PeerReviewStore.switchEditMode();
  }

  handleTeamChange(e, index, value) {
    const teamOptions = this.state.teamOptions;
    this.setState({
      teamvalue: value,
      team: teamOptions[value]
    });
    console.log(this.state.team)
  }

  handleChange(e, index, value) {
    this.setState({
      value
    });
  }

  handleClose(){
    this.setState({
      dialogOpen:false
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
    console.log(date)
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

  handleSetToDefault(e, checked) {
    this.setState({
      setAsDefault: checked
    })
  }

  publish(){
    let teamRef = firebase.database().ref().child('Questions/' + this.state.team)
    let firstTimePush = false;
    teamRef.once('value', (snap) => { 
      if (!snap.val()) {
        firstTimePush = true;
      }
    }).then(() => {
      let publishData = {
        formData: this.state.questions,
        startDate: this.state.startDate.toString(),
        endDate: _.isEqual(this.state.endDate, {}) ? '' : this.state.endDate.toString(),
        editDate: this.state.editDate.toString(),
        formName: this.state.formName
      }
      let newForm = teamRef.push(publishData)
  
      if (this.state.setAsDefault || firstTimePush) { // make sure there will always be a default form
        teamRef.update({
          defaultForm: newForm.key
        })
      }
    })
    this.setState({
      dialogOpen:true,
      dialogMessage:"New form published!"
    })
  }

  update(){
    let formRef = firebase.database().ref().child(`Questions/${this.props.match.params.team}/${this.props.match.params.formid}`)
    let newForm = {
      formData: this.state.questions,
      startDate: this.state.startDate.toString(),
      endDate: _.isEqual(this.state.endDate, {}) ? '' : this.state.endDate.toString(),
      editDate: (new Date()).toString(),
      formName: this.state.formName
    }
    console.log(newForm)
    formRef.update(newForm)
    this.setState({
      dialogOpen:true,
      dialogMessage:"Updated!"
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Complete"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const { questions } = this.state;
    let questionTypes = this.state.questionTypes.map((value, index) =>{
      return <MenuItem primaryText = {value} value = {index} key = {index} />
    });
    let teams = "";
    if (this.state.teamOptions){
      teams = this.state.teamOptions.map((value, index) =>{
        return <MenuItem primaryText = {value} value = {index} key = {index} />
      });
      console.log(this.state.team)
    }
    
    return (
      <div style={{width: 'auto'}}>
        <h2 style={{textAlign:"center"}}>Form Generator</h2>
        <MuiThemeProvider>
          <div>
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
            {
              PeerReviewStore.EditMode
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
          { 
            userStore.role === 'admin' && (!this.props.match.params.team) &&
            <div className='col-md-3' style={{marginLeft: "60px", float:'left', width:'200px'}}>
              <MuiThemeProvider>
                  <SelectField floatingLabelText = "Choose a team" value = {this.state.teamvalue} onChange = {this.handleTeamChange} style={{verticalAlign:"bottom",width: '150px'}}>
                    {teams}
                  </SelectField>
              </MuiThemeProvider>
            </div>
          }
          <div className='col-md-3' style={{marginLeft: "60px", marginTop:"30px",float:'left', width:'200px'}}>
            <MuiThemeProvider>
              <Checkbox checked={this.state.setAsDefault} label = "Set as default" labelPosition="left" onCheck={this.handleSetToDefault} /> 
            </MuiThemeProvider>
            
          </div>
          <div style={styles.publishButton}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              {
                this.props.match.params.formid  
                ? <RaisedButton className="pull-right" label = "Update"  backgroundColor = {Primary} onClick={this.update} />
                : <RaisedButton className="pull-right" label = "Publish"  backgroundColor = {Primary} onClick={this.publish} />
              }
            </MuiThemeProvider>
          </div>
          <div>
          <MuiThemeProvider>
            <Dialog
                title={this.state.dialogMessage}
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
              >
            </Dialog>
          </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
