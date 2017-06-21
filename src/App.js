import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link

} from 'react-router-dom';

import firebase from './firebase';
import Announcement from './component/Announcement';
import DropDown from './component/DropDown';
import Project from './component/ProjectPage';
import Footer from './component/Footer';
import Header from './component/Header';
import Projects from './component/projects/Projects';


import * as firebase from 'firebase';


import './style/App.css';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhHrpZ57LtfELxVSsE90DqW2TH8WmrEy8",
    authDomain: "vip-web-e515b.firebaseapp.com",
    databaseURL: "https://vip-web-e515b.firebaseio.com",
    projectId: "vip-web-e515b",
    storageBucket: "vip-web-e515b.appspot.com",
    messagingSenderId: "952769810112"
  };
  firebase.initializeApp(config);

injectTapEventPlugin();

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Contact = () => (
  <div>
    <h2>Contact</h2>
  </div>
)
class App extends Component {

  constructor(){
    super();
  }
  

  render() {
    return (
<<<<<<< HEAD

      <div>
        <Header />
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route path="/announcement" component={Announcement}/>
            <Route path="/projects" component={ProjectList}/>
            <Route path="/contact" component={Contact}/>
            <Project />
          </div>
        <Footer />
      </div>
=======
      <Router>
        <div>
          <Header />
            <div className="App">
              <Route exact path="/" component={Home}/>
              <Route path="/announcement" component={Announcement}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/contact" component={Contact}/>
            </div>
          <Footer />
        </div>
      </Router>
>>>>>>> origin
    );
  }
}

export default App;
