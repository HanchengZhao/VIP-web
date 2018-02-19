import React, { Component } from 'react';

import firebase from '../../firebase';

class StudentApplication extends Component {

  constructor(){
      super(props);
      this.state = {
        data:{},
        fbkey: this.props.match.params.projectid,
        errorText:'',
        error:{},
        courses:'',
        semester:'',
        creditOptions:[],
        value:"default",
        notIncluded:['fbkey', 'errorText','error','other', 'course', 'credits']
      };
  }

  componentDidMount() {
    let data = {};
    firebase.database().ref(`Teams/`+this.state.fbkey).once(`value`).then( (snap) => {
      data['teamName'] = snap.val().teamName;
        this.setState({
            title: snap.val().teamName,
        });
    });

    firebase.database().ref('Semester').once('value').then((snap)=>{
      data['semester'] = snap.val().current;
    });
    
    firebase.database().ref(`FormQuestions/${db}`).once('value').then( (snap) => {
      
      let empty = {};
      let notIncluded = this.state.notIncluded;
      Object.keys(snap.val()).forEach((i)=>{
        data[snap.val()[i].id] = ''
        empty[snap.val()[i].id] = ''
        if(!snap.val()[i].required) {
          notIncluded.push(snap.val()[i].id);
        }
      });
      data['course'] = '';
      data['credits'] = '';
      console.log(snap.val());
      this.setState({
        questionsArray: snap.val(),
        data:data,
        empty:empty,
        notIncluded:notIncluded
      });
    });
    
    firebase.database().ref(`Courses`).on('value', (snap) => {
      this.setState({courses:snap.val()});
    });
}  

  render(){
    return(<p>student application works!</p>);
  }
}

export default StudentApplication;