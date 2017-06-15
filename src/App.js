import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link
<<<<<<< HEAD
} from 'react-router-dom';
=======
} from 'react-router-dom'

>>>>>>> origin
import Announcement from './component/Announcement';
import DropDown from './component/DropDown';
import Header from './component/Header';
import Footer from './component/Footer';
<<<<<<< HEAD
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

=======

import './style/App.css';
>>>>>>> origin

injectTapEventPlugin();

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Projects = () => (
  <div>
    <h2>Projects</h2>
  </div>
)

const Contact = () => (
  <div>
    <h2>Contact</h2>
  </div>
)
class App extends Component {
<<<<<<< HEAD
=======

  constructor(){
    super();
  }
  componentDidMount(){
 
  }
>>>>>>> origin
  render() {
    return (

      <div>
        <Header />
<<<<<<< HEAD
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/announcement" component={Announcement}/>
          <InstructionComponent />
          <ApplyFormComponent />
          <UploadCsvComponent  />
          <EditableGridComponent />
        </div>
=======
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route path="/announcement" component={Announcement}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/contact" component={Contact}/>
          </div>
>>>>>>> origin
        <Footer />
      </div>
    );
  }
}

export default App;
