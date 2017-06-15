import React, { Component } from 'react';
/*import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';*/
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
/*import quiz from './quiz.js';*/
import Form from './component/Form.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var styl = {
		color: 'orange',
	};

class App extends Component {
	
	
	
  render() {	
    return (
	<MuiThemeProvider>
		<div className="App">
			<h2 style={styl}>Registration Form</h2>
			<Form/>
		</div>
	</MuiThemeProvider>  
    );
  }
}

export default App;