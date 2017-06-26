import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { observer } from "mobx-react";


import firebase from './firebase';
import Announcement from './component/Announcement';

// import DropDown from './component/DropDown';

import AdminPage from './component/admin/AdminPage';
import LoginPage from './component/login/LoginPage';

import Footer from './component/Footer';
import Header from './component/Header';
import Projects from './component/projects/Projects';


import userStore from './stores/UserStore';
import './style/App.css';


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

@observer
class App extends Component {

  componentDidMount () {
    this.userStateChange = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userStore.login()
        console.log(user)
        console.log(user.displayName)
        console.log(user.email)
        console.log(user.photoURL)
        console.log("logged in")
      } else {
        userStore.logout()
        console.log("logged out")
      }
    })
  }

  componentWillUnmount () {
    this.userStateChange()
  }

  render() {
    return (
      <Router>
        <div>
          <Header user={userStore} />
            <div className="App">
              <Route exact path="/" component={Home}/>
              <Route path="/announcement" component={Announcement}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/login" component={LoginPage} />
              <Route path="/admin" component={AdminPage} />
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;