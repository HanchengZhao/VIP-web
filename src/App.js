import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import DropDown from './component/DropDown'
import quiz from './quiz';
//
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import AppBar from 'material-ui/AppBar';
import './App.css';

injectTapEventPlugin();


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      date:"test"
    }
  }
  componentDidMount(){
    // console.log(quiz);
  }
  render() {
    return (
      <div className="App">
        <DropDown question={quiz.quizzes[5]} />
      </div>
    );
  }
}

export default App;
