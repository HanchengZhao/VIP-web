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
import ASUTeamFormComponent from './component/ASUTeamFormComponent';
import './style/App.css';

import * as firebase from 'firebase';
  var config = {
    apiKey: "AIzaSyAGscYTGku-YbAwSG7-_caeWyCjag0XAOY",
    authDomain: "peer-review-25758.firebaseapp.com",
    databaseURL: "https://peer-review-25758.firebaseio.com",
    projectId: "peer-review-25758",
    storageBucket: "peer-review-25758.appspot.com",
    messagingSenderId: "389400582157"
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
    <ApplyFormComponent />
    <UploadCsvComponent  />
    <EditableGridComponent />
    <ASUTeamFormComponent />
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
            <Route path="/projects" component={Projects}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/test" component={Test}/>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
