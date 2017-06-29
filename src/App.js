// service
import React, { Component } from 'react';
<<<<<<< HEAD
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import Form from './component/Form.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
=======
import {fetchRole} from './component/login/auth';
import firebase from './firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import appStore from './stores/AppStore';
import userStore from './stores/UserStore';
import './style/App.css';

// page component
import AdminPage from './component/Admin/AdminPage';
import Announcement from './component/Announcement';
import Footer from './component/Footer';
import Header from './component/Header';
import LoginPage from './component/login/LoginPage';
import Projects from './component/projects/Projects';
import { AdminRoute, PublicRoute } from './component/Route';
>>>>>>> master

var config = {
	apiKey: "AIzaSyBPj6e4JD2Y6nN4-3HvG9iz0tBr1In7rZU",
    authDomain: "fir-trial-ba11c.firebaseapp.com",
    databaseURL: "https://fir-trial-ba11c.firebaseio.com",
    projectId: "fir-trial-ba11c",
    storageBucket: "",
    messagingSenderId: "991531377734"
};
    firebase.initializeApp(config);

<<<<<<< HEAD
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
=======
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
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true
  //   }
  // }
  componentDidMount () {
    this.userStateChange = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userStore.login()
        userStore.fetchUserInfo(user.email, user.displayName, user.photoURL)
        fetchRole(user.email)
        console.log("logged in")
      } else {
        appStore.finishLoading()
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
            {appStore.loading === true 
            ? (<h2>Loading...</h2>)
            : (
              <div className="App">
                <Route exact path="/" component={Home}/>
                <Route path="/announcement" component={Announcement}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/contact" component={Contact}/>
                <PublicRoute path="/login" authed={userStore.authed} component={LoginPage} />
                <AdminRoute path="/admin" user={userStore} component={AdminPage}/>
                {/*<Route path="/admin" component={AdminPage} />*/}
              </div>
            )}
          <Footer />
        </div>
      </Router>
    );
  }
>>>>>>> master
}

export default App;