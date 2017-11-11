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

const style = {
  same: {
    backgroundColor:"#ffffff"
  },
  low: {
    backgroundColor:"#fafec0"
  },
  lower: {
    backgroundColor:"#e49693"
  },
  high: {
    backgroundColor:"#d9ffd6"
  },
  higer: {
    backgroundColor:"#71fd03"
  }
}


class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions || [],
      peerReview: this.props.peerReview || [],
      advancedView: this.props.peerReview || false,
      averageData: this.props.averageData || []
    }

  }

  // componentDidMount() {

  // }
  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions,
      peerReview: nextProps.peerReview,
      advancedView: nextProps.advancedView,
      averageData: nextProps.averageData
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
            if (!this.state.advancedView) {
              answers.push(<td>{value}</td>);
            } else {// for advanced view
              const average = this.state.averageData[peer][index];
              if (!average) { // doesn't have average scores
                answers.push(<td>{value}</td>);
              } else {
                if (value === average) { // same score
                  answers.push(<td style={style.same}><strong>{value}</strong> / {average.toFixed(1)}</td>);
                } else if (value < average){
                  if (value > (average*0.8) ) {
                    answers.push(<td style={style.low}><strong>{value}</strong> / {average.toFixed(1)}</td>);
                  } else {
                    answers.push(<td style={style.lower}><strong>{value}</strong> / {average.toFixed(1)}</td>);
                  }
                } else { //value > average
                  if (value < (average*1.2) ) {
                    answers.push(<td style={style.high}><strong>{value}</strong> / {average.toFixed(1)}</td>);
                  } else {
                    answers.push(<td style={style.higer}><strong>{value}</strong> / {average.toFixed(1)}</td>);
                  }
                }
              }
            }
          })
        }
        return <tr key={index}><td>{form.data.question}</td>{answers}</tr>
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