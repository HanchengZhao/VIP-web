import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link

} from 'react-router-dom';


import Announcement from './component/Announcement';
import DropDown from './component/DropDown';

import Footer from './component/Footer';
import Header from './component/Header';
import ProjectList from './component/projects/ProjectList';


import InstructionComponent from './component/InstructionComponent';
import ApplyFormComponent from './component/ApplyFormComponent';
import UploadCsvComponent from './component/UploadCsvComponent';
import EditableGridComponent from './component/EditableGridComponent';
import './style/App.css';
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
const Test = () => (
  <div>
    <h2>Contact</h2>
    <InstructionComponent />
    <ApplyFormComponent />
    <UploadCsvComponent  />
    <EditableGridComponent />
  </div>
)
class App extends Component {

  constructor(){
    super();
  }
  componentDidMount(){

  }

  render() {
    return (

      <div>
        <Header />
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route path="/announcement" component={Announcement}/>
            <Route path="/projects" component={ProjectList}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/test" component={Test}/>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
