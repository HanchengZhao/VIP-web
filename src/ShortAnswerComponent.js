import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class ShortAnswerComponent extends Component{
	render(){
		return (
			<div>	      
			  <h1>{this.props.name}</h1>
		        <MuiThemeProvider>
		        <TextField
		         hintText="Put your answer here"
		        />
		        </MuiThemeProvider>
		    </div>
				)
	}
}



export default ShortAnswerComponent;