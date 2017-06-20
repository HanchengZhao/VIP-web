import React, { Component } from 'react';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import Form from './component/Form.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var config = {
	apiKey: "AIzaSyBPj6e4JD2Y6nN4-3HvG9iz0tBr1In7rZU",
    authDomain: "fir-trial-ba11c.firebaseapp.com",
    databaseURL: "https://fir-trial-ba11c.firebaseio.com",
    projectId: "fir-trial-ba11c",
    storageBucket: "",
    messagingSenderId: "991531377734"
};
    firebase.initializeApp(config);

var styl = {
		color: 'orange',
	};

class App extends Component {
	
	constructor() {
		super();
	}
	
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