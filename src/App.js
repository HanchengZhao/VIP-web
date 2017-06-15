import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Announcement from './component/Announcement';
import DropDown from './component/DropDown';
import Header from './component/Header';
import Footer from './component/Footer';
import InstructionComponent from './component/InstructionComponent';
import ApplyFormComponent from './component/ApplyFormComponent';
import UploadCsvComponent from './component/UploadCsvComponent';
import EditableGridComponent from './component/EditableGridComponent';
import './App.css';
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

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  render() {
    return (

      <div>
        <Header />
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/announcement" component={Announcement}/>
          <InstructionComponent />
          <ApplyFormComponent />
          <UploadCsvComponent  />
          <EditableGridComponent />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
