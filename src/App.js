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

import Footer from './component/Footer';
import Header from './component/Header';
import Projects from './component/projects/Projects';
import LoginPage from './component/login/LoginPage';



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

const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
)

class App extends Component {

  constructor(){
    super();
  }
  

  render() {
    return (
      <Router>
        <div>
          <Header />
            <div className="App">
              <Route exact path="/" component={Home}/>
              <Route path="/announcement" component={Announcement}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/login" component={LoginPage} />
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;