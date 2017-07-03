// service
import React, { Component } from 'react';

import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import Form from './component/Form.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {fetchRole} from './component/login/auth';
import firebase from './firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {fetchRole} from './component/login/auth';
import firebase from './firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { observer } from "mobx-react";
import appStore from './stores/AppStore';
import userStore from './stores/UserStore';
import './style/App.css';

// page component

import AdminPage from './component/Admin/AdminPage';

import AdminPage from './component/admin/AdminPage';

import Announcement from './component/Announcement';
import Footer from './component/Footer';
import Header from './component/Header';
import LoginPage from './component/login/LoginPage';
import Projects from './component/projects/Projects';
import { AdminRoute, PublicRoute } from './component/Route';

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
import { AdminRoute, PublicRoute, UnAuthRoute } from './component/Route';

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
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true
  //   }
  // }

const NotInTheSystem = () => (
  <div>
    <h2>Sorry, You are not in the system</h2>
  </div>
)

@observer
class App extends Component {
  constructor () {
    super()
    this.state = {
      shouldRedirect: false,
      redirectPath: ""
    }
  }

  componentDidMount () {
    this.userStateChange = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userStore.login()
        userStore.fetchUserInfo(user.email, user.displayName, user.photoURL)

        fetchRole(user.email)
        console.log("logged in")

        fetchRole(user.email).then(role => {
          console.log(role);
          userStore.fetchUserRole(role);
          appStore.finishLoading()
          this.setState({
            shouldRedirect: true,
            redirectPath: "/" + role.toString()
          })
        }).catch((noRole) => { //unable to retrieve role from db
          // userStore.fetchUserRole(errorRole);
          userStore.fetchUserRole(noRole);
          appStore.finishLoading()
          this.setState({
            shouldRedirect: true,
            redirectPath: "/not_in_system"
          })
        })

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

                <UnAuthRoute path="/not_in_system" user={userStore} component={NotInTheSystem} />
                <AdminRoute path="/admin" user={userStore} component={AdminPage}/>
                {/*<Route path="/admin" component={AdminPage} />*/}
                {this.state.shouldRedirect && (
                  <Redirect to={this.state.redirectPath}/>
                )}
              </div>
              

            )}
          <Footer />
        </div>
      </Router>
    );
  }

}

export default App;