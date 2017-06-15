import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
          <DropDown question={quiz.quizzes[5]} />
          <Announcement />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
