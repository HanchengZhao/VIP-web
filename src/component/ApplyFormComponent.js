import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

const style = {
  margin: 12,
};

class ApplyFormComponent extends Component{
  constructor(props) {
      super(props);
      this.state = {
            name: '',
            email: '',
            gpa: '',
            id: '',
            major: '',
            goal:''
      };
    }


  firebasewrite = () => {
    const rootRef = firebase.database().ref().child('studentpage').child('form');
    rootRef.push({
        name : this.state.name,
        email : this.state.email,
        gpa : this.state.gpa,
        id : this.state.id,
        major : this.state.major,
        goal : this.state.goal
    });
    this.setState({
          name: '',
          email: '',
          gpa: '',
          id: '',
          major: '',
          goal:''
    });

  }

	render(){
		return (
			<div>
		        <MuiThemeProvider>
            <div>
                 <TextField hintText="name"  value={this.state.name} onChange={(event) => { this.setState({ name : event.target.value })}}   /><br />
                 <TextField hintText="email" value={this.state.email} onChange={(event) => { this.setState({ email : event.target.value })}} /><br />
                 <TextField hintText="gpa" value={this.state.gpa} onChange={(event) => { this.setState({ gpa : event.target.value })}} /><br />
                 <TextField hintText="id" value={this.state.id} onChange={(event) => { this.setState({ id: event.target.value })}} /><br />
                 <TextField hintText="major" value={this.state.major} onChange={(event) => { this.setState({ major : event.target.value })}} /><br />
                 <TextField hintText="goal" value={this.state.goal} onChange={(event) => { this.setState({ goal : event.target.value })}} /><br />
                 <TextField hintText={this.state.name} />
                 <RaisedButton label="Submmit" primary={true} style={style} onClick={this.firebasewrite} />
            </div>
		        </MuiThemeProvider>
		  </div>
				)
	}
}



export default ApplyFormComponent;
