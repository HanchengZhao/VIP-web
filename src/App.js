import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Announcement from './component/Announcement';
import DropDown from './component/DropDown';
import quiz from './quiz';
import Header from './component/Header';
import Footer from './component/Footer';
//
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import AppBar from 'material-ui/AppBar';
import './App.css';

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

  constructor(){
    super();
  }
  componentDidMount(){
    // console.log(quiz);
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
