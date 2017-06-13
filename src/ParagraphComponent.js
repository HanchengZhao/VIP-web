import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class ParagraphComponent extends Component{
	render(){
		return (
		    <div>
		      <h1>{this.props.name}</h1>
		        <MuiThemeProvider>
		          <TextField
		            hintText="Answer your question here"
		            multiLine={true}
		            rows={1}
		            rowsMax={4}
		            fullWidth={true}
		          />
		        </MuiThemeProvider>
		    </div>
				)
	}
}



export default ParagraphComponent;
