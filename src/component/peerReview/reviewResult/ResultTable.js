import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Primary from '../../../Theme';
import userStore from '../../../stores/UserStore';
import PropTypes from 'prop-types';

// ResultTable.prototype = {
//     questions: PropTypes.array,
//     peers: PropTypes.array
// }

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions || [],
      peerReview: this.props.peerReview || []
    }

  }

  // componentDidMount() {

  // }
  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions,
      peerReview: nextProps.peerReview
    });
  }

  
  render() {
    const peers = Object.keys(this.state.peerReview);
    const peerHeaders = peers.map((peer, index) => {
      return <th>{peer}</th>
    })
    let peerReviews = function(index) {
      let answerByRow = peers.map((peer,i) => {
        return <td>{this.state.peerReview[peer][index]}</td>
      })
    }
    let resultContent;
    if(this.state.questions) {
      resultContent = this.state.questions.map((form, index) => {
        let answers = []
        if (form['type'] === 'CheckBox') {
          let options = [];
          peers.map(peer => {
            Object.values(this.state.peerReview[peer][index]).map(value => {
              options.push(form['data']['options'][value])
            })
            answers.push(<td>{options.join()}</td>)
          })
        } else {
          peers.map(peer => {
            const value = this.state.peerReview[peer][index]
            // console.log(value)
            answers.push(<td>{value}</td>)
          })
        }
        return <tr><td>{form.data.question}</td>{answers}</tr>
      })
    }
    
    return (
      <div>
        <table className="table table-hover table-striped table-bordered">
          <thead>
          <tr className="info">
            <th>Question</th>
            {peerHeaders}
          </tr>
          </thead>
        <tbody>
          {resultContent}
        </tbody>
      </table>

      </div>
    );
  }
}

export default ResultTable;