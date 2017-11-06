import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ResultTable from './ResultTable';
import Primary, { Secondary, DeleteColor} from '../../../Theme';
import userStore from '../../../stores/UserStore';

class ReviewResult extends Component {
  constructor() {
    super();
    this.state = {
      team: "",
      teamList: "",
      semester: "",
      semesterList:"",
      formid: "",
      formList: "",
      formData:"",
      student: "",
      studentList: "",
      reviews: "",
      reviewList:"",
      averageData:"",
      advancedView: false
    }
    //fetch the team options for admin and team for advisor
    this.changeView = this.changeView.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.selectSemester = this.selectSemester.bind(this);
    this.selectForm = this.selectForm.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
  }

  componentDidMount() {
    if (userStore.role === 'admin' || userStore.role === 'advisor') {
      firebase.database().ref('Reviews_peers').once('value').then( (snap) => {
        const data = snap.val();
        if (data) {
          const teams = Object.keys(data);
          // console.log(teams)
          this.setState({
            reviews: data,
            teamList: teams
          })
        }
      })
    }
  }

  changeView() {
    this.setState((prevState) => {
      return {advancedView: !prevState.advancedView}
    })
  }


  selectTeam(e, index, team) {
    const reviews = this.state.reviews;
    // console.log(Object.keys(reviews[team]))
    this.setState({
      team: team,
      semester:"",
      formname:"",
      student:"",
      semesterList: Object.keys(reviews[team])
    })
  }


  selectSemester(e, index, semester) {
    const reviews = this.state.reviews;
    const team = this.state.team;
    const uuids = Object.keys(reviews[this.state.team][semester]);
    let matchQuestions = [];
    let questions;
    // console.log(uuids)
    firebase.database().ref("Questions").child(`${team}`).once('value').then((snap) => {
      questions = snap.val();
    }).then(() => {
      uuids.map((uuid) => {//fetch questions names
        matchQuestions.push({
          key: uuid,
          data: questions[uuid]
        })
      })
      // console.log(matchQuestions)
      this.setState({
        semester:semester,
        formid:"",
        student:"",
        formList: matchQuestions
      })
    })

  }

  selectForm(e, index, formid) {
    const team = this.state.team;
    const semester = this.state.semester;

    const studentList = this.state.reviews[team][semester][formid]
    firebase.database().ref("Questions").child(`${team}/${formid}`).once('value').then((snap) => {
      const form = snap.val();
      this.setState({
        formid:formid,
        formData:form.formData,
        student:"",
        studentList: studentList
      })
    })
    // get average
    firebase.database().ref("Reviews_average").child(`${team}/${semester}/${formid}`).once('value').then((snap) => {
      const data = snap.val();
      this.setState({
        averageData: data
      })
    })

  }
  selectStudent(e, index, student) {
    const team = this.state.team;
    const semester = this.state.semester;
    const formid = this.state.formid;

    this.setState({
      student:student,
      reviewList: this.state.reviews[team][semester][formid][student]
    })

  }
  


  render() {
    let teamOptions, semesterOptions, formOptions, studentOptions;
    if (this.state.teamList) {
      teamOptions = this.state.teamList.map((value, index) => {
        return <MenuItem primaryText = {value} value = {value} key = {index} />
      })
    }
    if (this.state.semesterList) {
      semesterOptions = this.state.semesterList.map((value, index) => {
        return <MenuItem primaryText = {value} value = {value} key = {index} />
      })
    }
    if (this.state.formList) {
      formOptions = this.state.formList.map((form, index) => {
        return <MenuItem primaryText = {form['data']['formName']} value = {form.key} key = {index} />
      })
    }
    if (this.state.studentList) {
      studentOptions = Object.keys(this.state.studentList).map((student, index) => {
        return <MenuItem primaryText = {student} value = {student} key = {index} />
      })
    }
    return (
      <div>
        <h2 style={{textAlign:'center', color:Secondary}}>Peer Review Result</h2>
        {
          !this.state.teamList && 
          <MuiThemeProvider>
            <div> 
             <Paper zDepth = {2}>
              <h3 style={{textAlign:'center',padding:'20px'}}>
                No peer review data right now
              </h3>
             </Paper>
            </div>
          </MuiThemeProvider>
        }
        <MuiThemeProvider>
          <div> 
            {/* dropdown select field */}
            <Paper zDepth = {1} style={{marginBottom:"20px"}}>
              <div style = {{textAlign:'center'}}>
                {/* <span style={{position:'relative', textAlign:"left"}}>Select Field</span> */}
                <SelectField floatingLabelText="Team" value = {this.state.team} onChange = {this.selectTeam} style={{width: "150px", mariginRight:"20px", textAlign:"left",verticalAlign:"bottom"}}>
                  {teamOptions}
                </SelectField>
                <SelectField floatingLabelText="Semester" value = {this.state.semester} onChange = {this.selectSemester} style={{width: "150px", mariginRight:"20px",textAlign:"left",verticalAlign:"bottom"}}>
                  {semesterOptions}
                </SelectField>
                <SelectField floatingLabelText="Form Name" value = {this.state.formid} onChange = {this.selectForm} style={{width: "150px", mariginRight:"20px",textAlign:"left",verticalAlign:"bottom"}}>
                  {formOptions}
                </SelectField>
                <SelectField floatingLabelText="Student" value = {this.state.student} onChange = {this.selectStudent} style={{width: "180px", mariginRight:"20px",textAlign:"left",verticalAlign:"bottom"}}>
                  {studentOptions}
                </SelectField>
              </div>
            </Paper>
            {
              this.state.advancedView
              ? <FlatButton label = "Simple View" primary={true} onClick = {this.changeView} style = {{verticalAlign:"bottom"}}/>
              : <FlatButton label = "Advanced View" primary={true} onClick = {this.changeView} style = {{verticalAlign:"bottom"}}/>
            }
          </div>
        </MuiThemeProvider> 
        <ResultTable 
          questions={this.state.formData} 
          peerReview={this.state.reviewList} 
          advancedView={this.state.advancedView}
          averageData={this.state.averageData}
        />
      </div>
    );
  }
}

export default ReviewResult;