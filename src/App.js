
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import InstructionComponent from './InstructionComponent';
import ApplyFormComponent from './ApplyFormComponent';
import UploadCsvComponent from './UploadCsvComponent';
import EditableGridComponent from './EditableGridComponent';
import * as firebase from 'firebase';
  var config = {
    apiKey: "AIzaSyBzy4ctl-AgyeZSu2Mu9AUuVSHiZh0-TSg",
    authDomain: "react-native-7f0db.firebaseapp.com",
    databaseURL: "https://react-native-7f0db.firebaseio.com",
    projectId: "react-native-7f0db",
    storageBucket: "react-native-7f0db.appspot.com",
    messagingSenderId: "832639299928"
  };
  firebase.initializeApp(config);

injectTapEventPlugin();
class App extends Component {
  render() {
    return (

      <div className="App">

        <InstructionComponent />
        <ApplyFormComponent />
        <UploadCsvComponent  />
        <EditableGridComponent />



      </div>
    );
  }
}

export default App;
