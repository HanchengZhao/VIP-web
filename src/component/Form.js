import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var dict = {"1": "", "2":""}

class Form extends Component {
	
	constructor() {
		super();
		this.state = {
			inputValue: ''
		};
		this._handleChange = this._handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit() {
		alert("Your project request has been submitted");
	}
	
	_handleChange({target}) { 
		this.setState({
			[target.name]:target.value
		});
		dict[name] = target.value;
	}
	
	render() {

		return(
			<div className="App">
				
				<TextField 
					ref = "teamName"
					name = '1'
					floatingLabelFixed={true}
					hintText="Team"
					floatingLabelText="Enter Team name"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "subtitle"
					name = '2'
					floatingLabelFixed={true}
					hintText="Subtitle"
					floatingLabelText="Enter subtitle"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "topics"
					name = '3'
					floatingLabelFixed={true}
					hintText="Topics"
					floatingLabelText="Enter topics"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "advisors"
					name = '4'
					floatingLabelFixed={true}
					hintText="Advisors"
					floatingLabelText="Enter advisor names"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "desc"
					name = '5'
					floatingLabelFixed={true}
					hintText="Description"
					floatingLabelText="Enter description"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "major"
					name = '6'
					floatingLabelFixed={true}
					hintText="Major"
					floatingLabelText="Enter major"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "requirements"
					name = '7'
					floatingLabelFixed={true}
					hintText="Requirements"
					floatingLabelText="Enter requirements"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "members"
					name = '8'
					floatingLabelFixed={true}
					hintText="Team Members"
					floatingLabelText="Enter team members"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "name"
					name = '9'
					floatingLabelFixed={true}
					hintText="Name"
					floatingLabelText="Enter name"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "email"
					name = '10'
					floatingLabelFixed={true}
					hintText="Email"
					floatingLabelText="Enter email"
					onChange={this._handleChange}
				/><br/>
				<TextField 
					ref = "status"
					name = '11'
					floatingLabelFixed={true}
					hintText="Status"
					floatingLabelText="Enter status"
					onChange={this._handleChange}
				/><br/>
				<FlatButton
					onClick = {this.handleSubmit}
					label="Submit" primary={true}
				/>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Team Name</TableHeaderColumn>
							<TableHeaderColumn>Subtitle</TableHeaderColumn>
							<TableHeaderColumn>Topics</TableHeaderColumn>
							<TableHeaderColumn>Advisors</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableRowColumn>{}</TableRowColumn>
							<TableRowColumn></TableRowColumn>
						</TableRow>
					</TableBody>	
				</Table>
				
			</div>	
		)	
	}
}

export default Form;