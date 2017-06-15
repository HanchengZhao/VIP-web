import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
	
	constructor(props) {
		super(props);
	}
	
	render() {

		return(
			<div className="App">
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

export default Table